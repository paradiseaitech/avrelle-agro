import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Shipping, delivery timelines, free-shipping thresholds, and PIN-code serviceability for AVRELLE AGRO makhana orders in India.",
};

export default async function ShippingPolicyPage() {
  const { shipping, business } = await getSettings();

  const points: Array<{ term: string; detail: string }> = [
    {
      term: "Dispatch",
      detail: "Confirmed orders are typically dispatched within 2–3 working days, subject to stock availability.",
    },
    {
      term: "Delivery timeline",
      detail: `Estimated ${shipping.estDaysMin}–${shipping.estDaysMax} working days from dispatch, depending on your PIN code. Timelines are estimates and may vary by location or courier conditions.`,
    },
    {
      term: "Shipping charge",
      detail:
        shipping.defaultPaise > 0
          ? `A flat charge of ${formatINR(shipping.defaultPaise)} applies to most PIN codes, unless overridden by a PIN-specific rule.`
          : "A flat shipping charge applies to most PIN codes unless overridden by a PIN-specific rule.",
    },
    {
      term: "Free shipping",
      detail:
        shipping.freeShippingAbovePaise > 0
          ? `Orders with a subtotal of ${formatINR(shipping.freeShippingAbovePaise)} or more ship free to serviceable PIN codes.`
          : "A free-shipping threshold is not currently configured.",
    },
    {
      term: "Serviceability",
      detail: "Enter your PIN code at checkout to confirm delivery availability and the exact charge for your location before placing the order.",
    },
    {
      term: "Tracking",
      detail: "Use your order reference (AVG-XXXXXX) and checkout mobile number on the Order Status page to view the current fulfilment status.",
    },
  ];

  return (
    <>
      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">Shipping Policy</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-serif text-[34px] text-forest-900 sm:text-[42px]">Shipping Policy</h1>
          <p className="mt-3 text-[13px] text-ink-500">
            Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="section-shell max-w-3xl py-12 sm:py-16">
        <p className="text-[15px] leading-relaxed text-ink-700">
          This policy applies to retail orders placed through this website and paid by Cash on
          Delivery. Bulk and wholesale shipments follow the terms stated in the written quotation.
        </p>

        <dl className="mt-8 divide-y divide-beige-200 border-y border-beige-200">
          {points.map((p) => (
            <div key={p.term} className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
              <dt className="text-[12px] font-semibold uppercase tracking-wider text-forest-800">
                {p.term}
              </dt>
              <dd className="text-[14.5px] leading-relaxed text-ink-700">{p.detail}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-10" aria-labelledby="ship-faq">
          <h2 id="ship-faq" className="font-serif text-[24px] text-forest-900">
            Important notes
          </h2>
          <ul className="mt-4 space-y-3 text-[14.5px] leading-relaxed text-ink-700">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              Please ensure your address, PIN code, and mobile number are accurate. Incorrect details
              may delay delivery or cause the courier to return the parcel.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              Cash on Delivery payments are made directly to the courier at handover. Keep the exact
              amount ready where possible.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              If a delivery cannot be completed due to an unreachable recipient or an incorrect
              address, re-delivery charges if any will be communicated before re-attempting.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              Delivery timelines are estimates, not guarantees. For time-sensitive requirements,
              contact us before ordering.
            </li>
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Contact Us</Link>
          <Link href="/returns-policy" className="btn-outline">Cancellation &amp; Returns</Link>
        </div>

        <p className="mt-8 text-[13px] text-ink-500">
          Questions about shipping to your area? Call {business.phone} or email {business.email}.
        </p>
      </div>
    </>
  );
}
