"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { orderStatuses, type OrderStatus } from "@/db/schema";
import { requireManager } from "@/lib/auth";

const db = getDb();

export interface OrderActionResult {
  ok?: boolean;
  error?: string;
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function updateOrderStatusAction(
  _prev: OrderActionResult,
  formData: FormData,
): Promise<OrderActionResult> {
  const admin = await requireManager();
  const orderId = str(formData, "orderId");
  const status = str(formData, "status") as OrderStatus;
  const note = str(formData, "note").slice(0, 300);

  if (!orderId) return { error: "Missing order." };
  if (!orderStatuses.includes(status)) return { error: "Invalid order status." };

  const [order] = await db
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.id, orderId))
    .limit(1);
  if (!order) return { error: "Order not found." };
  if (order.fulfilmentStatus === status) {
    return { error: `Order is already marked “${status}”.` };
  }

  const items = await db
    .select()
    .from(schema.orderItems)
    .where(eq(schema.orderItems.orderId, orderId));

  const history = [
    ...order.statusHistory,
    {
      status,
      at: new Date().toISOString(),
      note: note || `Status changed by ${admin.name}`,
    },
  ];

  const cancelledNow = status === "cancelled" && order.fulfilmentStatus !== "cancelled";

  await db.transaction(async (tx) => {
    await tx
      .update(schema.orders)
      .set({ fulfilmentStatus: status, statusHistory: history })
      .where(eq(schema.orders.id, orderId));

    // Cancelling an order returns reserved stock to the catalogue.
    if (cancelledNow) {
      for (const item of items) {
        if (!item.variantId) continue;
        await tx
          .update(schema.productVariants)
          .set({ stock: sql`${schema.productVariants.stock} + ${item.quantity}` })
          .where(eq(schema.productVariants.id, item.variantId));
      }
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${order.reference}`);
  revalidatePath("/order-status");
  if (cancelledNow) revalidatePath("/", "layout");

  return { ok: true };
}

export async function recordCodAction(
  _prev: OrderActionResult,
  formData: FormData,
): Promise<OrderActionResult> {
  const admin = await requireManager();
  const orderId = str(formData, "orderId");
  if (!orderId) return { error: "Missing order." };

  const [order] = await db
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.id, orderId))
    .limit(1);
  if (!order) return { error: "Order not found." };
  if (order.paymentStatus === "paid") return { error: "COD is already recorded as collected." };
  if (order.fulfilmentStatus === "cancelled") {
    return { error: "Cancelled orders cannot record a COD collection." };
  }

  await db
    .update(schema.orders)
    .set({
      paymentStatus: "paid",
      codCollectedAt: new Date(),
      codCollectedBy: admin.id,
      statusHistory: [
        ...order.statusHistory,
        {
          status: order.fulfilmentStatus,
          at: new Date().toISOString(),
          note: `COD collected — recorded by ${admin.name}`,
        },
      ],
    })
    .where(eq(schema.orders.id, orderId));

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${order.reference}`);
  revalidatePath("/order-status");
  return { ok: true };
}
