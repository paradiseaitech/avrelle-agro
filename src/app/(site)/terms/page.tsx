import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of use and sale for the AVRELLE AGRO PVT LTD website covering orders, Cash on Delivery, pricing, grades, and acceptable use.",
};

const SECTIONS: Array<{ id: string; h: string; body: React.ReactNode }> = [
  {
    id: "acceptance",
    h: "Acceptance of terms",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        By accessing or using this website you agree to these terms. If you do not agree, please do
        not use the website. These terms apply to the website operated by AVRELLE AGRO PVT LTD and
        to retail orders placed through it.
      </p>
    ),
  },
  {
    id: "catalogue",
    h: "Product information & grades",
    body: (
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-ink-700">
        <li>· Makhana grades (3, 4, 5, 6+ Suta, Thurr(i)) are described with indicative size ranges taken from supplied grading material. Actual dimensions may vary between batches.</li>
        <li>· Product images are illustrative; minor variations in colour, shape, and size between batches are natural for an agricultural product.</li>
        <li>· Availability shown on product pages reflects current stock records and may change without notice.</li>
      </ul>
    ),
  },
  {
    id: "pricing",
    h: "Pricing & sample data",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        All prices are displayed in Indian Rupees and include applicable taxes unless stated
        otherwise. Where the site displays a &quot;sample price&quot; notice, such prices are
        provisional catalogue data pending verification and may be updated before or after an order
        is placed; in such cases we will contact you before fulfilment if the price materially
        changes. Wholesale and bulk rates are never listed as retail prices — they are quoted
        separately in writing through the bulk enquiry process.
      </p>
    ),
  },
  {
    id: "orders",
    h: "Orders & contract formation",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        Placing an order through this website is an offer to buy. An order is accepted when we
        confirm it and dispatch the parcel, at which point a binding contract exists. We may decline
        or cancel an order (for example, stock unavailability, suspected misuse, or pricing errors)
        and will not charge you in such cases because payment is collected on delivery only. Order
        references are personal to the order; the checkout mobile number is used to verify order
        lookups.
      </p>
    ),
  },
  {
    id: "payment",
    h: "Payment (Cash on Delivery)",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        The only payment method currently enabled is Cash on Delivery: the full order total is paid
        in cash to the courier at the time of delivery. No online payment is processed on this
        website. You are responsible for being available to receive the parcel and make payment;
        repeated refused deliveries may affect future ordering.
      </p>
    ),
  },
  {
    id: "shipping",
    h: "Delivery",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        Delivery is made to serviceable PIN codes only, as confirmed at checkout. Timelines are
        estimates rather than guarantees. Risk in the goods passes to you on delivery. Full details
        are in our <Link href="/shipping-policy" className="text-forest-800 underline decoration-gold-500 underline-offset-4">Shipping Policy</Link>.
      </p>
    ),
  },
  {
    id: "returns",
    h: "Cancellations & returns",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        Cancellations and return requests are handled under our{" "}
        <Link href="/returns-policy" className="text-forest-800 underline decoration-gold-500 underline-offset-4">
          Cancellation &amp; Returns Policy
        </Link>
        , which forms part of these terms.
      </p>
    ),
  },
  {
    id: "bulk",
    h: "Bulk & wholesale supply",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        Submitting a bulk enquiry does not create an order or an obligation to supply. Supply terms
        for bulk quantities — grade specifications, price, packaging, freight, taxes, payment terms,
        and timelines — are governed solely by the written quotation and any separate agreement
        executed between the parties.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    h: "Acceptable use",
    body: (
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-ink-700">
        <li>· Do not attempt to interfere with the website, its security, or its data.</li>
        <li>· Do not submit false orders, fake enquiries, or automated abuse.</li>
        <li>· Do not reproduce site content, branding, or product information for commercial use without written permission.</li>
        <li>· Rate limits and monitoring are applied to public forms to prevent abuse.</li>
      </ul>
    ),
  },
  {
    id: "liability",
    h: "Limitation of liability",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        To the maximum extent permitted by law, our liability for any claim arising out of an order
        is limited to the value of that order. We are not liable for indirect or consequential
        losses. Nothing in these terms limits liability that cannot be limited under applicable law,
        including rights available to consumers under consumer protection legislation.
      </p>
    ),
  },
  {
    id: "ip",
    h: "Intellectual property",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        The AVRELLE name, branding, logos, website design, and content are the property of
        AVRELLE AGRO PVT LTD or its licensors and may not be used without prior written permission.
      </p>
    ),
  },
  {
    id: "law",
    h: "Governing law & contact",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        These terms are governed by the laws of India, and disputes are subject to the exclusive
        jurisdiction of the courts in Purnea, Bihar. Questions about these terms can be raised
        through the contact details on our{" "}
        <Link href="/contact" className="text-forest-800 underline decoration-gold-500 underline-offset-4">Contact page</Link>.
      </p>
    ),
  },
];

export default async function TermsPage() {
  const { business } = await getSettings();

  return (
    <>
      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">Terms &amp; Conditions</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-serif text-[32px] text-forest-900 sm:text-[42px]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-[13px] text-ink-500">
            Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="section-shell max-w-3xl py-12 sm:py-16">
        <p className="text-[15px] leading-relaxed text-ink-700">
          These terms govern your use of the {business.displayName} website and retail purchases
          made through it. Please read them together with our Privacy Policy, Shipping Policy, and
          Cancellation &amp; Returns Policy.
        </p>

        <nav aria-label="On this page" className="mt-8 border border-beige-200 bg-ivory-100 p-5">
          <p className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-500">On this page</p>
          <ol className="mt-3 grid gap-1.5 text-[13.5px] sm:grid-cols-2">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-forest-700 underline decoration-gold-500 underline-offset-4 hover:text-gold-700">
                  {i + 1}. {s.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 space-y-9">
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-serif text-[23px] text-forest-900">
                {i + 1}. {s.h}
              </h2>
              {s.body}
            </section>
          ))}
        </div>

        <p className="mt-10 text-[13px] leading-relaxed text-ink-500">
          We may revise these terms from time to time. The version in effect at the time you place an
          order applies to that order. For questions, contact {business.email} or {business.phone}.
        </p>
      </div>
    </>
  );
}
