import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AVRELLE AGRO PVT LTD collects, uses, stores, and protects personal information from website visitors, customers, and business enquiries.",
};

const SECTIONS: Array<{ id: string; h: string; body: React.ReactNode }> = [
  {
    id: "collect",
    h: "Information we collect",
    body: (
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-ink-700">
        <li>· <strong>Retail orders:</strong> name, mobile number, email address (optional), delivery address including PIN code, and delivery instructions.</li>
        <li>· <strong>Bulk enquiries:</strong> business name, contact person, mobile number, email address, buyer type, grade and quantity requirements, packaging preference, and delivery location.</li>
        <li>· <strong>Contact messages:</strong> name, phone, email, subject, and message content.</li>
        <li>· <strong>Order references:</strong> the reference numbers issued to you for orders and enquiries.</li>
        <li>· <strong>Technical data:</strong> standard server logs such as IP address, browser type, and pages requested, used for security and abuse prevention.</li>
      </ul>
    ),
  },
  {
    id: "use",
    h: "How we use it",
    body: (
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-ink-700">
        <li>· To process, fulfil, and deliver your orders, including Cash on Delivery coordination.</li>
        <li>· To respond to your enquiries, quotations, and support requests.</li>
        <li>· To verify order status lookups and protect against unauthorised access.</li>
        <li>· To improve our catalogue, service quality, and website reliability.</li>
        <li>· To meet legal obligations and maintain business records.</li>
      </ul>
    ),
  },
  {
    id: "share",
    h: "What we do not do",
    body: (
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-ink-700">
        <li>· We do not sell, rent, or trade your personal information to third parties.</li>
        <li>· We do not collect card or online payment credentials — Cash on Delivery is the only payment method on this site.</li>
        <li>· We do not use your data for unrelated marketing without your consent.</li>
      </ul>
    ),
  },
  {
    id: "share-with",
    h: "Who we share it with",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        To deliver your order we share only the necessary details (name, address, phone, parcel
        information) with the courier partner handling your shipment. Where we use technology
        providers to host this website or database, data is processed on their secured
        infrastructure under their own safeguards. We may also disclose information if required by
        law.
      </p>
    ),
  },
  {
    id: "retain",
    h: "Retention & security",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        Order and enquiry records are retained for as long as needed for business, accounting, and
        legal purposes. Access to administrative systems is protected by authenticated logins, and
        data is transmitted over encrypted connections. While no system can be guaranteed
        completely secure, we take reasonable technical and organisational measures to protect your
        information.
      </p>
    ),
  },
  {
    id: "rights",
    h: "Your choices and rights",
    body: (
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-ink-700">
        <li>· You may provide only the minimum information needed to complete an order or enquiry.</li>
        <li>· You may ask us what personal data we hold about you and request correction of inaccurate details.</li>
        <li>· You may ask us to delete personal data we no longer need to retain, subject to legal record-keeping requirements.</li>
        <li>· You can clear the shopping cart stored in your browser at any time.</li>
      </ul>
    ),
  },
  {
    id: "cookies",
    h: "Cookies & local storage",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        This website stores your shopping cart in your browser&apos;s local storage so it persists
        between visits. No advertising or cross-site tracking cookies are used. Administrative
        sessions use secure, HTTP-only cookies that expire automatically.
      </p>
    ),
  },
  {
    id: "children",
    h: "Children",
    body: (
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
        This website is intended for use by adults. We do not knowingly collect personal information
        from children.
      </p>
    ),
  },
];

export default async function PrivacyPage() {
  const { business } = await getSettings();

  return (
    <>
      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">Privacy Policy</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-serif text-[34px] text-forest-900 sm:text-[42px]">Privacy Policy</h1>
          <p className="mt-3 text-[13px] text-ink-500">
            Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="section-shell max-w-3xl py-12 sm:py-16">
        <p className="text-[15px] leading-relaxed text-ink-700">
          This policy explains how {business.displayName} (&quot;we&quot;, &quot;us&quot;) handles
          personal information when you browse this website, place a retail order, submit a bulk
          enquiry, or contact us. By using the site you acknowledge the practices described here.
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

        <section className="mt-10 border border-beige-200 bg-ivory-100 p-6" aria-labelledby="privacy-contact">
          <h2 id="privacy-contact" className="font-serif text-[20px] text-forest-900">
            Contact us about privacy
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-700">
            For questions, access requests, or corrections regarding your personal data, contact us
            at <a href={`mailto:${business.email}`} className="text-forest-800 underline decoration-gold-500 underline-offset-4">{business.email}</a>{" "}
            or call <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="text-forest-800 underline decoration-gold-500 underline-offset-4">{business.phone}</a>.
          </p>
        </section>

        <p className="mt-8 text-[13px] leading-relaxed text-ink-500">
          We may update this policy from time to time. Material changes will be reflected by updating
          the date above. Continued use of the website after changes means you accept the revised
          policy.
        </p>
      </div>
    </>
  );
}
