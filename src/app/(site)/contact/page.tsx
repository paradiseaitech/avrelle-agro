import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact AVRELLE AGRO PVT LTD in Purnea, Bihar for makhana orders, grade guidance, and wholesale enquiries. Phone, email, and WhatsApp.",
};

export default async function ContactPage() {
  const { business } = await getSettings();
  const wa = business.whatsapp.replace(/\D/g, "");
  const waPrefill = encodeURIComponent("Hello AVRELLE AGRO, I have a question about your makhana.");

  return (
    <>
      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">Contact</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-serif text-[34px] text-forest-900 sm:text-[44px]">Get in Touch</h1>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-600">
            Questions about grades, pack sizes, orders, or wholesale supply? Reach us through any
            channel below — we respond to enquiries during business hours.
          </p>
        </div>
      </div>

      <div className="section-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact details */}
        <div className="space-y-6">
          <div className="border border-beige-200 bg-white p-6 sm:p-7">
            <h2 className="font-serif text-[21px] text-forest-900">Contact details</h2>
            <ul className="mt-5 space-y-5 text-[14.5px]">
              <li className="flex gap-4">
                <span className="mt-0.5 shrink-0 text-gold-600" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[11.5px] font-semibold uppercase tracking-wider text-ink-500">Phone</span>
                  <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="text-forest-800 hover:text-gold-700">
                    {business.phone}
                  </a>
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 shrink-0 text-gold-600" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 6h16v12H4z" strokeLinejoin="round" />
                    <path d="m4 7 8 6 8-6" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[11.5px] font-semibold uppercase tracking-wider text-ink-500">Email</span>
                  <a href={`mailto:${business.email}`} className="break-all text-forest-800 hover:text-gold-700">
                    {business.email}
                  </a>
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 shrink-0 text-gold-600" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[11.5px] font-semibold uppercase tracking-wider text-ink-500">Location</span>
                  <span className="text-ink-800">{business.addressLine}, {business.state}, India</span>
                </span>
              </li>
            </ul>

            {wa && (
              <a
                href={`https://wa.me/${wa}?text=${waPrefill}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold mt-6 w-full"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>

          <div className="border border-beige-200 bg-ivory-100 p-6 sm:p-7">
            <h2 className="font-serif text-[19px] text-forest-900">Bulk &amp; wholesale buyers</h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-600">
              For quotations, please use the dedicated bulk enquiry form so we capture your grades,
              quantities, and packaging requirements in one place.
            </p>
            <Link href="/bulk-orders" className="btn-outline btn-sm mt-4">
              Go to Bulk Enquiry
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="border border-beige-200 bg-white p-6 sm:p-8">
          <h2 className="font-serif text-[21px] text-forest-900">Send us a message</h2>
          <p className="mt-2 mb-6 text-[13.5px] text-ink-600">
            Fields marked * are required.
          </p>
          <ContactForm whatsapp={business.whatsapp} />
        </div>
      </div>
    </>
  );
}
