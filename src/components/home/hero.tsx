import Link from "next/link";
import { ArrowRight, ShoppingBag, Compass } from "lucide-react";
import type { HeroSettings } from "@/lib/site";

export function HomeHero({ hero }: { hero?: HeroSettings }) {
  const headline = hero?.headline || "From Bihar's Wetlands to Your Table.";
  const subheadline =
    hero?.subheadline ||
    "Authentic Mithila Makhana, thoughtfully sourced and carefully crafted.";

  return (
    <section className="relative overflow-hidden bg-ivory-50 border-b border-beige-200 py-12 sm:py-18 lg:py-24">
      {/* Subtle ambient glow in champagne and sage tones */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-gradient-to-b from-gold-100/50 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          
          {/* Left Column: Text & Primary CTAs */}
          <div className="text-center lg:text-left">
            
            {/* GI Recognition Pill */}
            <Link
              href="/mithila-makhana-gi-recognition"
              className="group inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal-900 shadow-xs transition-all hover:border-gold-500 hover:shadow-sm"
            >
              <img
                src="/gitag.jpeg"
                alt="Official Mithila Makhana GI Logo"
                width={18}
                height={20}
                className="h-4 w-auto object-contain shrink-0"
              />
              <span className="font-bold text-charcoal-900">Authorized User · Mithila Makhana (GI-696)</span>
              <ArrowRight className="h-3 w-3 text-gold-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Main Headline */}
            <h1 className="mt-5 font-serif text-[34px] xs:text-[40px] sm:text-[50px] lg:text-[58px] leading-[1.12] text-charcoal-900 font-bold tracking-tight">
              From Bihar&apos;s Wetlands <br />
              <span className="text-gold-600 font-serif italic">to Your Table.</span>
            </h1>

            {/* Short Supporting Line */}
            <p className="mx-auto mt-4 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-muted-grey lg:mx-0">
              {subheadline}
            </p>

            {/* Two Primary CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="/shop"
                className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2 !py-3.5 !px-7 !text-[13px] shadow-sm hover:shadow"
              >
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span>Explore Products</span>
              </Link>
              <a
                href="#farm-to-market"
                className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 !py-3.5 !px-7 !text-[13px]"
              >
                <Compass className="h-4 w-4 shrink-0 text-gold-600" />
                <span>Our Journey</span>
              </a>
            </div>

            {/* Short Trust Notes */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-beige-200 pt-6 text-center lg:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">Terroir</span>
                <p className="mt-0.5 font-serif text-[13.5px] sm:text-[14.5px] font-semibold text-charcoal-900">Mithila Wetlands</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">Grading</span>
                <p className="mt-0.5 font-serif text-[13.5px] sm:text-[14.5px] font-semibold text-charcoal-900">3 to 6+ Suta</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">Supply</span>
                <p className="mt-0.5 font-serif text-[13.5px] sm:text-[14.5px] font-semibold text-charcoal-900">Retail &amp; Export</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
            <div className="relative rounded-2xl border border-beige-300 bg-white p-3 sm:p-4 shadow-md transition-all hover:shadow-lg">
              
              {/* Image Frame */}
              <div className="group relative overflow-hidden rounded-xl bg-ivory-100 aspect-[16/10]">
                <img
                  src="/brand/makhana_hero.jpeg"
                  alt="Harvesting, roasting, and sorting authentic Mithila makhana"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  fetchPriority="high"
                />
                
                {/* Subtle Image Tag */}
                <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-charcoal-900 shadow-xs border border-beige-200">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-500 mr-1.5" />
                  Mithila Harvest · Purnea Hub
                </div>

                <div className="absolute bottom-3 right-3 rounded-md bg-charcoal-900/85 backdrop-blur-md px-2.5 py-1 text-[10.5px] font-mono text-ivory-50">
                  AU/48155/GI/696/76
                </div>
              </div>

              {/* 3 Visual Milestones below image */}
              <div className="mt-3.5 grid grid-cols-3 gap-2 text-center text-[12px]">
                <div className="rounded-lg bg-ivory-50 py-2 px-1 border border-beige-200">
                  <p className="text-[10px] uppercase font-bold text-gold-700">01. Origin</p>
                  <p className="mt-0.5 font-medium text-charcoal-900 truncate">Wetland Ponds</p>
                </div>
                <div className="rounded-lg bg-ivory-50 py-2 px-1 border border-beige-200">
                  <p className="text-[10px] uppercase font-bold text-gold-700">02. Sorting</p>
                  <p className="mt-0.5 font-medium text-charcoal-900 truncate">Sortex Precision</p>
                </div>
                <div className="rounded-lg bg-ivory-50 py-2 px-1 border border-beige-200">
                  <p className="text-[10px] uppercase font-bold text-gold-700">03. Packaging</p>
                  <p className="mt-0.5 font-medium text-charcoal-900 truncate">Airtight Crisp</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
