import type { Metadata } from "next";
import Link from "next/link";
import { 
  Compass, 
  MapPin, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import { GIBadge } from "@/components/site/gi-badge";
import { MithilaMakhanaGISection } from "@/components/origin/mithila-makhana-gi-section";

export const metadata: Metadata = {
  title: "Our Origin & Sourcing Heritage | Purnea, Bihar | AVRELLE AGRO",
  description:
    "Discover the origin story of Avrelle Agro Products Private Limited in Purnea, Bihar. Sourcing raw Guria seeds across Kishanganj, Purnea, and Saharsa through our seven-district FPC network.",
  keywords: [
    "Makhana origin Bihar",
    "Purnea makhana",
    "Kosi belt fox nuts",
    "Kishanganj makhana",
    "Saharsa makhana sourcing",
    "Farmer Producer Company makhana",
    "Guria seed sourcing",
    "Mithila Makhana GI",
  ],
};

const SOURCING_DISTRICTS = [
  {
    name: "Purnea",
    role: "The Processing & Commercial Epicenter",
    terroir: "Alluvial river basin with high-density wetland pond networks.",
    tag: "Headquarters & Facility",
    highlight: true,
  },
  {
    name: "Kishanganj",
    role: "Prime Wetland Cultivation Belt",
    terroir: "Heavy annual monsoon replenishment, acidic-alluvial pond silt yielding bold Guria seeds.",
    tag: "Primary Procurement Belt",
    highlight: false,
  },
  {
    name: "Saharsa",
    role: "Traditional Silt-Rich Harvesting Territory",
    terroir: "Perennial floodplain oxbow lakes (Chaur) producing naturally large nut varieties.",
    tag: "Primary Procurement Belt",
    highlight: false,
  },
];

const SOURCING_JOURNEY_STEPS = [
  {
    step: "01",
    phase: "Wetland Sowing & Natural Cultivation",
    desc: "Gorgon nut seeds germinate underwater in organic, silty freshwater ponds. Hand-cultivated by generational farming communities without synthetic fertilizers.",
    location: "Ponds of Kosi & Mithila",
  },
  {
    step: "02",
    phase: "Grassroots Guria Seed Harvest",
    desc: "Skilled harvesters dive to the pond beds to gather raw, dark makhana seeds locally celebrated as 'Guria', washing and sun-curing them on clean mats.",
    location: "Kishanganj, Purnea & Saharsa",
  },
  {
    step: "03",
    phase: "FPC Aggregation & Fair Procurement",
    desc: "Working with Farmer Producer Companies (FPCs) across seven Bihar districts ensures transparent weighing, fair price discovery, and direct community returns.",
    location: "7-District FPC Network",
  },
  {
    step: "04",
    phase: "Precision Processing in Purnea",
    desc: "Arriving at our modern Purnea hub, Guria seeds are pre-graded, tempered in hot sand inside controlled roasters, and popped to pristine white phool makhana.",
    location: "Purnea Agro Facility",
  },
  {
    step: "05",
    phase: "Sortex Grading & Barrier Packaging",
    desc: "Multi-tier size grading (3 Suta to 6+ Jumbo) with optical sorting and food-grade moisture barrier packaging ready for domestic and global shipment.",
    location: "Domestic & Export Dispatch",
  },
];

export default function OriginPage() {
  return (
    <div className="bg-ivory-50 text-charcoal-900">
      {/* 1. Hero Banner: Bihar's Makhana-Growing Wetlands - Light & Elegant */}
      <section className="relative overflow-hidden bg-ivory-50 py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell relative z-10">
          <nav aria-label="Breadcrumb" className="text-[12px] text-muted-grey">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-gold-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gold-700 font-medium">Company</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-charcoal-900">Our Origin</li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-800">
              <Compass className="h-3.5 w-3.5 text-gold-600" />
              <span>Geographical Roots · Kosi Region, Bihar</span>
            </div>
            <GIBadge variant="compact" />
          </div>

          <h1 className="mt-5 max-w-4xl font-serif text-[34px] sm:text-[48px] lg:text-[54px] font-bold leading-tight text-charcoal-900">
            Rooted in the Kosi Belt.<br />
            <span className="text-gold-600 font-serif italic font-normal">Connected to the World.</span>
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-[15.5px] sm:text-[17px] leading-relaxed text-muted-grey">
            <p>
              The story of <strong className="font-semibold text-charcoal-900">Avrelle Agro Products Private Limited</strong> begins in <strong className="font-semibold text-charcoal-900">Purnea, Bihar</strong>—the vibrant epicenter of the Kosi region, where fertile alluvial plains and abundant waterways sustain the world&apos;s finest makhana (fox nut) cultivation. Producing the vast majority of the world&apos;s makhana, this region is steeped in centuries-old harvesting traditions passed down by skilled local farming communities.
            </p>
            <p>
              Founded right at the source, Avrelle Agro bridges the gap between traditional wetland farming and modern global standards. We directly source premium raw makhana seeds—locally known as <strong className="font-semibold text-gold-700">Guria</strong>—from the prime growing belts of <strong className="font-semibold text-charcoal-900">Kishanganj, Purnea, and Saharsa</strong>. To ensure fair trade, complete traceability, and rural empowerment, we work hand-in-hand with <strong className="font-semibold text-charcoal-900">Farmer Producer Companies (FPCs) across seven districts of Bihar</strong>.
            </p>
            <p>
              By combining grassroots farmer partnerships with hygienic, precision processing in Purnea, every batch we deliver reflects the purity of Bihar&apos;s wetlands, ethical sourcing, and an uncompromising commitment to bringing authentic, farm-fresh makhana from our homeland to tables across India and the world.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center">
            <a href="#kosi-map" className="btn-gold flex items-center justify-center gap-2 text-[13px] text-center">
              <span>Explore Sourcing Map</span> <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#fpc-network" className="btn-outline text-[13px] text-center">
              Our FPC Network (7 Districts)
            </a>
            <Link href="/mithila-makhana-gi-recognition" className="btn-outline text-[13px] text-center">
              GI Authorized User (GI-696)
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Regional Map & Geographical Belts: Purnea, Kishanganj & Saharsa */}
      <section id="kosi-map" className="py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-700">Geographic Terroir &amp; Procurement Sourcing</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-charcoal-900">
              The Epicenter of Global Makhana Cultivation
            </h2>
            <span className="ornament-line mt-3 block" aria-hidden="true" />
            <p className="mt-3 text-[15px] sm:text-[16px] text-muted-grey leading-relaxed">
              Makhana requires perennial, stagnant freshwater ponds recharged annually by Himalayan river overflows. The Kosi and Seemanchal basins in northeastern Bihar represent the most fertile natural ecosystem in the world for gorgon nut cultivation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOURCING_DISTRICTS.map((dist) => (
              <div
                key={dist.name}
                className={`rounded-2xl border p-6 transition-all bg-white shadow-xs hover:shadow-md ${
                  dist.highlight ? "border-gold-500 ring-2 ring-gold-400/20" : "border-beige-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-ivory-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-800 border border-beige-200">
                    {dist.tag}
                  </span>
                  <MapPin className={`h-5 w-5 ${dist.highlight ? "text-gold-600" : "text-muted-grey"}`} />
                </div>
                <h3 className="mt-4 font-serif text-[22px] font-bold text-charcoal-900">{dist.name}</h3>
                <p className="mt-1 text-[13px] font-semibold text-gold-700">{dist.role}</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted-grey">{dist.terroir}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The 5-Stage Sourcing Journey: From Wetland Ponds to Purnea Hub */}
      <section className="bg-ivory-100/60 py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-eyebrow text-gold-700">Seed to Shelf Protocol</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-charcoal-900">
              The Journey of Authentic Bihar Makhana
            </h2>
            <span className="ornament-line mt-3 block mx-auto" aria-hidden="true" />
            <p className="mt-3 text-[15px] sm:text-[16px] text-muted-grey">
              Every pop of phool makhana follows rigorous artisanal harvesting combined with state-of-the-art grading and packaging.
            </p>
          </div>

          <div className="mt-14 space-y-6 max-w-4xl mx-auto">
            {SOURCING_JOURNEY_STEPS.map((s) => (
              <div
                key={s.step}
                className="grid gap-4 rounded-2xl border border-beige-300 bg-white p-5 sm:p-7 sm:grid-cols-[80px_1fr] items-center shadow-xs"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ivory-50 text-gold-700 font-mono text-[18px] font-bold border border-beige-200">
                  {s.step}
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-charcoal-900">
                      {s.phase}
                    </h3>
                    <span className="rounded-full bg-sage-50 px-2.5 py-0.5 text-[10.5px] font-medium text-sage-700 border border-sage-200">
                      {s.location}
                    </span>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-grey">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Complete Mithila Makhana GI Terroir Section (Interactive Map & Pillars) */}
      <MithilaMakhanaGISection />

      {/* 5. Direct Farmer Engagement: 7-District FPC Network */}
      <section id="fpc-network" className="py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-eyebrow text-gold-700">Community Empowerment</p>
              <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-charcoal-900 leading-tight">
                Partnering With 7-District Farmer Producer Companies
              </h2>
              <span className="ornament-line mt-3 block" aria-hidden="true" />
              <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-muted-grey">
                Avrelle Agro is dedicated to elevating the economic resilience of the indigenous Mallah and traditional makhana-growing families of Bihar. Rather than buying through unvetted spot traders, we operate structured aggregation partnerships with <strong className="text-charcoal-900 font-semibold">Farmer Producer Companies across seven districts</strong>.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Guaranteed procurement at fair, transparent mandi benchmarks.",
                  "Zero intermediate exploitation or unfair weight discounting.",
                  "Batch-level origin tagging for complete chain-of-custody transparency.",
                  "Capacity building on post-harvest seed drying and moisture control.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                    <span className="text-[14px] text-charcoal-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/farmer-network" className="btn-gold text-center">
                  Learn About Our Farmer Network
                </Link>
                <Link href="/contact" className="btn-outline text-center">
                  Partner As An FPC
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-beige-300 bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-[20px] font-bold text-charcoal-900 border-b border-beige-200 pb-3">
                Primary FPC Procurement Districts
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                {["Purnea", "Kishanganj", "Saharsa", "Katihar", "Araria", "Darbhanga", "Madhubani"].map((d) => (
                  <div key={d} className="rounded-xl bg-ivory-50 p-3 border border-beige-200">
                    <span className="font-semibold text-charcoal-900 block">{d}</span>
                    <span className="text-[11px] text-muted-grey">Registered FPC Cluster</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Facility Sourcing Call to Action */}
      <section className="py-16 sm:py-20 bg-ivory-50">
        <div className="section-shell">
          <div className="rounded-3xl border border-beige-300 bg-white p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
            <h2 className="font-serif text-[26px] sm:text-[34px] font-bold text-charcoal-900">
              Source Directly From Bihar&apos;s Makhana Capital
            </h2>
            <p className="mt-3 text-[15px] text-muted-grey max-w-2xl mx-auto leading-relaxed">
              We supply domestic food brands, dry fruit distributors, supermarket chains, and global importers with genuine, traceable Mithila Makhana.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/bulk-supply" className="btn-gold">
                Wholesale Sourcing &amp; Rates
              </Link>
              <Link href="/shop" className="btn-outline">
                Order Sample Retail Packs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
