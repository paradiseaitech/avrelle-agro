import Link from "next/link";
import type { Order, OrderItem } from "@/db/schema";
import { Package, ChevronRight, Clock, CheckCircle2, Truck, AlertCircle } from "lucide-react";

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export function OrderHistoryList({ orders }: { orders: OrderWithItems[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded border border-dashed border-beige-300 p-8 text-center bg-ivory-50/50">
        <Package className="mx-auto h-8 w-8 text-ink-300" />
        <h3 className="mt-2 font-serif text-[18px] text-forest-900">No orders placed yet</h3>
        <p className="mt-1 text-[13px] text-ink-500">
          When you place an order for hand-harvested Purnea makhana, it will appear here.
        </p>
        <Link href="/shop" className="btn-primary btn-sm mt-4 inline-block">
          Explore Products &rarr;
        </Link>
      </div>
    );
  }

  const formatRupees = (paise: number) =>
    (paise / 100).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            <CheckCircle2 className="h-3 w-3" /> Delivered
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-800">
            <Truck className="h-3 w-3" /> Shipped
          </span>
        );
      case "packed":
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-gold-100 px-2.5 py-1 text-[11px] font-semibold text-gold-900">
            <Clock className="h-3 w-3" /> Processing
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 rounded bg-danger-100 px-2.5 py-1 text-[11px] font-semibold text-danger-700">
            <AlertCircle className="h-3 w-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded bg-beige-200 px-2.5 py-1 text-[11px] font-semibold text-ink-700">
            <Clock className="h-3 w-3" /> Pending Confirmation
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        return (
          <div
            key={order.id}
            className="rounded border border-beige-200 bg-white p-5 transition-shadow hover:shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-beige-100 pb-3">
              <div>
                <span className="font-mono text-[14px] font-bold text-forest-900">
                  {order.reference}
                </span>
                <span className="mx-2 text-beige-300">•</span>
                <span className="text-[12.5px] text-ink-500">{orderDate}</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(order.fulfilmentStatus)}
                <span
                  className={`rounded px-2 py-0.5 text-[11px] font-medium uppercase ${
                    order.paymentStatus === "paid"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {order.paymentMethod.toUpperCase()} • {order.paymentStatus}
                </span>
              </div>
            </div>

            <div className="py-3">
              <ul className="space-y-1.5 text-[13px] text-ink-700">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.productName}{" "}
                      <span className="text-ink-400">({item.variantLabel})</span> × {item.quantity}
                    </span>
                    <span className="font-medium text-ink-900">
                      ₹{formatRupees(item.totalPaise)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-beige-100 pt-3">
              <div>
                <span className="text-[12px] text-ink-500">Total Amount: </span>
                <span className="font-serif text-[17px] font-semibold text-forest-950">
                  ₹{formatRupees(order.totalPaise)}
                </span>
              </div>
              <Link
                href={`/account/orders/${order.reference}`}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-forest-800 hover:text-gold-700"
              >
                View Details &amp; Track <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
