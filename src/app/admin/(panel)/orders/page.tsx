import type { Metadata } from "next";
import Link from "next/link";
import { listOrders } from "@/lib/admin-data";
import { formatDateTime, formatINR } from "@/lib/utils";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/admin/status-badge";
import { orderStatuses, paymentStatuses } from "@/db/schema";

export const metadata: Metadata = { title: "Orders" };

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; payment?: string; q?: string }>;
}) {
  const params = await searchParams;
  const status = orderStatuses.includes(params.status as never) ? params.status : undefined;
  const payment = paymentStatuses.includes(params.payment as never) ? params.payment : undefined;
  const q = params.q?.trim() || undefined;

  const orders = await listOrders({ status, payment, q });
  const hasFilters = Boolean(status || payment || q);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Sales</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900">Orders</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            {orders.length} order{orders.length === 1 ? "" : "s"} shown
            {hasFilters ? " (filtered)" : ""}.
          </p>
        </div>
        <Link href="/admin" className="btn-outline btn-sm">
          Dashboard
        </Link>
      </header>

      <form method="get" className="grid gap-3 border border-beige-200 bg-white p-4 sm:grid-cols-[1fr_170px_170px_auto]">
        <div>
          <label htmlFor="order-search" className="field-label">Search</label>
          <input
            id="order-search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Reference, name, phone, PIN"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="order-status" className="field-label">Fulfilment</label>
          <select id="order-status" name="status" defaultValue={status ?? ""} className="field">
            <option value="">All statuses</option>
            {orderStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="order-payment" className="field-label">Payment</label>
          <select id="order-payment" name="payment" defaultValue={payment ?? ""} className="field">
            <option value="">All payments</option>
            {paymentStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button type="submit" className="btn-primary btn-sm">Filter</button>
          {hasFilters && (
            <Link href="/admin/orders" className="btn-outline btn-sm">Clear</Link>
          )}
        </div>
      </form>

      <div className="border border-beige-200 bg-white">
        {orders.length === 0 ? (
          <p className="px-5 py-10 text-center text-[13.5px] text-ink-500">
            No orders match these filters.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-beige-200 text-[10.5px] uppercase tracking-wider text-ink-500">
                  <th className="px-5 py-3 font-semibold">Order</th>
                  <th className="px-3 py-3 font-semibold">Customer</th>
                  <th className="px-3 py-3 font-semibold">Ship to</th>
                  <th className="px-3 py-3 font-semibold">Fulfilment</th>
                  <th className="px-3 py-3 font-semibold">Payment</th>
                  <th className="px-5 py-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-ivory-50">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/orders/${o.reference}`}
                        className="font-medium text-forest-800 hover:text-gold-700"
                      >
                        {o.reference}
                      </Link>
                      <span className="mt-0.5 block text-[11px] text-ink-400">
                        {formatDateTime(o.createdAt)}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="block text-ink-800">{o.customerName}</span>
                      <span className="text-[11.5px] text-ink-500">{o.phone}</span>
                    </td>
                    <td className="px-3 py-3.5 text-[12.5px] text-ink-600">
                      {o.city}, {o.state}
                      <span className="block text-[11.5px] text-ink-400">{o.pincode}</span>
                    </td>
                    <td className="px-3 py-3.5">
                      <OrderStatusBadge status={o.fulfilmentStatus} />
                    </td>
                    <td className="px-3 py-3.5">
                      <PaymentStatusBadge status={o.paymentStatus} />
                    </td>
                    <td className="px-5 py-3.5 text-right font-medium text-forest-900">
                      {formatINR(o.totalPaise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
