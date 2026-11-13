"use server";

import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { getDb, schema } from "@/db";
import { checkPincode, computeShippingPaise, getSettings, priceCart } from "@/lib/db-data";
import { createRateLimiter, orderReference } from "@/lib/site";
import { checkoutSchema, orderLookupSchema } from "@/lib/validation";

const db = getDb();

/** Abuse prevention for the public checkout endpoint (per server instance). */
const orderRateLimit = createRateLimiter(6, 60_000);
const lookupRateLimit = createRateLimiter(15, 60_000);

export type PlaceOrderResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };

async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown").split(",")[0].trim();
}

const DUPLICATE_KEY = "23505";

/**
 * Creates a Cash-on-Delivery order.
 *
 * Guarantees:
 * - Prices, stock, and totals are computed from the database — never trusted
 *   from the browser.
 * - Stock is reserved with a conditional UPDATE inside a transaction, so
 *   concurrent checkouts cannot oversell.
 * - The client-supplied idempotency key makes repeated submissions of the
 *   same cart return the same order reference instead of duplicating it.
 * - PIN-code serviceability and COD eligibility are verified server-side.
 */
import { getCurrentCustomer } from "@/lib/customer-auth";
import { notifyOrderPlaced } from "@/lib/notifications";

export async function placeOrder(input: unknown): Promise<PlaceOrderResult> {
  const customer = await getCurrentCustomer();
  if (!customer) {
    return {
      ok: false,
      error: "Authentication required. Please sign in or create an account to place an order.",
    };
  }

  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the highlighted fields and try again." };
  }
  const data = parsed.data;

  const ip = await clientIp();
  if (!orderRateLimit(`order:${ip}`)) {
    return { ok: false, error: "Too many order attempts. Please wait a minute and try again." };
  }

  // 1. Authoritative pricing from the database.
  const { lines, subtotalPaise } = await priceCart(data.items);
  if (!lines.length) {
    return { ok: false, error: "Your cart is empty or the selected products are unavailable." };
  }

  // 2. Stock check.
  const short = lines.find((l) => l.quantity > l.availableStock);
  if (short) {
    const msg =
      short.availableStock <= 0
        ? `“${short.productName} — ${short.variantLabel}” is out of stock. Please adjust your cart.`
        : `Only ${short.availableStock} left for “${short.productName} — ${short.variantLabel}”.`;
    return { ok: false, error: msg };
  }

  // 3. Delivery eligibility.
  const { shipping } = await getSettings();
  const pincode = await checkPincode(data.pincode);
  if (!pincode.serviceable) {
    return { ok: false, error: pincode.message };
  }
  if (!pincode.codAvailable) {
    return {
      ok: false,
      error: "Cash on Delivery is not available for this PIN code. Please contact us to order.",
    };
  }

  // 4. Authoritative totals.
  const shippingPaise = computeShippingPaise(subtotalPaise, shipping);
  const codFeePaise = shipping.codFeePaise;
  const discountPaise = 0;
  const totalPaise = subtotalPaise + shippingPaise + codFeePaise - discountPaise;

  // 5. Transactional persistence + stock reservation.
  let reference: string | null = null;

  for (let attempt = 0; attempt < 3 && !reference; attempt++) {
    const candidate = orderReference();
    try {
      await db.transaction(async (tx) => {
        // Reserve stock conditionally & record audit movement
        for (const line of lines) {
          const [variant] = await tx
            .select({
              id: schema.productVariants.id,
              stock: schema.productVariants.stock,
              productId: schema.productVariants.productId,
            })
            .from(schema.productVariants)
            .where(eq(schema.productVariants.id, line.variantId))
            .limit(1);

          if (!variant || variant.stock < line.quantity) {
            throw new Error(`STOCK:${line.productName}:${line.variantLabel}`);
          }

          const updated = await tx
            .update(schema.productVariants)
            .set({ stock: sql`stock - ${line.quantity}` })
            .where(
              sql`${schema.productVariants.id} = ${line.variantId} AND ${schema.productVariants.stock} >= ${line.quantity}`,
            )
            .returning({ id: schema.productVariants.id });

          if (!updated.length) {
            throw new Error(`STOCK:${line.productName}:${line.variantLabel}`);
          }

          await tx.insert(schema.stockAdjustments).values({
            variantId: line.variantId,
            productId: variant.productId,
            changeQty: -line.quantity,
            previousQty: variant.stock,
            newQty: variant.stock - line.quantity,
            reason: "order_placed",
            reference: candidate,
            notes: `Checkout order ${candidate}`,
            adjustedBy: customer.email,
          });
        }

        const [order] = await tx
          .insert(schema.orders)
          .values({
            reference: candidate,
            customerId: customer.id,
            customerName: data.customerName,
            phone: data.phone,
            email: data.email,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            landmark: data.landmark,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            deliveryInstructions: data.deliveryInstructions,
            subtotalPaise,
            shippingPaise: shippingPaise + codFeePaise,
            discountPaise,
            totalPaise,
            paymentMethod: "cod",
            paymentStatus: "unpaid",
            fulfilmentStatus: "pending",
            statusHistory: [
              { status: "pending", at: new Date().toISOString(), note: "Order placed (COD)" },
            ],
            idempotencyKey: data.idempotencyKey,
          })
          .returning({ id: schema.orders.id, reference: schema.orders.reference });

        await tx.insert(schema.orderItems).values(
          lines.map((l) => ({
            orderId: order.id,
            variantId: l.variantId,
            productName: l.productName,
            productSlug: l.productSlug,
            gradeName: l.gradeName,
            variantLabel: l.variantLabel,
            unitPricePaise: l.unitPricePaise,
            quantity: l.quantity,
            totalPaise: l.totalPaise,
          })),
        );

        reference = order.reference;
      });

      if (reference) {
        notifyOrderPlaced({
          reference,
          customerName: data.customerName,
          email: data.email || customer.email,
          totalPaise,
          paymentMethod: "cod",
          itemsCount: lines.length,
        }).catch((err) => console.error("[notifyOrderPlaced error]:", err));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

      // Same cart submitted again → return the original order (idempotent).
      if (message.includes(DUPLICATE_KEY) && message.includes("idempotency")) {
        const [existing] = await db
          .select({ reference: schema.orders.reference })
          .from(schema.orders)
          .where(eq(schema.orders.idempotencyKey, data.idempotencyKey));
        if (existing) return { ok: true, reference: existing.reference };
      }

      if (message.startsWith("STOCK:")) {
        const [, productName, variantLabel] = message.split(":");
        return {
          ok: false,
          error: `“${productName} — ${variantLabel}” sold out while you were checking out. Please review your cart.`,
        };
      }

      // Reference collision — extremely unlikely; retry with a new reference.
      if (message.includes(DUPLICATE_KEY) && message.includes("reference")) continue;

      console.error("[placeOrder] failed:", err);
      return {
        ok: false,
        error: "We could not place your order right now. Please try again or contact us.",
      };
    }
  }

  if (!reference) {
    return { ok: false, error: "We could not allocate an order reference. Please try again." };
  }
  return { ok: true, reference };
}

export type LookupResult =
  | {
      ok: true;
      order: {
        reference: string;
        fulfilmentStatus: string;
        paymentStatus: string;
        paymentMethod: string;
        totalPaise: number;
        subtotalPaise: number;
        shippingPaise: number;
        createdAt: string;
        city: string;
        state: string;
        pincode: string;
        customerName: string;
      };
      items: Array<{
        productName: string;
        variantLabel: string;
        gradeName: string | null;
        quantity: number;
        totalPaise: number;
      }>;
    }
  | { ok: false; error: string };

export async function lookupOrder(input: unknown): Promise<LookupResult> {
  const parsed = orderLookupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Enter a valid order reference (AVG-XXXXXX) and mobile number." };
  }

  const ip = await clientIp();
  if (!lookupRateLimit(`lookup:${ip}`)) {
    return { ok: false, error: "Too many attempts. Please wait a minute and try again." };
  }

  const [order] = await db
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.reference, parsed.data.reference));
  // Reference alone is not treated as authentication — the phone must match too.
  if (!order || order.phone !== parsed.data.phone) {
    return {
      ok: false,
      error: "No order found for that reference and mobile number combination.",
    };
  }

  const items = await db
    .select()
    .from(schema.orderItems)
    .where(eq(schema.orderItems.orderId, order.id));

  return {
    ok: true,
    order: {
      reference: order.reference,
      fulfilmentStatus: order.fulfilmentStatus,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      totalPaise: order.totalPaise,
      subtotalPaise: order.subtotalPaise,
      shippingPaise: order.shippingPaise,
      createdAt: order.createdAt.toISOString(),
      city: order.city,
      state: order.state,
      pincode: order.pincode,
      customerName: order.customerName,
    },
    items: items.map((i) => ({
      productName: i.productName,
      variantLabel: i.variantLabel,
      gradeName: i.gradeName,
      quantity: i.quantity,
      totalPaise: i.totalPaise,
    })),
  };
}
