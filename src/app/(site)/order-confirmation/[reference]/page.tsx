import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { getSettings } from "@/lib/db-data";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Confirmation",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Order received",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const db = getDb();
  const normalized = reference.toUpperCase();

  const [order] = await db
    .select({
      id: schema.orders.id,
      reference: schema.orders.reference,
      customerName: schema.orders.customerName,
      totalPaise: schema.orders.totalPaise,
      subtotalPaise: schema.orders.subtotalPaise,
      shippingPaise: schema.orders.shippingPaise,
      fulfilmentStatus: schema.orders.fulfilmentStatus,
      paymentMethod: schema.orders.paymentMethod,
      paymentStatus: schema.orders.paymentStatus,
      city: schema.orders.city,
      state: schema.orders.state,
      pincode: schema.orders.pincode,
      createdAt: schema.orders.createdAt,
    })
    .from(schema.orders)
    .where(eq(schema.orders.reference, normalized))
    .limit(1);

  const { business } = await getSettings();
  const wa = business.whatsapp.replace(/\D/g, "");

  if (!order) {
    return (
      <div className="section-shell py-24 text-center">
        <h1 className="font-serif text-[30px] text-forest-900">Order not found</h1>
        <p className="mt-4 text-[14.5px] text-ink-600">
          We could not find that order reference. Please check your confirmation details or contact
          us.
        </p>
        <Link href="/order-status" className="btn-primary mt-8">
          Check Order Status
        </Link>
      </div>
    );
  }

  const items = await db.select().from(schema.orderItems).where(eq(schema.orderItems.orderId, order.id));

  return (
    <div className="section-shell max-w-3xl py-12 sm:py-16">
      <div className="text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-100 text-success-700">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="mt-5 font-serif text-[32px] text-forest-900 sm:text-[38px]">
          Thank you, {order.customerName.split(" ")[0]}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
          Your Cash on-Delivery order has been received and is recorded with us.
        </p>
        <p className="mt-6 inline-block border border-gold-500/50 bg-gold-100/60 px-6 py-3">
          <span className="block text-[10.5px] font-semibold uppercase tracking-luxe text-gold-700">
            Order reference
          </span>
          <span className="mt-1 block font-serif text-[26px] tracking-[0.12em] text-forest-900">
            {order.reference}
          </span>
        </p>
        <p className="mt-3 text-[13px] text-ink-500">Please save this reference for your records.</p>
      </div>

      <div className="mt-10 border border-beige-200 bg-white p-6 sm:p-8">
        <h2 className="font-serif text-[20px] text-forest-900">Order summary</h2>
        <ul className="mt-4 divide-y divide-beige-200">
          {items.map((i) => (
            <li key={i.id} className="flex justify-between gap-4 py-3 text-[14px]">
              <span className="text-ink-800">
                {i.productName}
                <span className="block text-[12.5px] text-ink-500">
                  {i.gradeName ? `${i.gradeName} · ` : ""}
                  {i.variantLabel} · Qty {i.quantity}
                </span>
              </span>
              <span className="shrink-0 font-medium">{formatINR(i.totalPaise)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-beige-200 pt-4 text-[14px]">
          <div className="flex justify-between">
            <dt className="text-ink-600">Subtotal</dt>
            <dd>{formatINR(order.subtotalPaise)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-600">Shipping</dt>
            <dd>{order.shippingPaise === 0 ? "FREE" : formatINR(order.shippingPaise)}</dd>
          </div>
          <div className="flex justify-between border-t border-beige-200 pt-2.5">
            <dt className="font-semibold text-forest-900">Total payable on delivery</dt>
            <dd className="font-serif text-[20px] text-forest-800">{formatINR(order.totalPaise)}</dd>
          </div>
        </dl>
        <p className="mt-4 border border-warning-700/25 bg-warning-100 p-3 text-[13px] leading-relaxed text-warning-700">
          Payment method: Cash on Delivery. Please keep the exact amount ready; payment is made to
          the courier at the time of delivery.
        </p>

        <dl className="mt-5 grid gap-4 text-[13.5px] sm:grid-cols-2">
          <div>
            <dt className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-500">Delivering to</dt>
            <dd className="mt-1 text-ink-800">
              {order.city}, {order.state} {order.pincode}
            </dd>
          </div>
          <div>
            <dt className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-500">Status</dt>
            <dd className="mt-1 text-ink-800">
              {STATUS_LABELS[order.fulfilmentStatus] ?? order.fulfilmentStatus}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/order-status" className="btn-outline">
          Track Order Status
        </Link>
        <Link href="/shop" className="btn-outline">
          Continue Shopping
        </Link>
        {wa && (
          <a
            href={`https://wa.me/${wa}?text=${encodeURIComponent(
              `Hello AVRELLE AGRO, I have a question about order ${order.reference}.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Questions? WhatsApp Us
          </a>
        )}
      </div>
    </div>
  );
}
