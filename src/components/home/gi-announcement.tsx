import Link from "next/link";
import { Award, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import type { GIRecognitionSettings } from "@/lib/site";

export function GIAnnouncement({ gi }: { gi?: GIRecognitionSettings }) {
  if (gi && !gi.enabled && !gi.heroAnnouncementEnabled) return null;

  const headline = gi?.announcementHeadline || "An Officially Recognized Authorized User of Mithila Makhana";
  const supportingText =
    gi?.announcementText ||
    "AVRELLE AGRO PRODUCTS PRIVATE LIMITED is proud to be recognized as an Authorized User of Mithila Makhana (GI-696), celebrating the authentic heritage, geographical identity, and agricultural legacy of Bihar.";
  const certNumber = gi?.certNumber || "AU/48155/GI/696/76";
  const giNumber = gi?.giNumber || "GI-696";

  return (
    <section className="relative overflow-hidden border-b border-gold-500/30 bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 py-10 sm:py-16 text-ivory-100">
      {/* Decorative filigree accents */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-5xl rounded-xl sm:rounded-2xl border border-gold-500/40 bg-gradient-to-br from-forest-900/90 to-forest-950/95 p-4 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            
            {/* Left Column: Announcement Story */}
            <div>
              <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-gold-300">
                <Award className="h-3.5 w-3.5 text-gold-400 shrink-0" aria-hidden="true" />
                <span className="truncate">Geographical Indication Milestone</span>
              </div>

              <h2 className="mt-3.5 sm:mt-4 font-serif text-[22px] xs:text-[24px] sm:text-[32px] font-bold text-ivory-50 leading-tight break-words">
                {headline}
              </h2>

              <p className="mt-3 text-[13.5px] sm:text-[15.5px] leading-relaxed text-ivory-200/90 font-light">
                {supportingText}
              </p>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
                <Link
                  href="/mithila-makhana-gi-recognition"
                  className="btn-gold inline-flex items-center justify-center gap-2 !py-2.5 sm:!py-3 text-[12px] sm:text-[13px] font-semibold w-full sm:w-auto"
                >
                  <span>Explore Our GI Recognition</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
                <Link
                  href="/origin"
                  className="inline-flex items-center justify-center gap-1.5 text-[12.5px] sm:text-[13px] font-semibold text-gold-300 hover:text-gold-200 underline underline-offset-4 py-1"
                >
                  <span>Our Mithila Origin &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Certificate-Inspired Display Plaque */}
            <div className="relative">
              <div className="relative rounded-xl border border-gold-500/50 bg-gradient-to-b from-forest-950 to-forest-900/90 p-4 sm:p-6 text-ivory-100 shadow-xl">
                {/* Decorative border corners */}
                <div className="absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 border-gold-500/60" />
                <div className="absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 border-gold-500/60" />
                <div className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-gold-500/60" />
                <div className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-gold-500/60" />

                <div className="flex items-center justify-between border-b border-gold-500/25 pb-2.5 mb-3">
                  <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.16em] text-gold-400 truncate">
                    Official Recognition
                  </span>
                  <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0" />
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-ivory-400">
                      GI Designation
                    </span>
                    <p className="font-serif text-[17px] sm:text-[19px] font-bold text-ivory-50 leading-snug">
                      Mithila Makhana
                    </p>
                    <p className="font-mono text-[11.5px] sm:text-[12px] font-semibold text-gold-300">
                      Registration Ref: {giNumber}
                    </p>
                  </div>

                  <div className="rounded bg-forest-900/80 p-2.5 sm:p-3 border border-gold-500/20">
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-ivory-400">
                      Authorized User Certificate No.
                    </span>
                    <p className="font-mono text-[12.5px] sm:text-[13.5px] font-bold text-gold-200 mt-0.5 truncate">
                      {certNumber}
                    </p>
                    <span className="mt-0.5 block text-[10px] text-ivory-300/80 truncate">
                      AVRELLE AGRO PRODUCTS PRIVATE LIMITED
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-0.5 text-[10.5px] sm:text-[11px] text-ivory-300/80">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                      <span className="truncate">Traceable Bihar Wetland Harvesting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                      <span className="truncate">Hygienic Sortex Grading &amp; Moisture Control</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
