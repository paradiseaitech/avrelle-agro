import Link from "next/link";
import { 
  Sprout, 
  MapPin, 
  Layers, 
  Flame, 
  Package, 
  Globe2, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface Stage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Sprout;
  tag: string;
}

const STAGES: Stage[] = [
  {
    step: "01",
    title: "Farming",
    subtitle: "Sacred Wetland Cultivation",
    description: "Traditional pond farming nurtured in natural freshwater wetlands of North Bihar.",
    icon: Sprout,
    tag: "Terroir",
  },
  {
    step: "02",
    title: "Sourcing",
    subtitle: "Direct Grassroots Intake",
    description: "Raw Guria seeds directly sourced from farming belts across Kishanganj, Purnea & Saharsa.",
    icon: MapPin,
    tag: "Fair Sourcing",
  },
  {
    step: "03",
    title: "Grading",
    subtitle: "Multi-Tier Mesh Calibration",
    description: "Precision size segregation from 3 Suta to 6+ Suta Jumbo pops for absolute uniformity.",
    icon: Layers,
    tag: "Sortex Sizing",
  },
  {
    step: "04",
    title: "Processing",
    subtitle: "Sanitary Thermal Roasting",
    description: "Hygienic processing on SS304 surfaces with zero chemical bleaching or synthetic additives.",
    icon: Flame,
    tag: "Hygienic",
  },
  {
    step: "05",
    title: "Packaging",
    subtitle: "Moisture Barrier Protection",
    description: "Nitrogen-flushed retail pouches and heavy-duty 8 kg White PP bags to seal lasting crunch.",
    icon: Package,
    tag: "Sub-3% Moisture",
  },
  {
    step: "06",
    title: "Market",
    subtitle: "Domestic & Global Dispatch",
    description: "Seamless fulfillment for Indian households, national wholesale distributors, and export containers.",
    icon: Globe2,
    tag: "Worldwide",
  },
];

export function FarmToMarket() {
  return (
    <section id="farm-to-market" className="bg-ivory-100/60 py-16 sm:py-20 lg:py-24 border-b border-beige-200">
      <div className="section-shell">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-eyebrow">Traceable Lifecycle</p>
          <h2 className="mt-2 font-serif text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-charcoal-900 tracking-tight">
            From Farm to Market
          </h2>
          <span className="ornament-line mt-3 block mx-auto" aria-hidden="true" />
          <p className="mt-4 text-[15.5px] sm:text-[17px] leading-relaxed text-muted-grey max-w-2xl mx-auto">
            Every batch carries the journey of Bihar&apos;s wetlands, local farming communities and careful processing.
          </p>
        </div>

        {/* Desktop Horizontal Timeline / 6 Stages Grid */}
        <div className="relative mt-14 sm:mt-18">
          
          {/* Subtle connecting track line on desktop */}
          <div 
            className="hidden xl:block absolute top-[42px] left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-gold-300 via-sage-300 to-gold-400 z-0" 
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 relative z-10">
            {STAGES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="group relative flex flex-col justify-between rounded-2xl border border-beige-300 bg-white p-5 shadow-xs transition-all duration-300 hover:border-gold-500 hover:shadow-md hover:-translate-y-1"
                >
                  <div>
                    {/* Top Step Number Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-100 text-[12px] font-mono font-bold text-charcoal-900 border border-beige-200 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                        {s.step}
                      </span>
                      <span className="rounded-full bg-sage-50 px-2.5 py-0.5 text-[9.5px] font-semibold text-sage-700 border border-sage-200">
                        {s.tag}
                      </span>
                    </div>

                    {/* Stage Icon */}
                    <div className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ivory-50 text-gold-700 border border-beige-200 group-hover:border-gold-500/40 group-hover:text-gold-600 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Titles */}
                    <h3 className="mt-3 font-serif text-[18px] font-bold text-charcoal-900">
                      {s.title}
                    </h3>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-700 mt-0.5">
                      {s.subtitle}
                    </p>

                    {/* Short Description */}
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted-grey">
                      {s.description}
                    </p>
                  </div>

                  {/* Stage indicator note */}
                  <div className="mt-4 pt-3 border-t border-beige-100 flex items-center gap-1.5 text-[11px] font-medium text-sage-700">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Stage {idx + 1} of 6</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sourcing & Facility CTA */}
        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/farmer-network"
            className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 !py-3 !text-[12.5px]"
          >
            <span>Explore Farmer Network &amp; FPC Model</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/manufacturing"
            className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2 !py-3 !text-[12.5px]"
          >
            <span>Tour Our Purnea Facility</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

