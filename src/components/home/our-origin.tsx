import Link from "next/link";
import { MapPin, ArrowRight, Compass, ShieldCheck } from "lucide-react";

export function OurOriginSection() {
  return (
    <section className="bg-ivory-50 py-16 sm:py-20 lg:py-24 border-b border-beige-200">
      <div className="section-shell">
        <div className="rounded-3xl border border-beige-300 bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            
            {/* Left Column: Short Story & Terroir Highlights */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-800">
                <MapPin className="h-3.5 w-3.5 text-gold-600" />
                <span>Geographical Heart · North Bihar Terroir</span>
              </div>

              <h2 className="mt-4 font-serif text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-charcoal-900 leading-tight">
                Rooted in Mithila
              </h2>
              <span className="ornament-line mt-3 block" aria-hidden="true" />

              <p className="mt-4 text-[16px] sm:text-[17.5px] leading-relaxed text-charcoal-800 font-normal">
                Born in Purnea, Bihar, Avrelle connects the rich makhana heritage of the Kosi region with modern processing and quality standards.
              </p>

              {/* 3 Core Geographical Highlights */}
              <div className="mt-6 space-y-3 text-[13.5px] sm:text-[14px]">
                <div className="flex items-start gap-3 rounded-xl bg-ivory-50 p-3.5 border border-beige-200">
                  <div className="rounded-md bg-white p-1.5 shadow-xs border border-beige-200 text-gold-700 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-serif text-[15px]">Purnea, Bihar</strong>
                    <span className="text-muted-grey text-[13px]">
                      Operational headquarters and modern sortex grading facility connecting rural harvest to global trade.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-ivory-50 p-3.5 border border-beige-200">
                  <div className="rounded-md bg-white p-1.5 shadow-xs border border-beige-200 text-gold-700 shrink-0">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-serif text-[15px]">Mithila &amp; Kosi Region</strong>
                    <span className="text-muted-grey text-[13px]">
                      The fertile alluvial wetlands and oxbow lakes renowned for nurturing India&apos;s authentic GI-recognized fox nuts.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-ivory-50 p-3.5 border border-beige-200">
                  <div className="rounded-md bg-white p-1.5 shadow-xs border border-beige-200 text-gold-700 shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-serif text-[15px]">Kishanganj, Purnea &amp; Saharsa</strong>
                    <span className="text-muted-grey text-[13px]">
                      Direct procurement belts partner with local Farmer Producer Companies to ensure fair pricing and 100% origin traceability.
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/origin"
                  className="btn-gold inline-flex items-center gap-2 !py-3.5 !px-7 !text-[13px] shadow-sm hover:shadow"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual of Wetland Harvest & Mithila Heritage */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-beige-300 bg-ivory-100 p-2 sm:p-3 shadow-md">
                <img
                  src="/brand/makhana_hero.jpeg"
                  alt="Traditional makhana harvesting in Bihar wetlands and clay-oven roasting"
                  width={800}
                  height={500}
                  className="w-full rounded-xl object-cover aspect-[4/3]"
                />
                <div className="mt-3 flex items-center justify-between px-2 text-[12px] text-muted-grey">
                  <span>Mithila Basin · Wetland Ponds</span>
                  <span className="font-semibold text-gold-700">100% Traceable Harvest</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

