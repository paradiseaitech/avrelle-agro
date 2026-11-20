import Link from "next/link";
import type { HeroSettings } from "@/lib/site";
import { ArrowRight, ShoppingBag, Building2, Award } from "lucide-react";

export function HomeHero({ hero }: { hero?: HeroSettings }) {
  const headline =
    hero?.headline || "Rooted in Mithila. Bringing Authentic Makhana to the World.";
  const subheadline =
    hero?.subheadline ||
    "From the makhana heartland of Bihar to modern markets, AVRELLE AGRO is committed to celebrating Mithila Makhana's heritage through sourcing, grading, processing, and premium product offerings.";

  return (
    <section className="relative overflow-hidden bg-forest-900 botanical-grid text-ivory-100">
      {/* Fine decorative frame - subtle on mobile, full on desktop */}
      <div className="pointer-events-none absolute inset-2 sm:inset-6 border border-gold-500/20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-3 sm:inset-8 border border-gold-500/10 hidden sm:block" aria-hidden="true" />

      <div className="section-shell relative grid items-center gap-y-7 sm:gap-y-8 gap-x-12 py-10 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-y-10 lg:py-24">
        {/* 1. Headline & Intro */}
        <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1">
          {/* GI Recognition Highlight */}
          <Link
            href="/mithila-makhana-gi-recognition"
            className="group inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gold-300 transition-all hover:bg-gold-500/20 hover:border-gold-400"
          >
            <Award className="h-3.5 w-3.5 text-gold-400 shrink-0" aria-hidden="true" />
            <span className="truncate">Officially Recognized Authorized User · GI-696</span>
            <ArrowRight className="h-3 w-3 text-gold-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <span className="ornament-line mt-3 sm:mt-3.5 block mx-auto lg:mx-0" aria-hidden="true" />
          <h1 className="mt-3.5 sm:mt-4 font-serif text-[28px] xs:text-[34px] sm:text-[46px] lg:text-[54px] leading-[1.15] text-ivory-50 font-bold break-words">
            Rooted in Mithila.<br />
            <em className="not-italic text-gold-400">Bringing Authentic Makhana to the World.</em>
          </h1>
          <p className="mx-auto mt-4 sm:mt-5 max-w-xl text-[14px] sm:text-[16px] leading-relaxed text-ivory-100/90 font-light lg:mx-0">
            {subheadline}
          </p>
        </div>

        {/* 2. Hero Banner Card */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none lg:col-start-2 lg:row-start-1 lg:row-span-3">
          <div className="absolute inset-0 rounded-3xl bg-gold-500/15 blur-3xl pointer-events-none" aria-hidden="true" />
          
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-gold-500/30 bg-gradient-to-b from-forest-950/95 to-forest-900/95 p-2.5 sm:p-4 shadow-2xl backdrop-blur-sm">
            {/* Top banner tag */}
            <div className="mb-2 sm:mb-2.5 flex items-center justify-between gap-2 px-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gold-300">
              <span className="inline-flex items-center gap-1.5 truncate">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                Agro-Processing &amp; Exports
              </span>
              <span className="text-[9.5px] sm:text-[10px] tracking-widest text-gold-300 font-mono shrink-0">AU/48155/GI/696/76</span>
            </div>

            {/* Banner Image */}
            <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-gold-500/25 bg-forest-950">
              <img
                src="/brand/makhana_hero.jpeg"
                alt="From wetland harvest to clay-oven roasting and modern packaging: The journey of authentic Bihar makhana"
                width={1280}
                height={543}
                className="relative w-full aspect-[1280/543] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                fetchPriority="high"
              />
            </div>

            {/* 3 Story Milestones */}
            <div className="mt-2.5 sm:mt-3 grid grid-cols-3 gap-1.5 sm:gap-2 border-t border-gold-500/15 pt-2 sm:pt-2.5 text-center">
              <div className="rounded bg-forest-900/80 px-1 py-1 sm:py-1.5 border border-gold-500/10">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gold-400">1. Origin</p>
                <p className="text-[9.5px] sm:text-[10px] leading-tight text-ivory-100/80 mt-0.5 truncate">Mithila Wetlands</p>
              </div>
              <div className="rounded bg-forest-900/80 px-1 py-1 sm:py-1.5 border border-gold-500/10">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gold-400">2. Grading</p>
                <p className="text-[9.5px] sm:text-[10px] leading-tight text-ivory-100/80 mt-0.5 truncate">3 to 6+ Suta</p>
              </div>
              <div className="rounded bg-forest-900/80 px-1 py-1.5 border border-gold-500/10">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gold-400">3. Supply</p>
                <p className="text-[9.5px] sm:text-[10px] leading-tight text-ivory-100/80 mt-0.5 truncate">Retail &amp; Export</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Call to Action Buttons */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start lg:col-start-1 lg:row-start-2 w-full">
          <Link
            href="/mithila-makhana-gi-recognition"
            className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2 !py-3 !text-[12px] sm:!text-[13px]"
          >
            <Award className="h-4 w-4 shrink-0" /> <span>Discover Our Heritage</span>
          </Link>
          <Link
            href="/shop"
            className="btn-outline-gold w-full sm:w-auto !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5 flex items-center justify-center gap-2 !py-3 !text-[12px] sm:!text-[13px]"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" /> <span>Explore Our Products</span>
          </Link>
          <Link
            href="/bulk-supply"
            className="btn-outline-gold w-full sm:w-auto !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5 flex items-center justify-center gap-2 !py-3 !text-[12px] sm:!text-[13px]"
          >
            <Building2 className="h-4 w-4 shrink-0" /> <span>Bulk Supply Enquiries</span>
          </Link>
        </div>

        {/* 4. Trust Stats */}
        <dl className="grid max-w-lg mx-auto grid-cols-3 gap-2 sm:gap-4 border-t border-ivory-100/15 pt-5 sm:pt-6 text-center lg:mx-0 lg:text-left lg:col-start-1 lg:row-start-3 w-full">
          {[
            { dt: "GI Status", dd: "GI-696 User" },
            { dt: "Sourcing Terroir", dd: "Purnia, Bihar" },
            { dt: "Supply Reach", dd: "Global Export" },
          ].map((i) => (
            <div key={i.dt} className="px-1">
              <dt className="text-[9px] sm:text-[10.5px] font-semibold uppercase tracking-wider text-gold-400 truncate">{i.dt}</dt>
              <dd className="mt-0.5 sm:mt-1 font-serif text-[12px] xs:text-[13px] sm:text-[15px] text-ivory-100 font-medium break-words">{i.dd}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
