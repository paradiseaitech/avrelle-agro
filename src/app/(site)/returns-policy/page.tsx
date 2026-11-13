import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";

export const metadata: Metadata = {
  title: "Cancellation & Returns Policy",
  description:
    "Order cancellation, returns, replacements, and refunds for AVRELLE AGRO makhana orders placed with Cash on Delivery.",
};

const STEPS = [
  {
    title: "1. Contact us promptly",
    body: "Call or WhatsApp us with your order reference (AVG-XXXXXX) as soon as you identify an issue — ideally within 24 hours of delivery for damaged or incorrect items.",
  },
  {
    title: "2. Share details",
    body: "Provide your order reference, a description of the issue, and clear photographs of the delivered pack and shipping label where applicable.",
  },
  {
    title: "3. We review and confirm",
    body: "We assess the claim against the order record and confirm the resolution — replacement, exchange, or refund — usually within 2 business days of receiving details.",
  },
  {
    title: "4. Resolution",
    body: "Approved replacements are dispatched subject to stock. Approved refunds for COD orders are processed to a bank account or UPI ID provided by you, typically within 5–7 business days.",
  },
];

export default async function ReturnsPolicyPage() {
  const { business } = await getSettings();

  return (
    <>
      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">Cancellation &amp; Returns</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-serif text-[30px] text-forest-900 sm:text-[40px]">
            Cancellation &amp; Returns Policy
          </h1>
          <p className="mt-3 text-[13px] text-ink-500">
            Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="section-shell max-w-3xl py-12 sm:py-16">
        <p className="text-[15px] leading-relaxed text-ink-700">
          We want every order to arrive in the condition you expect. This policy covers retail
          Cash-on-Delivery orders placed on this website. Wholesale shipments follow the terms in
          the written quotation.
        </p>

        <section className="mt-10" aria-labelledby="cancel-h">
          <h2 id="cancel-h" className="font-serif text-[24px] text-forest-900">Order cancellation</h2>
          <ul className="mt-4 space-y-3 text-[14.5px] leading-relaxed text-ink-700">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              You may cancel an order free of charge before it is dispatched, by contacting us with
              your order reference.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              Once an order has been dispatched, it cannot be cancelled in transit. You may decline
              delivery at the doorstep and the order will be treated as returned.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              Because payment is collected on delivery, cancelling an order never involves a payment
              refund to a card or wallet.
            </li>
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="return-h">
          <h2 id="return-h" className="font-serif text-[24px] text-forest-900">
            Returns, replacements &amp; refunds
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
            We accept replacement or refund requests for retail orders in these situations:
          </p>
          <ul className="mt-4 space-y-3 text-[14.5px] leading-relaxed text-ink-700">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              The pack arrived damaged, swollen, or with compromised packaging.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              The delivered items do not match your order (wrong grade or pack size).
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              Parts of your order are missing from the parcel.
            </li>
          </ul>
          <p className="mt-4 text-[14.5px] leading-relaxed text-ink-700">
            Requests must be raised within <strong>48 hours of delivery</strong> with your order
            reference and photographs. Requests raised later may not be accepted.
          </p>
          <p className="mt-4 text-[14.5px] leading-relaxed text-ink-600">
            Because makhana is a food product, we cannot accept returns of opened or consumed packs
            for change-of-mind reasons. Sealed packs returned unused within 48 hours of delivery due
            to a genuine error on our part are eligible for replacement or refund.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="process-h">
          <h2 id="process-h" className="font-serif text-[24px] text-forest-900">How it works</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {STEPS.map((s) => (
              <li key={s.title} className="border border-beige-200 bg-white p-5">
                <h3 className="text-[15px] font-semibold text-forest-900">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 border border-beige-200 bg-ivory-100 p-6" aria-labelledby="notes-h">
          <h2 id="notes-h" className="font-serif text-[20px] text-forest-900">Please note</h2>
          <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-ink-700">
            <li>· Decisions on claims are made against the recorded order and shipment details.</li>
            <li>· Refunds are never paid in cash at the doorstep.</li>
            <li>· Discounts or offers applied at the time of order are reflected in any refund amount.</li>
            <li>· This policy may be updated; the version current at the time of your order applies.</li>
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Contact Us</Link>
          <Link href="/order-status" className="btn-outline">Check Order Status</Link>
        </div>

        <p className="mt-8 text-[13px] text-ink-500">
          For any cancellation or return request, call {business.phone} or email {business.email}
          with your order reference.
        </p>
      </div>
    </>
  );
}
