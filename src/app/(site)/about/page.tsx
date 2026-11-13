import type { Metadata } from "next";
import Link from "next/link";
import { getSettings, listPublishedGrades } from "@/lib/db-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AVRELLE AGRO PVT LTD is a makhana (fox nuts) business based in Purnea, Bihar, serving retail customers and business buyers with clearly graded products.",
};

const PRINCIPLES = [
  {
    title: "Quality. Consistency. Trust.",
    body: "Our tagline is our operating standard — consistent grade specifications, honest product listings, and dependable communication on every order.",
  },
  {
    title: "Clear grade specifications",
    body: "Every product page states the suta grade, indicative size range, pack size, and current availability, so buyers know exactly what they are ordering.",
  },
  {
    title: "Two clear pathways",
    body: "Retail customers shop with transparent pricing and Cash on Delivery. Business buyers use the bulk enquiry route with quotations issued separately.",
  },
  {
    title: "Straightforward communication",
    body: "Phone, email, and WhatsApp reach the same team. Order references and enquiry references keep every conversation traceable.",
  },
];

export default async function AboutPage() {
  const [settings, grades] = await Promise.all([getSettings(), listPublishedGrades()]);
  const { business, homeContent } = settings;

  return (
    <>
      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">About Us</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-serif text-[34px] text-forest-900 sm:text-[44px]">About AVRELLE AGRO</h1>
          <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-ink-600">
            {business.displayName} is a makhana (fox nuts) business based in {business.city},{" "}
            {business.state} — one of India&apos;s established makhana regions.
          </p>
        </div>
      </div>

      <section aria-labelledby="story-heading" className="bg-ivory-50">
        <div className="section-shell grid gap-10 py-14 sm:py-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-eyebrow">Our Story</p>
            <h2 id="story-heading" className="mt-3 font-serif text-[28px] text-forest-900 sm:text-[34px]">
              {homeContent.storyHeading}
            </h2>
            <span className="ornament-line mt-5 block" aria-hidden="true" />
            <p className="mt-6 text-[15px] leading-relaxed text-ink-700">{homeContent.storyBody}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
              Our catalogue covers the standard suta grades — from compact 3 Suta for everyday
              cooking to premium 6+ Suta for gifting and premium retail — with Thurr(i) available on
              enquiry for processing uses.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/brand/hero-makhana.svg"
              alt="Bowl of premium graded phool makhana"
              loading="lazy"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="border-y border-beige-200 bg-beige-100/60">
        <div className="section-shell py-14 sm:py-16">
          <h2 id="principles-heading" className="text-center font-serif text-[28px] text-forest-900 sm:text-[34px]">
            What We Stand For
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border border-beige-200 bg-white p-6 sm:p-7">
                <h3 className="font-serif text-[18px] text-forest-900">{p.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="origin-heading" className="bg-ivory-50">
        <div className="section-shell grid gap-10 py-14 sm:py-16 lg:grid-cols-2">
          <div>
            <p className="text-eyebrow">Origin</p>
            <h2 id="origin-heading" className="mt-3 font-serif text-[26px] text-forest-900 sm:text-[30px]">
              Rooted in Purnea, Bihar
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
              Makhana — also known as fox nuts or lotus seeds — is a traditional crop of Bihar, and
              Purnea is one of the regions closely associated with its trade. Being based here puts
              us close to the supply source, which helps us maintain consistent specifications and
              respond quickly to buyer requirements.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
              We keep our claims grounded: grades are described with reference size ranges,
              availability reflects live stock, and quotations state exactly what will be supplied.
            </p>
          </div>
          <div>
            <p className="text-eyebrow">Grades we handle</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {grades.map((g) => (
                <li key={g.id} className="border border-beige-200 bg-white p-4 text-center">
                  <p className="font-serif text-[16px] text-forest-900">{g.name}</p>
                  {g.sizeMinMm != null && g.sizeMaxMm != null && (
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-gold-700">
                      ~{g.sizeMinMm}–{g.sizeMaxMm} mm
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/grades" className="btn-outline btn-sm mt-5">
              Understand Grades
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-forest-900 botanical-grid" aria-labelledby="cTA-heading">
        <div className="section-shell flex flex-col items-center gap-6 py-14 text-center sm:py-16">
          <h2 id="cTA-heading" className="max-w-2xl font-serif text-[28px] text-ivory-50 sm:text-[34px]">
            Looking for makhana for your home, store, or business?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn-gold">Shop Makhana</Link>
            <Link href="/bulk-orders" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5">
              Bulk Enquiry
            </Link>
            <Link href="/contact" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
