"use client";

import { useState } from "react";
import { lookupOrder, type LookupResult } from "@/lib/actions/orders";
import { formatINR } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  pending: "Order received",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function OrderLookupForm() {
  const [form, setForm] = useState({ reference: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setResult(null);
    const res = await lookupOrder({ reference: form.reference, phone: form.phone });
    setResult(res);
    setBusy(false);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={onSubmit} noValidate className="border border-beige-200 bg-white p-6 sm:p-8">
        <div className="grid gap-4">
          <div>
            <label htmlFor="os-ref" className="field-label">Order reference</label>
            <input
              id="os-ref"
              className="field font-mono uppercase"
              placeholder="AVG-XXXXXX"
              value={form.reference}
              onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value.toUpperCase() }))}
              required
            />
          </div>
          <div>
            <label htmlFor="os-phone" className="field-label">Mobile number used at checkout</label>
            <input
              id="os-phone"
              className="field"
              inputMode="tel"
              placeholder="10-digit mobile"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              required
            />
          </div>
        </div>
        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full">
          {busy ? "Checking…" : "Check Status"}
        </button>
        <p className="mt-3 text-[12px] leading-relaxed text-ink-500">
          For your privacy, both the reference and the mobile number are required to view an order.
        </p>
      </form>

      <div aria-live="polite">
        {result && !result.ok && (
          <p role="alert" className="border border-danger-600/30 bg-danger-100 p-4 text-[13.5px] leading-relaxed text-danger-600">
            {result.error}
          </p>
        )}

        {result?.ok && (
          <div className="border border-beige-200 bg-white p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-serif text-[22px] text-forest-900">{result.order.reference}</h2>
              <span className="border border-forest-800/25 bg-forest-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-forest-800">
                {STATUS_LABELS[result.order.fulfilmentStatus] ?? result.order.fulfilmentStatus}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-ink-500">
              Placed on {new Date(result.order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <ul className="mt-5 divide-y divide-beige-200 border-y border-beige-200">
              {result.items.map((i, idx) => (
                <li key={idx} className="flex justify-between gap-4 py-3 text-[13.5px]">
                  <span className="text-ink-800">
                    {i.productName}
                    <span className="block text-[12px] text-ink-500">
                      {i.variantLabel} · Qty {i.quantity}
                    </span>
                  </span>
                  <span className="font-medium">{formatINR(i.totalPaise)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2 text-[13.5px]">
              <div className="flex justify-between">
                <dt className="text-ink-600">Total</dt>
                <dd className="font-semibold text-forest-900">{formatINR(result.order.totalPaise)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-600">Payment</dt>
                <dd className="text-ink-800">
                  Cash on Delivery —{" "}
                  {result.order.paymentStatus === "paid" ? "collected" : "pending delivery"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-600">Delivering to</dt>
                <dd className="text-ink-800">
                  {result.order.city}, {result.order.state} {result.order.pincode}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {!result && (
          <p className="border border-dashed border-beige-300 bg-ivory-100 p-8 text-center text-[13.5px] text-ink-500">
            Enter your order reference and mobile number to see the current status.
          </p>
        )}
      </div>
    </div>
  );
}
