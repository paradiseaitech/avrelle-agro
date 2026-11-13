import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about makhana grades, ordering, Cash on Delivery, shipping, returns, and bulk supply from AVRELLE AGRO PVT LTD.",
};

const FAQ_GROUPS: Array<{ group: string; items: Array<{ q: string; a: string }> }> = [
  {
    group: "Products & grades",
    items: [
      {
        q: "What is makhana?",
        a: "Makhana, also known as fox nuts or lotus seeds (phool makhana), is a puffed seed traditionally grown in Bihar. It is commonly dry-roasted and eaten as a snack or used in cooking.",
      },
      {
        q: "What does 'suta' mean?",
        a: "Suta is a traditional unit used to grade makhana by size, roughly one-eighth of an inch. A 5 Suta nut is larger than a 4 Suta nut, and so on. Larger grades are rarer and typically cost more.",
      },
      {
        q: "Which grade should I buy?",
        a: "For everyday cooking and snacking mixes, 3 or 4 Suta offer good value. For dry-roasted snacks where size matters visually, 5 or 6+ Suta are preferred. See our Makhana Grades page for the full comparison.",
      },
      {
        q: "Are the size ranges exact?",
        a: "Size ranges published on this site are indicative reference values from supplied grading material. Actual dimensions can vary between batches. Contact us for current stock specifications.",
      },
      {
        q: "Is Thurr(i) available as a retail pack?",
        a: "Thurr(i) is the smallest grade (approximately 6–8 mm) and is typically supplied for processing and speciality uses. Retail pack availability is confirmed on enquiry.",
      },
    ],
  },
  {
    group: "Ordering & payment",
    items: [
      {
        q: "How can I pay?",
        a: "Cash on Delivery (COD) is currently the only payment method. Payment is made in cash to the courier when your order is delivered — no online payment is collected on this site.",
      },
      {
        q: "How do I know my order was placed?",
        a: "After checkout you receive an order reference (format AVG-XXXXXX) on the confirmation page. Save it — you can use it with your mobile number on the Order Status page at any time.",
      },
      {
        q: "Can I place the same order twice by mistake?",
        a: "Repeated submissions of the same checkout are detected and return the original order reference rather than creating a duplicate order.",
      },
      {
        q: "Are the prices on the site final?",
        a: "Prices shown during this preview phase are sample data pending final retail pricing and may be updated. Wholesale rates are quoted separately through the bulk enquiry form and are never the retail prices shown in the shop.",
      },
    ],
  },
  {
    group: "Shipping & delivery",
    items: [
      {
        q: "Where do you deliver?",
        a: "We deliver to serviceable PIN codes across India. Enter your PIN code at checkout to confirm serviceability and the applicable shipping charge for your location.",
      },
      {
        q: "How long does delivery take?",
        a: "Typical delivery takes 3–7 working days depending on your PIN code, after dispatch. You will see an estimate for your PIN code at checkout.",
      },
      {
        q: "Is there free shipping?",
        a: "Orders above the free-shipping threshold shown at checkout ship at no extra cost. Below that, a flat shipping charge based on your PIN code applies. See the Shipping Policy for details.",
      },
    ],
  },
  {
    group: "Returns & cancellations",
    items: [
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled before dispatch by contacting us with your order reference. See the Cancellation & Returns policy for the full process.",
      },
      {
        q: "What if my pack arrives damaged?",
        a: "Report damaged or incorrect deliveries within the window stated in our Cancellation & Returns policy, with your order reference and photos, and we will arrange a replacement or refund.",
      },
    ],
  },
  {
    group: "Bulk & wholesale",
    items: [
      {
        q: "How do I get a wholesale quotation?",
        a: "Submit the bulk enquiry form with your grades, quantity, packaging preference, and delivery location. You receive an enquiry reference immediately, and our team responds with a written quotation.",
      },
      {
        q: "Do bulk orders use the website checkout?",
        a: "No. Retail checkout and bulk enquiries are completely separate. Wholesale pricing, GST, freight, and payment terms are confirmed only in the written quotation.",
      },
      {
        q: "Can you handle private-label packaging?",
        a: "Packaging options including bulk bags, retail-ready pouches, and private-label packs can be discussed in your enquiry. Feasibility and minimum quantities are confirmed in the quotation.",
      },
    ],
  },
];

export default async function FAQsPage() {
  const { business } = await getSettings();
  const wa = business.whatsapp.replace(/\D/g, "");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">FAQs</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-serif text-[34px] text-forest-900 sm:text-[44px]">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-600">
            Straight answers about our makhana, ordering, delivery, and bulk supply. Can&apos;t find
            what you need? Contact us directly.
          </p>
        </div>
      </div>

      <div className="section-shell max-w-3xl py-12 sm:py-16">
        <div className="space-y-12">
          {FAQ_GROUPS.map((g) => (
            <section key={g.group} aria-labelledby={`faq-${g.group.replace(/\W+/g, "-")}`}>
              <h2
                id={`faq-${g.group.replace(/\W+/g, "-")}`}
                className="text-eyebrow mb-4"
              >
                {g.group}
              </h2>
              <div className="divide-y divide-beige-200 border-y border-beige-200">
                {g.items.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="cursor-pointer list-none text-[15.5px] font-medium text-forest-900">
                      <span className="mr-2.5 inline-block text-gold-600 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                      {f.q}
                    </summary>
                    <p className="mt-3 pl-7 text-[14px] leading-relaxed text-ink-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 border border-beige-200 bg-white p-6 text-center sm:p-8">
          <h2 className="font-serif text-[22px] text-forest-900">Still have a question?</h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink-600">
            Call {business.phone}, email {business.email}, or message us on WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">Contact Us</Link>
            {wa && (
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
