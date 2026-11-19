import type { Metadata } from "next";
import Link from "next/link";
import { 
  Factory, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Package, 
  Truck, 
  Thermometer, 
  Scale, 
  Flame, 
  Filter,
  FileCheck2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Manufacturing & Processing Facility — Purnia, Bihar | AVRELLE AGRO",
  description:
    "Explore AVRELLE AGRO's makhana processing facility in Purnia, Bihar. Discover our 10-stage processing journey, sortex grading, roasting lines, hygienic packaging, and cold-dry storage.",
};

const PROCESSING_STAGES = [
  {
    step: "01",
    title: "Raw Material Procurement",
    subtitle: "Purnia & Kosi Wetland Aggregation",
    description:
      "Raw sun-dried and popped makhana is procured directly through our regional farmer and aggregator network across North Bihar, immediately cataloged by batch code and moisture profile.",
    icon: Factory,
  },
  {
    step: "02",
    title: "Initial Inspection & Moisture Screening",
    subtitle: "Laboratory Benchmarking",
    description:
      "Incoming batches undergo digital moisture testing (targeted below 10%), visual screening for raw shell remnants, and foreign-matter density auditing before admission into the facility.",
    icon: Filter,
  },
  {
    step: "03",
    title: "Cleaning, De-stoning & Dust Aspiration",
    subtitle: "Pneumatic Screening",
    description:
      "Nuts pass through gentle pneumatic air aspirators and vibrating de-stoners to remove microscopic field dust, loose seed coats, and burnt carbon flakes from the primary popping phase.",
    icon: Filter,
  },
  {
    step: "04",
    title: "Multi-Deck Grading & Size Segregation",
    subtitle: "Mechanical Suta Calibration",
    description:
      "Continuous vibrating multi-deck circular screens separate the nuts into calibrated millimeter size tiers: 3 Suta (~11–13 mm), 4 Suta (~14–16 mm), 5 Suta (~17–19 mm), and 6+ Suta (~20–24 mm).",
    icon: Layers,
  },
  {
    step: "05",
    title: "Controlled Roasting & Moisture Reduction",
    subtitle: "Hot-Air Convection Drying",
    description:
      "Where designated for roasted products, calibrated hot-air rotary convection brings core nut moisture down to below 3.0%, transforming internal starch into a crisp, shelf-stable texture.",
    icon: Flame,
  },
  {
    step: "06",
    title: "Seasoning & Enrobing (When Applicable)",
    subtitle: "Clean-Label Flavour Infusion",
    description:
      "For value-added retail snack lines, roasted nuts pass through automated rotating tumble drums for micro-fine oil misting and natural spice/herb application without artificial binding agents.",
    icon: Cpu,
  },
  {
    step: "07",
    title: "Optical & Manual Quality Inspection",
    subtitle: "Visual Defect Rejection",
    description:
      "Nuts flow across illuminated white inspection conveyors where trained quality personnel and optical sensors eliminate broken nuts, burnt spots, and undersized fragments.",
    icon: ShieldCheck,
  },
  {
    step: "08",
    title: "Automated Weighing & Nitrogen Packaging",
    subtitle: "Moisture & Oxidation Barrier",
    description:
      "Computerized multi-head weighers portion the exact net weight. Consumer retail pouches receive food-grade nitrogen flushing; bulk bags receive 100-micron LDPE liners before machine stitching.",
    icon: Scale,
  },
  {
    step: "09",
    title: "Finished-Product Controlled Warehousing",
    subtitle: "Palletized Climate Storage",
    description:
      "Packed cartons and bulk PP bags are stacked on heavy-duty plastic dunnage pallets away from floors and walls in a dry, ventilated, pest-managed warehouse environment.",
    icon: Thermometer,
  },
  {
    step: "10",
    title: "Domestic Dispatch & Container Export",
    subtitle: "Ex-Factory Freight Execution",
    description:
      "Consignments are loaded directly into domestic freight trucks or 20ft/40ft ocean shipping containers bound for Kolkata / Haldia ports with complete phytosanitary and transit documentation.",
    icon: Truck,
  },
];

const INFRASTRUCTURE_PILLARS = [
  {
    title: "Multi-Deck Mechanical Grading Lines",
    description:
      "Vibratory and rotary sizing screen assemblies engineered to segregate fragile puffed fox nuts without crushing or surface abrasion.",
  },
  {
    title: "Cleanroom Packaging Bays",
    description:
      "Enclosed secondary packaging areas featuring positive air pressure, HEPA filtration considerations, and strict hairnet/apron protocols.",
  },
  {
    title: "Automated Nitrogen-Flush Form-Fill-Seal",
    description:
      "High-speed vertical form-fill-seal (VFFS) systems that replace atmospheric oxygen with inert nitrogen to prevent rancidity and maintain crunch for 9–12 months.",
  },
  {
    title: "Palletized Sanitary Warehousing",
    description:
      "Engineered concrete flooring with epoxy coating, elevated plastic pallets, rodent-proof perimeters, and continuous digital relative-humidity monitoring.",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-forest-900 botanical-grid py-14 text-ivory-100 sm:py-20">
        <div className="pointer-events-none absolute inset-4 border border-gold-500/20 sm:inset-6" aria-hidden="true" />
        <div className="section-shell relative">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ivory-100/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-gold-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gold-300 font-medium">Processing &amp; Quality</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">Manufacturing</li>
            </ol>
          </nav>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
            <Factory className="h-3.5 w-3.5" />
            Agro-Industrial Processing Facility · Purnia, Bihar
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-tight text-ivory-50 sm:text-[48px]">
            Engineered for Purity, Precision Grading &amp; Global Standards.
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ivory-100/85">
            AVRELLE AGRO operates a dedicated makhana processing facility in Purnia, Bihar, converting raw wetland harvests into calibrated, moisture-controlled, and hygienically packed consignments.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#process-journey" className="btn-gold">
              View 10-Stage Process Journey
            </a>
            <Link href="/quality-assurance" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              Food Safety &amp; Quality Protocols
            </Link>
          </div>
        </div>
      </div>

      {/* Facility Overview & Technical Transparency */}
      <section className="bg-ivory-50 py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-eyebrow">Facility Architecture</p>
            <h2 className="mt-2 font-serif text-[30px] leading-tight text-forest-900 sm:text-[38px]">
              Processing Infrastructure Located at the Agricultural Epicenter
            </h2>
            <span className="ornament-line mt-4 block" aria-hidden="true" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-700">
              <p>
                Unlike urban packaging units that receive makhana weeks after transit through multiple middlemen, <strong>AVRELLE AGRO PVT LTD</strong> is situated directly in Purnia, Bihar. Being at the primary aggregation point allows us to process freshly popped nuts when their natural aroma, moisture stability, and puffiness are at their peak.
              </p>
              <p>
                Our facility is systematically zoned into raw seed staging, mechanical sortex separation, processing/roasting bays, climate-controlled packaging cleanrooms, and finished-goods bonded warehousing to eliminate cross-contamination and guarantee food-grade handling throughout.
              </p>
            </div>

            {/* Technical Verification Notice Placeholder */}
            <div className="mt-8 rounded-xl border border-gold-500/30 bg-gold-50/60 p-5">
              <div className="flex items-start gap-3">
                <FileCheck2 className="h-5 w-5 text-gold-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-[15px] font-bold text-forest-900">
                    Production Capacity &amp; Line Audit Notice
                  </h4>
                  <p className="mt-1 text-[13px] text-ink-600 leading-relaxed">
                    <em>[Exact covered factory floor area (sq. ft.), daily metric tonnage processing capacity, and machine line specifications will be formally posted following completion of our scheduled technical facility audit.]</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-beige-300 bg-white p-2 shadow-luxe-md">
              <img
                src="/brand/makhana_hero.jpeg"
                alt="Factory processing and packaging operations in Purnia"
                width={700}
                height={450}
                className="w-full rounded-xl object-cover"
              />
              <p className="mt-2.5 text-center text-[12px] text-ink-500">
                Purnia processing facility: raw sorting, mechanical sizing, and nitrogen packaging.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl border border-beige-200 bg-white p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-700">Food Safety</span>
                <p className="mt-1 font-serif text-[18px] font-bold text-forest-900">Food Grade SS304</p>
                <p className="text-[11.5px] text-ink-500">Sanitary contact equipment</p>
              </div>
              <div className="rounded-xl border border-beige-200 bg-white p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-700">Packaging</span>
                <p className="mt-1 font-serif text-[18px] font-bold text-forest-900">Nitrogen Flushed</p>
                <p className="text-[11.5px] text-ink-500">Moisture barrier sealing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10-Step Process Journey */}
      <section id="process-journey" className="bg-white py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">End-to-End Workflow</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[38px]">
              The 10-Stage Makhana Processing Journey
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              Each batch is tracked through ten precise quality and processing checkpoints before domestic dispatch or global container loading.
            </p>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PROCESSING_STAGES.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="relative rounded-2xl border border-beige-200 bg-ivory-50/60 p-7 transition-all hover:border-gold-500/50 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest-900 text-gold-400 shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-serif text-[28px] font-bold text-gold-500/40">
                      {st.step}
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-800">
                      {st.subtitle}
                    </span>
                    <h3 className="font-serif text-[20px] font-semibold text-forest-900 mt-0.5">
                      {st.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-ink-700">
                      {st.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Machinery & Infrastructure Pillars */}
      <section className="bg-beige-100/40 py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">Equipment &amp; Standards</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[36px]">
              Infrastructure Built for Consistency
            </h2>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INFRASTRUCTURE_PILLARS.map((p) => (
              <div key={p.title} className="rounded-xl border border-beige-300 bg-white p-6">
                <CheckCircle2 className="h-6 w-6 text-forest-700" />
                <h3 className="mt-3 font-serif text-[17px] font-semibold text-forest-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-900 botanical-grid text-ivory-100 py-16">
        <div className="section-shell flex flex-col items-center text-center">
          <p className="text-eyebrow !text-gold-400">Institutional Supply</p>
          <h2 className="mt-3 max-w-2xl font-serif text-[28px] text-ivory-50 sm:text-[38px]">
            Schedule a Commercial Consultation or Audit
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ivory-100/80">
            We welcome corporate procurement heads, food manufacturing technical teams, and export aggregators to inspect our facility specifications.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/bulk-supply" className="btn-gold">
              Submit Bulk Supply RFQ
            </Link>
            <Link href="/quality-assurance" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              Review Food Safety Protocols
            </Link>
            <Link href="/contact" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              Contact Factory Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

