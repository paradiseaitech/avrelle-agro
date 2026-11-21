import Link from "next/link";
import type { BusinessSettings } from "@/lib/site";
import { MessageSquare, Mail } from "lucide-react";

export function ContactStrip({ business }: { business: BusinessSettings }) {
  const wa = business.whatsapp.replace(/\D/g, "");
  return (
    <section aria-labelledby="contact-strip-heading" className="bg-ivory-100/60 border-t border-beige-200">
      <div className="section-shell py-14 sm:py-18">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-beige-300 bg-white p-6 sm:p-10 text-center lg:flex-row lg:text-left shadow-xs">
          <div>
            <span className="text-eyebrow">Direct Assistance</span>
            <h2 id="contact-strip-heading" className="mt-1 font-serif text-[24px] sm:text-[30px] font-bold text-charcoal-900">
              Questions about grades or bulk orders?
            </h2>
            <p className="mt-2.5 max-w-2xl text-[14px] sm:text-[15px] leading-relaxed text-muted-grey">
              Reach our corporate desk in Purnea by phone, email, or WhatsApp. We provide prompt guidance on grading standards, sample packs, and customized commercial freight.
            </p>
          </div>

          <div className="flex shrink-0 flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/contact" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Contact Desk</span>
            </Link>
            {wa && (
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Desk</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
