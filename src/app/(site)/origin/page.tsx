import type { Metadata } from "next";
import Link from "next/link";
import { 
  MapPin, 
  Droplets, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Users,
  Wheat,
  Factory,
  Compass,
  FileCheck2,
  ChevronRight,
  Info
} from "lucide-react";
import { MithilaMakhanaGISection } from "@/components/origin/mithila-makhana-gi-section";
import { GIBadge } from "@/components/site/gi-badge";

export const metadata: Metadata = {
  title: "Our Origin — Rooted in the Kosi Belt | AVRELLE AGRO",
  description:
    "Discover the origin story of Avrelle Agro Products Private Limited in Purnea, Bihar—the epicenter of the Kosi makhana belt. Direct Guria seed sourcing from Kishanganj, Purnea, and Saharsa through our 7-district FPC network.",
  keywords: [
    "Kosi belt makhana",
    "Purnea makhana origin",
    "Kishanganj makhana",
    "Saharsa makhana",
    "Guria raw makhana seeds",
    "Farmer Producer Companies Bihar",
    "Mithila Makhana GI-696",
    "AU/48155/GI/696/76",
  ],
};

const KOSI_DISTRICTS = [
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
    <div className="bg-ivory-50 text-forest-950">
      {/* 1. Hero Banner: Bihar's Makhana-Growing Wetlands */}
      <section className="relative overflow-hidden bg-forest-950 py-16 sm:py-24 text-ivory-100 border-b border-gold-500/30">
        <div className="pointer-events-none absolute hidden sm:block inset-6 border border-gold-500/20" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-forest-800/40 via-forest-950/80 to-forest-950 pointer-events-none" />
        
        <div className="section-shell relative z-10">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ivory-100/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-gold-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gold-300 font-medium">Company</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">Our Origin</li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
              <Compass className="h-3.5 w-3.5 text-gold-400" />
              <span>Geographical Roots · Kosi Region, Bihar</span>
            </div>
            <GIBadge variant="compact" />
          </div>

          <h1 className="mt-5 max-w-4xl font-serif text-[34px] sm:text-[48px] lg:text-[54px] font-bold leading-tight text-ivory-50">
            Rooted in the Kosi Belt.<br />
            <span className="text-gold-400 font-normal">Connected to the World.</span>
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-[15.5px] sm:text-[17px] leading-relaxed text-ivory-100/90 font-light">
            <p>
              The story of <strong className="font-semibold text-ivory-50">Avrelle Agro Products Private Limited</strong> begins in <strong className="font-semibold text-gold-300">Purnea, Bihar</strong>—the vibrant epicenter of the Kosi region, where fertile alluvial plains and abundant waterways sustain the world&apos;s finest makhana (fox nut) cultivation. Producing the vast majority of the world&apos;s makhana, this region is steeped in centuries-old harvesting traditions passed down by skilled local farming communities.
            </p>
            <p>
              Founded right at the source, Avrelle Agro bridges the gap between traditional wetland farming and modern global standards. We directly source premium raw makhana seeds—locally known as <strong className="font-semibold text-gold-300">Guria</strong>—from the prime growing belts of <strong className="font-semibold text-ivory-50">Kishanganj, Purnea, and Saharsa</strong>. To ensure fair trade, complete traceability, and rural empowerment, we work hand-in-hand with <strong className="font-semibold text-gold-300">Farmer Producer Companies (FPCs) across seven districts of Bihar</strong>.
            </p>
            <p>
              By combining grassroots farmer partnerships with hygienic, precision processing in Purnea, every batch we deliver reflects the purity of Bihar&apos;s wetlands, ethical sourcing, and an uncompromising commitment to bringing authentic, farm-fresh makhana from our homeland to tables across India and the world.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center">
            <a href="#kosi-map" className="btn-gold flex items-center justify-center gap-2 text-[13px] text-center">
              <span>Explore Sourcing Map</span> <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#fpc-network" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px] text-center">
              Our FPC Network (7 Districts)
            </a>
            <Link href="/mithila-makhana-gi-recognition" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px] text-center">
              GI Authorized User (GI-696)
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Regional Map & Geographical Belts: Purnea, Kishanganj & Saharsa */}
      <section id="kosi-map" className="py-16 sm:py-24 border-b border-beige-300">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-700">Geographic Terroir &amp; Procurement Sourcing</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-forest-950">
              The Epicenter of Global Makhana Cultivation
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-ink-600 leading-relaxed font-light">
              The wetlands feeding off the Kosi, Mahananda, and Ganges river basins create an unrivaled natural aquatic habitat for <em>Euryale ferox</em>. Our direct procurement network spans the core high-yield districts.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Illustrated Map Graphic Card */}
            <div className="relative rounded-2xl border-2 border-gold-500/40 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 p-4 sm:p-8 text-ivory-100 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-gold-500/25 pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400">Bihar Makhana Heartland</span>
                  <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-ivory-50">Kosi-Mithila Agro Map</h3>
                </div>
                <span className="rounded bg-gold-500/20 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono text-gold-300">
                  AU/48155/GI/696/76
                </span>
              </div>

              {/* Graphical Regional Representation */}
              <div className="relative rounded-xl border border-gold-500/20 bg-forest-950/80 p-3.5 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  {/* Kishanganj */}
                  <div className="rounded-lg border border-gold-500/30 bg-forest-900/60 p-4 transition-all hover:bg-forest-900">
                    <span className="inline-block rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold text-gold-300 uppercase">
                      North-East Belt
                    </span>
                    <h4 className="mt-2 font-serif text-[17px] font-bold text-ivory-50">Kishanganj</h4>
                    <p className="mt-1 text-[11.5px] text-ivory-300/80 leading-snug">
                      High-rainfall perennial wetlands producing dense, large Guria seeds.
                    </p>
                  </div>

                  {/* Purnea (Hub) */}
                  <div className="relative rounded-lg border-2 border-gold-400 bg-gold-500/10 p-4 shadow-md sm:scale-105">
                    <span className="inline-block rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-extrabold text-forest-950 uppercase">
                      Agro-Processing Hub
                    </span>
                    <h4 className="mt-2 font-serif text-[19px] font-bold text-gold-300">Purnea</h4>
                    <p className="mt-1 text-[11.5px] text-ivory-100 font-medium leading-snug">
                      AVRELLE Headquarters, sortex grading, moisture control &amp; packaging.
                    </p>
                  </div>

                  {/* Saharsa */}
                  <div className="rounded-lg border border-gold-500/30 bg-forest-900/60 p-4 transition-all hover:bg-forest-900">
                    <span className="inline-block rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold text-gold-300 uppercase">
                      Western Kosi Basin
                    </span>
                    <h4 className="mt-2 font-serif text-[17px] font-bold text-ivory-50">Saharsa</h4>
                    <p className="mt-1 text-[11.5px] text-ivory-300/80 leading-snug">
                      Alluvial oxbow lake harvesting with centuries of traditional popping craft.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-500/15 flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-ivory-300/80 font-mono">
                  <span>Direct Sourcing Nodes: Kishanganj ⇄ Purnea ⇄ Saharsa</span>
                  <span className="text-gold-400">7-District FPC Integration</span>
                </div>
              </div>

              {/* Geographic Narrative Details */}
              <div className="mt-6 space-y-3 text-[13px] text-ivory-200/90 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                  <span><strong>Grassroots Proximity:</strong> Located in Purnea within hours of harvesting ponds, ensuring zero degradation of raw seed moisture before processing.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                  <span><strong>Alluvial Nutrient Richness:</strong> Silt transported by Himalayan tributaries enriches natural water beds, lending Mithila makhana its distinct floral pop and crispness.</span>
                </div>
              </div>
            </div>

            {/* District Breakdown Cards */}
            <div className="space-y-4">
              {KOSI_DISTRICTS.map((d) => (
                <div
                  key={d.name}
                  className={`rounded-xl border p-5 transition-shadow ${
                    d.highlight
                      ? "border-gold-500/60 bg-white shadow-md ring-1 ring-gold-400/40"
                      : "border-beige-300 bg-white shadow-sm hover:shadow"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-[18px] font-bold text-forest-950 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gold-600" />
                      {d.name}
                    </h4>
                    <span className="rounded bg-ivory-100 border border-beige-300 px-2 py-0.5 text-[10.5px] font-semibold uppercase text-forest-800">
                      {d.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] font-medium text-gold-800">{d.role}</p>
                  <p className="mt-2 text-[12.5px] text-ink-600 leading-relaxed">{d.terroir}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Sourcing Journey: From Wetland to Purnea Facility */}
      <section className="bg-white py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-eyebrow text-gold-700">Farm-to-Facility Sequence</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-forest-950">
              The Journey of Guria Seeds: From Wetland to Pack
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-ink-600 leading-relaxed font-light">
              How traditional aquatic harvesting converges seamlessly with precision food-grade processing at AVRELLE.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {SOURCING_JOURNEY_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative rounded-xl border border-beige-300 bg-ivory-50 p-5 flex flex-col justify-between shadow-sm transition-all hover:border-gold-500 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-beige-200 pb-2 mb-3">
                    <span className="font-mono text-[18px] font-bold text-gold-700">{step.step}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-forest-800 bg-gold-500/10 px-2 py-0.5 rounded">
                      {step.location}
                    </span>
                  </div>
                  <h4 className="font-serif text-[16px] font-bold text-forest-950 leading-snug">
                    {step.phase}
                  </h4>
                  <p className="mt-2.5 text-[12.5px] text-ink-600 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Farmer Producer Company (FPC) Network Section */}
      <section id="fpc-network" className="bg-forest-950 py-16 sm:py-24 text-ivory-100 border-b border-gold-500/30">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
                <Users className="h-3.5 w-3.5 text-gold-400" />
                <span>Grassroots Rural Empowerment</span>
              </div>

              <h2 className="mt-4 font-serif text-[28px] sm:text-[38px] font-bold text-ivory-50 leading-tight">
                Hand-in-Hand With Farmer Producer Companies Across 7 Districts
              </h2>

              <p className="mt-4 text-[15px] sm:text-[16px] text-ivory-200/90 leading-relaxed font-light">
                To guarantee complete traceability, fair trade remuneration, and sustainable agricultural livelihoods, Avrelle Agro collaborates directly with Farmer Producer Companies (FPCs) across seven core makhana-producing districts of Bihar.
              </p>

              <div className="mt-6 space-y-3.5 text-[13.5px] text-ivory-100">
                {[
                  "Direct procurement partnerships, eliminating multiple layers of speculative middlemen.",
                  "Transparent digital weighing and fair, prompt price settlements for local harvesters.",
                  "Origin batch-coding linking processed finished lots back to their regional harvesting cluster.",
                  "Support for sustainable pond ecology and generational waterbody conservation in Bihar.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center">
                <Link href="/farmer-network" className="btn-gold text-[13px] text-center">
                  Explore Farmer Network Details
                </Link>
                <Link href="/quality-assurance" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px] text-center">
                  View Quality Assurance Protocols
                </Link>
              </div>
            </div>

            {/* Visual Callout Card */}
            <div className="rounded-2xl border border-gold-500/30 bg-forest-900/70 p-4 sm:p-8 backdrop-blur-sm shadow-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">Institutional Sourcing Model</span>
              <h3 className="mt-2 font-serif text-[22px] font-bold text-ivory-50">
                The 7-District Bihar FPC Alliance
              </h3>
              <p className="mt-2.5 text-[13px] text-ivory-200/80 leading-relaxed">
                By organizing grassroots cultivators under formalized FPC structures, we bridge the gap between traditional manual harvesting and the rigorous quality demands of modern domestic and international buyers.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gold-500/20 pt-4 text-[12.5px]">
                <div className="rounded bg-forest-950/60 p-3 border border-gold-500/10">
                  <span className="block font-serif text-[18px] font-bold text-gold-300">100% Direct</span>
                  <span className="text-[11px] text-ivory-300/80">Sourced at farm-gate &amp; FPC collection centers</span>
                </div>
                <div className="rounded bg-forest-950/60 p-3 border border-gold-500/10">
                  <span className="block font-serif text-[18px] font-bold text-gold-300">7 Districts</span>
                  <span className="text-[11px] text-ivory-300/80">Coverage across prime Bihar wetland belts</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-forest-800 flex items-center justify-between text-[11.5px] text-gold-300">
                <span>Purnea · Kishanganj · Saharsa Core</span>
                <span className="font-mono">Traceable Origin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dedicated GI Recognition Section */}
      <MithilaMakhanaGISection />

      {/* 6. Management Review Framework Notice */}
      <section className="bg-ivory-100 py-6 border-b border-beige-300">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl rounded-lg border border-beige-300 bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
              <div className="text-[12px] text-ink-600 leading-relaxed">
                <span className="font-bold uppercase tracking-wider text-[10.5px] text-forest-950 block">
                  Corporate Governance &amp; Content Transparency Standard
                </span>
                <p className="mt-0.5">
                  All geographical sourcing statements regarding Kishanganj, Purnea, Saharsa, and 7-district FPC collaboration are client-provided operational narratives. AVRELLE AGRO PRODUCTS PRIVATE LIMITED holds official Authorized User recognition under Mithila Makhana GI-696 (Certificate AU/48155/GI/696/76).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-forest-900 py-16 text-ivory-100">
        <div className="section-shell text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-[28px] sm:text-[36px] font-bold text-ivory-50">
            Source Authentic Kosi Makhana Direct From Purnea
          </h2>
          <p className="mt-3 text-[14.5px] text-ivory-200/80 leading-relaxed font-light">
            Whether for premium consumer retail packs or multi-ton B2B wholesale consignments, our direct origin sourcing guarantees unmatched purity.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 items-stretch sm:items-center">
            <Link href="/products" className="btn-gold text-[13px] text-center">
              Explore Complete Product Range
            </Link>
            <Link href="/bulk-supply" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px] text-center">
              Request Bulk Quotation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
