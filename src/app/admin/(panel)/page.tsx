import type { Metadata } from "next";
import Link from "next/link";
import {
  getDashboardStats,
  listLowStock,
  listRecentEnquiries,
  listRecentOrders,
} from "@/lib/admin-data";
import { formatINR } from "@/lib/utils";
import {
  EnquiryStatusBadge,
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/components/admin/status-badge";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  IndianRupee,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";

export const metadata: Metadata = { title: "Executive Dashboard — AVRELLE Administration" };

interface DashboardProps {
  searchParams: Promise<{
    error?: string;
    from?: string;
    to?: string;
    range?: string;
  }>;
}

export default async function AdminDashboardPage({ searchParams }: DashboardProps) {
  const { error, from, to, range } = await searchParams;

  let dateRange: { from?: string; to?: string } | undefined;
  const now = new Date();

  if (range === "today") {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    dateRange = { from: start.toISOString() };
  } else if (range === "7d") {
    const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    dateRange = { from: start.toISOString() };
  } else if (range === "30d") {
    const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    dateRange = { from: start.toISOString() };
  } else if (from || to) {
    dateRange = { from, to };
  }

  const [stats, orders, lowStock, enquiries] = await Promise.all([
    getDashboardStats(dateRange),
    listRecentOrders(10),
    listLowStock(10),
    listRecentEnquiries(5),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Store Operations &amp; Intelligence</p>
          <h1 className="mt-1 font-serif text-[30px] text-forest-900 sm:text-[34px]">
            Executive Dashboard
          </h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Authoritative metrics for makhana sales, inventory levels, order milestones, and COD collection.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/reports" className="btn-outline btn-sm flex items-center gap-1.5">
            <FileSpreadsheet className="h-4 w-4" /> Reports &amp; CSV
          </Link>
          <Link href="/admin/products/new" className="btn-primary btn-sm">
            Add Product
          </Link>
          <Link href="/admin/orders" className="btn-outline btn-sm">
            All Orders
          </Link>
        </div>
      </header>

      {/* Date Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-beige-200 bg-white p-3.5 text-[13px]">
        <div className="flex items-center gap-2 text-ink-600 font-medium">
          <Calendar className="h-4 w-4 text-gold-600" />
          <span>Reporting Period:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin"
            className={`rounded px-3 py-1 text-[12px] font-medium transition-colors ${
              !range ? "bg-forest-800 text-white" : "bg-ivory-100 text-ink-700 hover:bg-beige-200"
            }`}
          >
            All Time
          </Link>
          <Link
            href="/admin?range=today"
            className={`rounded px-3 py-1 text-[12px] font-medium transition-colors ${
              range === "today" ? "bg-forest-800 text-white" : "bg-ivory-100 text-ink-700 hover:bg-beige-200"
            }`}
          >
            Today
          </Link>
          <Link
            href="/admin?range=7d"
            className={`rounded px-3 py-1 text-[12px] font-medium transition-colors ${
              range === "7d" ? "bg-forest-800 text-white" : "bg-ivory-100 text-ink-700 hover:bg-beige-200"
            }`}
          >
            Past 7 Days
          </Link>
          <Link
            href="/admin?range=30d"
            className={`rounded px-3 py-1 text-[12px] font-medium transition-colors ${
              range === "30d" ? "bg-forest-800 text-white" : "bg-ivory-100 text-ink-700 hover:bg-beige-200"
            }`}
          >
            Past 30 Days
          </Link>
        </div>
      </div>

      {error === "forbidden" && (
        <div role="alert" className="border border-danger-600/30 bg-danger-100 p-4 text-[13px] text-danger-700">
          Your role does not permit that administrative action.
        </div>
      )}

      {/* Order Milestone Cards */}
      <section aria-label="Order Milestones">
        <h2 className="font-serif text-[18px] text-forest-900 mb-3 flex items-center gap-2">
          <Package className="h-4 w-4 text-gold-600" /> Fulfilment Operations
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          <div className="border border-beige-200 bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">Total Orders</p>
            <p className="mt-1 font-serif text-[24px] text-forest-950">{stats.totalOrders}</p>
          </div>
          <div className="border border-beige-200 bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">Orders Today</p>
            <p className="mt-1 font-serif text-[24px] text-forest-950">{stats.ordersToday}</p>
          </div>
          <div className="border border-amber-200 bg-amber-50/40 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-900">Pending</p>
            <p className="mt-1 font-serif text-[24px] text-amber-900">{stats.pendingOrders}</p>
          </div>
          <div className="border border-gold-200 bg-gold-50/40 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-900">Awaiting Dispatch</p>
            <p className="mt-1 font-serif text-[24px] text-gold-900">{stats.awaitingDispatch}</p>
          </div>
          <div className="border border-blue-200 bg-blue-50/40 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-900">Out for Delivery</p>
            <p className="mt-1 font-serif text-[24px] text-blue-900">{stats.outForDelivery}</p>
          </div>
          <div className="border border-emerald-200 bg-emerald-50/40 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-900">Delivered</p>
            <p className="mt-1 font-serif text-[24px] text-emerald-900">{stats.deliveredOrders}</p>
          </div>
          <div className="border border-danger-200 bg-danger-50/40 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-danger-900">Cancelled</p>
            <p className="mt-1 font-serif text-[24px] text-danger-900">{stats.cancelledOrders}</p>
          </div>
        </div>
      </section>

      {/* Financial Health & COD Collection Cards */}
      <section aria-label="Financial Breakdown">
        <h2 className="font-serif text-[18px] text-forest-900 mb-3 flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-gold-600" /> Financial Accounting
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="border border-beige-200 bg-white p-5">
            <p className="text-[10.5px] font-semibold uppercase tracking-luxe text-ink-500">
              Total Order Value
            </p>
            <p className="mt-2 font-serif text-[26px] text-forest-950">
              {formatINR(stats.totalOrderValuePaise)}
            </p>
            <p className="mt-1 text-[11px] text-ink-400">
              Gross value of all valid orders (excludes cancelled orders).
            </p>
          </div>

          <div className="border border-emerald-200 bg-emerald-50/30 p-5">
            <p className="text-[10.5px] font-semibold uppercase tracking-luxe text-emerald-900">
              Delivered Orders Value
            </p>
            <p className="mt-2 font-serif text-[26px] text-emerald-950">
              {formatINR(stats.deliveredOrderValuePaise)}
            </p>
            <p className="mt-1 text-[11px] text-emerald-800">
              Value of fulfilled and successfully delivered makhana orders.
            </p>
          </div>

          <div className="border border-forest-800/30 bg-forest-50/30 p-5">
            <p className="text-[10.5px] font-semibold uppercase tracking-luxe text-forest-900">
              Recorded Collected COD
            </p>
            <p className="mt-2 font-serif text-[26px] text-forest-900">
              {formatINR(stats.codCollectedPaise)}
            </p>
            <p className="mt-1 text-[11px] text-forest-700">
              Authoritatively confirmed collected cash recorded by staff.
            </p>
          </div>

          <div className="border border-amber-200 bg-amber-50/30 p-5">
            <p className="text-[10.5px] font-semibold uppercase tracking-luxe text-amber-900">
              Unfulfilled COD ({stats.unfulfilledCodOrders} orders)
            </p>
            <p className="mt-2 font-serif text-[26px] text-amber-950">
              {formatINR(stats.unfulfilledCodValuePaise)}
            </p>
            <p className="mt-1 text-[11px] text-amber-800">
              Pending collection upon courier delivery. Not counted as revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Inventory & Wholesale Enquiries Alerts */}
      <section aria-label="Stock and Inquiries Alerts" className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/inventory"
          className="border border-amber-200 bg-amber-50/50 p-4 transition-colors hover:border-amber-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-600" /> Low Stock Variants
            </span>
            <span className="rounded-full bg-amber-200/80 px-2.5 py-0.5 text-[12px] font-bold text-amber-900">
              {stats.lowStockCount}
            </span>
          </div>
          <p className="mt-2 text-[12px] text-amber-800">
            Variants currently at or below their configurable threshold.
          </p>
        </Link>

        <Link
          href="/admin/inventory"
          className="border border-danger-200 bg-danger-50/50 p-4 transition-colors hover:border-danger-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase text-danger-900 flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-danger-600" /> Out of Stock
            </span>
            <span className="rounded-full bg-danger-200/80 px-2.5 py-0.5 text-[12px] font-bold text-danger-900">
              {stats.outOfStockCount}
            </span>
          </div>
          <p className="mt-2 text-[12px] text-danger-800">
            Variants with 0 stock that cannot be checked out by customers.
          </p>
        </Link>

        <Link
          href="/admin/enquiries"
          className="border border-gold-300 bg-gold-50/50 p-4 transition-colors hover:border-gold-400"
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase text-forest-900 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold-700" /> New Wholesale Inquiries
            </span>
            <span className="rounded-full bg-gold-200 px-2.5 py-0.5 text-[12px] font-bold text-forest-950">
              {stats.newEnquiries}
            </span>
          </div>
          <p className="mt-2 text-[12px] text-ink-600">
            Institutional and bulk buyer leads awaiting quote review.
          </p>
        </Link>
      </section>

      {/* Grid: Recent Orders & Low Stock */}
      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        {/* Recent orders */}
        <section className="border border-beige-200 bg-white">
          <div className="flex items-center justify-between border-b border-beige-200 px-5 py-4">
            <h2 className="font-serif text-[19px] text-forest-900">Recent orders</h2>
            <Link
              href="/admin/orders"
              className="text-[11px] font-semibold uppercase tracking-wider text-forest-700 hover:text-gold-700"
            >
              View all orders &rarr;
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="px-5 py-8 text-[13.5px] text-ink-500">No orders placed yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-beige-200 text-[10.5px] uppercase tracking-wider text-ink-500">
                    <th className="px-5 py-2.5 font-semibold">Reference</th>
                    <th className="px-3 py-2.5 font-semibold">Customer</th>
                    <th className="px-3 py-2.5 font-semibold">Total</th>
                    <th className="px-3 py-2.5 font-semibold">Fulfilment</th>
                    <th className="px-3 py-2.5 font-semibold">Payment</th>
                    <th className="px-5 py-2.5 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beige-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-ivory-50/60 transition-colors">
                      <td className="px-5 py-3 font-mono font-medium text-forest-900">
                        {o.reference}
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-medium text-ink-900">{o.customerName}</p>
                        <p className="text-[11.5px] text-ink-500">{o.phone}</p>
                      </td>
                      <td className="px-3 py-3 font-medium text-ink-900">
                        {formatINR(o.totalPaise)}
                      </td>
                      <td className="px-3 py-3">
                        <OrderStatusBadge status={o.fulfilmentStatus} />
                      </td>
                      <td className="px-3 py-3">
                        <PaymentStatusBadge status={o.paymentStatus} />
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link
                          href={`/admin/orders/${o.reference}`}
                          className="font-medium text-forest-700 hover:text-gold-700 underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Low Stock Alerts */}
        <section className="border border-beige-200 bg-white">
          <div className="flex items-center justify-between border-b border-beige-200 px-5 py-4">
            <h2 className="font-serif text-[19px] text-forest-900">Stock Alerts</h2>
            <Link
              href="/admin/inventory"
              className="text-[11px] font-semibold uppercase tracking-wider text-forest-700 hover:text-gold-700"
            >
              Inventory &rarr;
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="px-5 py-8 text-[13.5px] text-ink-500">All product stock levels are healthy.</p>
          ) : (
            <ul className="divide-y divide-beige-100">
              {lowStock.map((v) => (
                <li key={v.id} className="flex items-center justify-between px-5 py-3 text-[13px]">
                  <div>
                    <p className="font-medium text-forest-950">{v.productName}</p>
                    <p className="text-[11.5px] text-ink-500">
                      {v.label} {v.sku ? `• SKU: ${v.sku}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold ${
                        v.stock === 0
                          ? "bg-danger-100 text-danger-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {v.stock === 0 ? "Out of Stock" : `${v.stock} left`}
                    </span>
                    <Link
                      href={`/admin/products/${v.productId}`}
                      className="block mt-1 text-[11px] text-forest-700 underline hover:text-gold-700"
                    >
                      Edit stock
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
