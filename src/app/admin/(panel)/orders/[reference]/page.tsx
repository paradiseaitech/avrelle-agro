import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderByReference } from "@/lib/admin-data";
import { formatDateTime, formatINR } from "@/lib/utils";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/admin/status-badge";
import { CodCollectionForm, OrderStatusForm } from "@/components/admin/order-actions";
import { PrintOrderButton } from "@/components/admin/print-order-button";

export const metadata: Metadata = { title: "Order Detail" };

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const order = await getOrderByReference(reference);
  if (!order) notFound();

  const timeline = [...order.statusHistory].reverse();
  const codDisabled = order.paymentStatus === "paid" || order.fulfilmentStatus === "cancelled";

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/admin" className="hover:text-forest-700">Dashboard</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/admin/orders" className="hover:text-forest-700">Orders</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-forest-800">{order.reference}</li>
        </ol>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow">Order</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900">{order.reference}</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Placed {formatDateTime(order.createdAt)} · {order.items.length} line
            {order.items.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PrintOrderButton />
          <OrderStatusBadge status={order.fulfilmentStatus} />
          <PaymentStatusBadge status={order.paymentStatus} />
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          {/* Items */}
          <section className="border border-beige-200 bg-white">
            <h2 className="border-b border-beige-200 px-5 py-4 font-serif text-[19px] text-forest-900">
              Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-beige-200 text-[10.5px] uppercase tracking-wider text-ink-500">
                    <th className="px-5 py-2.5 font-semibold">Product</th>
                    <th className="px-3 py-2.5 text-center font-semibold">Qty</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Unit</th>
                    <th className="px-5 py-2.5 text-right font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beige-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-5 py-3">
                        <span className="block font-medium text-forest-900">{item.productName}</span>
                        <span className="text-[11.5px] text-ink-500">
                          {[item.gradeName, item.variantLabel].filter(Boolean).join(" · ")}
                          {item.variantId ? "" : " · variant removed"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">{item.quantity}</td>
                      <td className="px-3 py-3 text-right">{formatINR(item.unitPricePaise)}</td>
                      <td className="px-5 py-3 text-right font-medium">{formatINR(item.totalPaise)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <dl className="space-y-2 border-t border-beige-200 px-5 py-4 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-ink-600">Subtotal</dt>
                <dd>{formatINR(order.subtotalPaise)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-600">Shipping &amp; fees</dt>
                <dd>{formatINR(order.shippingPaise)}</dd>
              </div>
              {order.discountPaise > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-600">Discount</dt>
                  <dd>−{formatINR(order.discountPaise)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-beige-200 pt-2 text-[15px] font-semibold text-forest-900">
                <dt>Order total</dt>
                <dd>{formatINR(order.totalPaise)}</dd>
              </div>
            </dl>
          </section>

          {/* Timeline */}
          <section className="border border-beige-200 bg-white">
            <h2 className="border-b border-beige-200 px-5 py-4 font-serif text-[19px] text-forest-900">
              Status history
            </h2>
            {timeline.length === 0 ? (
              <p className="px-5 py-6 text-[13px] text-ink-500">No status events recorded.</p>
            ) : (
              <ol className="divide-y divide-beige-200">
                {timeline.map((event, i) => (
                  <li key={`${event.at}-${i}`} className="flex gap-3 px-5 py-3.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    <div>
                      <p className="text-[13px] font-medium capitalize text-forest-900">
                        {event.status}
                      </p>
                      {event.note && (
                        <p className="mt-0.5 text-[12.5px] text-ink-600">{event.note}</p>
                      )}
                      <p className="mt-0.5 text-[11px] text-ink-400">{formatDateTime(event.at)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        <div className="space-y-6">
          {/* Customer */}
          <section className="border border-beige-200 bg-white p-5">
            <h2 className="font-serif text-[19px] text-forest-900">Customer</h2>
            <dl className="mt-4 space-y-3 text-[13px]">
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">Name</dt>
                <dd className="mt-0.5 text-ink-800">{order.customerName}</dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">Phone</dt>
                <dd className="mt-0.5">
                  <a href={`tel:${order.phone}`} className="text-forest-800 hover:text-gold-700">
                    {order.phone}
                  </a>
                </dd>
              </div>
              {order.email && (
                <div>
                  <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">Email</dt>
                  <dd className="mt-0.5 break-all">
                    <a href={`mailto:${order.email}`} className="text-forest-800 hover:text-gold-700">
                      {order.email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">Delivery address</dt>
                <dd className="mt-0.5 leading-relaxed text-ink-700">
                  {order.addressLine1}
                  {order.addressLine2 ? <>, {order.addressLine2}</> : null}
                  {order.landmark ? <>, near {order.landmark}</> : null}
                  <br />
                  {order.city}, {order.state} — {order.pincode}
                </dd>
              </div>
              {order.deliveryInstructions && (
                <div>
                  <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">
                    Delivery instructions
                  </dt>
                  <dd className="mt-0.5 whitespace-pre-line text-ink-700">{order.deliveryInstructions}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Status update */}
          <section className="border border-beige-200 bg-white p-5">
            <h2 className="mb-4 font-serif text-[19px] text-forest-900">Fulfilment</h2>
            <OrderStatusForm orderId={order.id} currentStatus={order.fulfilmentStatus} />
          </section>

          {/* COD */}
          <section className="border border-beige-200 bg-white p-5">
            <h2 className="font-serif text-[19px] text-forest-900">Cash on Delivery</h2>
            <dl className="mt-3 space-y-2 text-[12.5px]">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-500">Amount due</dt>
                <dd className="font-semibold text-forest-900">{formatINR(order.totalPaise)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-500">Payment status</dt>
                <dd><PaymentStatusBadge status={order.paymentStatus} /></dd>
              </div>
              {order.codCollectedAt && (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-500">Collected</dt>
                  <dd className="text-ink-800">{formatDateTime(order.codCollectedAt)}</dd>
                </div>
              )}
              {order.collectedBy && (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-500">Recorded by</dt>
                  <dd className="text-ink-800">{order.collectedBy.name}</dd>
                </div>
              )}
            </dl>
            <div className="mt-4 border-t border-beige-200 pt-4">
              <CodCollectionForm
                orderId={order.id}
                amountLabel={formatINR(order.totalPaise)}
                disabled={codDisabled}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
