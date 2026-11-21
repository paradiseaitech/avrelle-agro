import Link from "next/link";
import { Award, ShieldCheck, ArrowRight } from "lucide-react";
import type { GIRecognitionSettings } from "@/lib/site";

export function GIRecognitionSection({ gi }: { gi?: GIRecognitionSettings }) {
  const certNumber = gi?.certNumber || "AU/48155/GI/696/76";
  const giNumber = gi?.giNumber || "GI-696";

  return (
    <section className="bg-ivory-50 py-16 sm:py-20 lg:py-24 border-b border-beige-200">
      <div className="section-shell">
        <div className="rounded-3xl border border-gold-500/30 bg-gradient-to-br from-white via-ivory-50 to-white p-6 sm:p-10 lg:p-12 shadow-sm">
          
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            
            {/* Left Column: Official GI Logo Display */}
            <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-gold-500/30 bg-white p-8 shadow-xs">
              <div className="relative p-2">
                <img
                  src="/gitag.jpeg"
                  alt="Official Mithila Makhana GI Logo (GI-696)"
                  width={240}
                  height={260}
                  className="mx-auto h-40 sm:h-48 w-auto object-contain transition-transform hover:scale-103 duration-300"
                />
              </div>

              <div className="mt-5 border-t border-beige-200 pt-4 w-full">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-700 block">
                  Geographical Indication
                </span>
                <p className="mt-1 font-serif text-[18px] font-bold text-charcoal-900">
                  Mithila Makhana ({giNumber})
                </p>
                <p className="mt-0.5 font-mono text-[12px] font-semibold text-charcoal-700">
                  Certificate: {certNumber}
                </p>
              </div>
            </div>

            {/* Right Column: Statement & Authentic Provenance */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-800">
                <Award className="h-3.5 w-3.5 text-gold-600" />
                <span>Geographical Indication Protection</span>
              </div>

              <h2 className="mt-4 font-serif text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-charcoal-900 leading-tight">
                A Heritage Worth Celebrating
              </h2>
              <span className="ornament-line mt-3 block" aria-hidden="true" />

              {/* Exact statement requested by client */}
              <p className="mt-5 text-[17px] sm:text-[19px] font-serif italic text-charcoal-900 leading-relaxed">
                &ldquo;Proudly recognized as an Authorized User of Mithila Makhana (GI-696).&rdquo;
              </p>

              <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-muted-grey">
                This recognition affirms our adherence to the geographic authenticity, traditional harvesting methods, and natural pond cultivation practices unique to Bihar&apos;s wetland ecosystems.
              </p>

              {/* Transparency Notice regarding Authorized User standing */}
              <div className="mt-5 rounded-xl border border-beige-300 bg-white p-4 text-[12.5px] text-muted-grey leading-relaxed">
                <p>
                  <strong className="text-charcoal-900 font-semibold">Authorized User Standing:</strong> AVRELLE AGRO PRODUCTS PRIVATE LIMITED holds Authorized User recognition under Certificate Number <strong className="font-mono text-charcoal-900">{certNumber}</strong> under the Geographical Indications Registry of the Government of India.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/mithila-makhana-gi-recognition"
                  className="btn-gold flex items-center justify-center gap-2 !py-3.5 !px-7 !text-[13px] shadow-sm hover:shadow"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Explore GI Recognition Details</span>
                </Link>
                <Link
                  href="/origin"
                  className="btn-outline flex items-center justify-center gap-2 !py-3.5 !px-7 !text-[13px]"
                >
                  <span>Our Mithila Origin &rarr;</span>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
