import Link from "next/link";
import type { HeroSettings } from "@/lib/site";

export function HomeHero({ hero }: { hero: HeroSettings }) {
  return (
    <section className="relative overflow-hidden bg-forest-900 botanical-grid text-ivory-100">
      {/* fine decorative frame */}
      <div className="pointer-events-none absolute inset-4 border border-gold-500/20 sm:inset-6" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-6 border border-gold-500/10 sm:inset-8" aria-hidden="true" />

      <div className="section-shell relative grid items-center gap-y-7 gap-x-12 py-10 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-y-8 lg:py-24">
        {/* 1. Headline & Intro */}
        <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1">
          <p className="text-eyebrow !text-gold-400">Purnea · Bihar · India</p>
          <span className="ornament-line mt-3.5 block lg:mx-0" aria-hidden="true" />
          <h1 className="mt-5 font-serif text-[34px] leading-[1.1] text-ivory-50 sm:text-[48px] lg:text-[56px]">
            {hero.headline.split(",")[0]}
            {hero.headline.includes(",") && (
              <>
                ,<br />
                <em className="not-italic text-gold-400">{hero.headline.split(",").slice(1).join(",").trim()}</em>
              </>
            )}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ivory-100/85 sm:text-base lg:mx-0">
            {hero.subheadline}
          </p>
        </div>

        {/* 2. Hero Banner Card — Prominent visual on mobile right after intro, right column on desktop */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none lg:col-start-2 lg:row-start-1 lg:row-span-3">
          <div className="absolute inset-0 rounded-3xl bg-gold-500/15 blur-3xl" aria-hidden="true" />
          
          <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-gradient-to-b from-forest-950/90 to-forest-900/90 p-2.5 shadow-2xl backdrop-blur-sm sm:p-4">
            {/* Top banner tag */}
            <div className="mb-2 flex items-center justify-between gap-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                The Makhana Journey
              </span>
              <span className="text-[10px] tracking-widest text-ivory-100/60">Purnea, Bihar</span>
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
            <div className="mt-2.5 grid grid-cols-3 gap-1.5 sm:gap-2 border-t border-gold-500/15 pt-2 text-center">
              <div className="rounded bg-forest-900/70 px-1 py-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 sm:text-[11px]">1. Harvest</p>
                <p className="text-[9.5px] leading-tight text-ivory-100/75 sm:text-[10.5px]">Wetlands of Bihar</p>
              </div>
              <div className="rounded bg-forest-900/70 px-1 py-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 sm:text-[11px]">2. Roasting</p>
                <p className="text-[9.5px] leading-tight text-ivory-100/75 sm:text-[10.5px]">Clay chulha popped</p>
              </div>
              <div className="rounded bg-forest-900/70 px-1 py-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 sm:text-[11px]">3. Pure Pack</p>
                <p className="text-[9.5px] leading-tight text-ivory-100/75 sm:text-[10.5px]">Farm-to-plate</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Call to Action Buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start lg:col-start-1 lg:row-start-2">
          <Link href="/shop" className="btn-gold w-full sm:w-auto">
            Shop Makhana
          </Link>
          <Link href="/bulk-orders" className="btn-outline-gold w-full sm:w-auto !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5">
            Explore Bulk Supply
          </Link>
        </div>

        {/* 4. Trust Stats */}
        <dl className="grid max-w-md mx-auto grid-cols-3 gap-4 border-t border-ivory-100/15 pt-5 text-center lg:mx-0 lg:text-left lg:col-start-1 lg:row-start-3">
          {[
            { dt: "Packs", dd: "100g to 1kg" },
            { dt: "Origin", dd: "Purnea, Bihar" },
            { dt: "Supply", dd: "Retail & Bulk" },
          ].map((i) => (
            <div key={i.dt}>
              <dt className="text-[10px] font-semibold uppercase tracking-luxe text-gold-400">{i.dt}</dt>
              <dd className="mt-1 font-serif text-[14px] sm:text-[15px] text-ivory-100">{i.dd}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
