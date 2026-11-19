import Link from "next/link";
import type { HeroSettings } from "@/lib/site";
import { ArrowRight, ShoppingBag, Globe, Building2, Award } from "lucide-react";

export function HomeHero({ hero }: { hero?: HeroSettings }) {
  const headline =
    hero?.headline || "Rooted in Mithila. Bringing Authentic Makhana to the World.";
  const subheadline =
    hero?.subheadline ||
    "From the makhana heartland of Bihar to modern markets, AVRELLE AGRO is committed to celebrating Mithila Makhana's heritage through sourcing, grading, processing, and premium product offerings.";

  return (
    <section className="relative overflow-hidden bg-forest-900 botanical-grid text-ivory-100">
      {/* fine decorative frame */}
      <div className="pointer-events-none absolute inset-4 border border-gold-500/20 sm:inset-6" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-6 border border-gold-500/10 sm:inset-8" aria-hidden="true" />

      <div className="section-shell relative grid items-center gap-y-8 gap-x-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-y-10 lg:py-24">
        {/* 1. Headline & Intro */}
        <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1">
          {/* GI Recognition Highlight */}
          <Link
            href="/mithila-makhana-gi-recognition"
            className="group inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold-300 transition-all hover:bg-gold-500/20 hover:border-gold-400"
          >
            <Award className="h-3.5 w-3.5 text-gold-400 shrink-0" aria-hidden="true" />
            <span className="truncate">Officially Recognized Authorized User of Mithila Makhana – GI-696</span>
            <ArrowRight className="h-3 w-3 text-gold-400 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <span className="ornament-line mt-3.5 block lg:mx-0" aria-hidden="true" />
          <h1 className="mt-4 font-serif text-[34px] leading-[1.14] text-ivory-50 sm:text-[48px] lg:text-[56px] font-bold">
            Rooted in Mithila.<br />
            <em className="not-italic text-gold-400">Bringing Authentic Makhana to the World.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-ivory-100/90 font-light lg:mx-0">
            {subheadline}
          </p>
        </div>

        {/* 2. Hero Banner Card */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none lg:col-start-2 lg:row-start-1 lg:row-span-3">
          <div className="absolute inset-0 rounded-3xl bg-gold-500/15 blur-3xl" aria-hidden="true" />
          
          <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-gradient-to-b from-forest-950/95 to-forest-900/95 p-3 shadow-2xl backdrop-blur-sm sm:p-4">
            {/* Top banner tag */}
            <div className="mb-2.5 flex items-center justify-between gap-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Agro-Processing &amp; Exports
              </span>
              <span className="text-[10px] tracking-widest text-gold-300 font-mono">AU/48155/GI/696/76</span>
            </div>

            {/* Banner Image */}
            <div className="group relative overflow-hidden rounded-xl border border-gold-500/25 bg-forest-950">
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
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-gold-500/15 pt-2.5 text-center">
              <div className="rounded bg-forest-900/80 px-1 py-1.5 border border-gold-500/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 sm:text-[11px]">1. Origin</p>
                <p className="text-[10px] leading-tight text-ivory-100/80 mt-0.5">Mithila Wetlands</p>
              </div>
              <div className="rounded bg-forest-900/80 px-1 py-1.5 border border-gold-500/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 sm:text-[11px]">2. Grading</p>
                <p className="text-[10px] leading-tight text-ivory-100/80 mt-0.5">3 to 6+ Suta Sortex</p>
              </div>
              <div className="rounded bg-forest-900/80 px-1 py-1.5 border border-gold-500/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 sm:text-[11px]">3. Supply</p>
                <p className="text-[10px] leading-tight text-ivory-100/80 mt-0.5">Retail, Bulk &amp; Export</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Call to Action Buttons: Discover Our Heritage, Explore Our Products, Bulk Supply Enquiries */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start lg:col-start-1 lg:row-start-2">
          <Link
            href="/mithila-makhana-gi-recognition"
            className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2 text-[13px]"
          >
            <Award className="h-4 w-4" /> Discover Our Heritage
          </Link>
          <Link
            href="/shop"
            className="btn-outline-gold w-full sm:w-auto !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5 flex items-center justify-center gap-2 text-[13px]"
          >
            <ShoppingBag className="h-4 w-4" /> Explore Our Products
          </Link>
          <Link
            href="/bulk-supply"
            className="btn-outline-gold w-full sm:w-auto !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5 flex items-center justify-center gap-2 text-[13px]"
          >
            <Building2 className="h-4 w-4" /> Bulk Supply Enquiries
          </Link>
        </div>

        {/* 4. Trust Stats */}
        <dl className="grid max-w-lg mx-auto grid-cols-3 gap-4 border-t border-ivory-100/15 pt-6 text-center lg:mx-0 lg:text-left lg:col-start-1 lg:row-start-3">
          {[
            { dt: "GI Status", dd: "GI-696 Authorized User" },
            { dt: "Sourcing Terroir", dd: "Purnia, Bihar" },
            { dt: "Supply Reach", dd: "Domestic & Global" },
          ].map((i) => (
            <div key={i.dt}>
              <dt className="text-[10.5px] font-semibold uppercase tracking-luxe text-gold-400">{i.dt}</dt>
              <dd className="mt-1 font-serif text-[13.5px] sm:text-[15px] text-ivory-100">{i.dd}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
