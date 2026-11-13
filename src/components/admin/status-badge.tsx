import type { EnquiryStatus, OrderStatus, PaymentStatus } from "@/db/schema";

const ORDER_STYLES: Record<OrderStatus, string> = {
  pending: "border-amber-500/30 bg-amber-50 text-amber-800",
  confirmed: "border-blue-500/30 bg-blue-50 text-blue-800",
  packed: "border-indigo-500/30 bg-indigo-50 text-indigo-800",
  shipped: "border-cyan-600/30 bg-cyan-50 text-cyan-800",
  delivered: "border-emerald-600/30 bg-emerald-50 text-emerald-800",
  cancelled: "border-rose-500/30 bg-rose-50 text-rose-700",
};

const PAYMENT_STYLES: Record<PaymentStatus, string> = {
  unpaid: "border-amber-500/30 bg-amber-50 text-amber-800",
  paid: "border-emerald-600/30 bg-emerald-50 text-emerald-800",
  refunded: "border-ink-400/30 bg-ivory-100 text-ink-600",
};

const ENQUIRY_STYLES: Record<EnquiryStatus, string> = {
  new: "border-amber-500/30 bg-amber-50 text-amber-800",
  reviewing: "border-blue-500/30 bg-blue-50 text-blue-800",
  quoted: "border-gold-600/40 bg-gold-100/60 text-gold-800",
  closed: "border-ink-400/30 bg-ivory-100 text-ink-600",
};

const base =
  "inline-flex items-center border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`${base} ${ORDER_STYLES[status]}`}>{status}</span>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <span className={`${base} ${PAYMENT_STYLES[status]}`}>{status}</span>;
}

export function EnquiryStatusBadge({ status }: { status: string }) {
  const style = ENQUIRY_STYLES[status as EnquiryStatus] ?? ENQUIRY_STYLES.closed;
  return <span className={`${base} ${style}`}>{status}</span>;
}
