import Link from "next/link";
import type { BusinessSettings } from "@/lib/site";

export function ContactStrip({ business }: { business: BusinessSettings }) {
  const wa = business.whatsapp.replace(/\D/g, "");
  return (
    <section aria-labelledby="contact-strip-heading" className="bg-ivory-100">
      <div className="section-shell py-14 sm:py-16">
        <div className="flex flex-col items-center justify-between gap-8 border border-beige-200 bg-white px-6 py-10 text-center sm:px-10 lg:flex-row lg:text-left">
          <div>
            <h2 id="contact-strip-heading" className="font-serif text-[26px] text-forest-900 sm:text-[30px]">
              Questions about grades or bulk supply?
            </h2>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-600">
              Call {business.phone}, write to {business.email}, or message us on WhatsApp. We are
              happy to help with grade selection, pack sizes, and quotations.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
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
    </section>
  );
}
