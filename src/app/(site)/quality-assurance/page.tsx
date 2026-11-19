import type { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Flame, 
  Eye, 
  Droplets, 
  Sparkles, 
  Award, 
  Building2, 
  ArrowRight,
  Info,
  Scale,
  FileCheck2,
  PackageCheck,
  SearchCheck,
  BadgeCheck
} from "lucide-react";
import { GIBadge } from "@/components/site/gi-badge";

export const metadata: Metadata = {
  title: "Quality Assurance — Uncompromising Quality, From Wetland to Pack | AVRELLE AGRO",
  description:
    "Explore Avrelle Agro's 5-stage quality assurance protocol in Purnea, Bihar: Guria seed grading, hygienic precision processing, optical sorting, moisture verification, and finished product packaging integrity.",
  keywords: [
    "Makhana quality assurance",
    "Guria seed inspection",
    "Food hygiene standards Bihar",
    "Makhana moisture testing",
    "Sortex makhana grading",
    "Mithila Makhana GI-696",
  ],
};

const QA_STAGES = [
  {
    stage: "Stage 1",
    title: "Raw Seed Grading",
    desc: "Strict inspection of Guria seeds for optimal size, density, and moisture balance prior to popping.",
    metrics: "Size classification & moisture pre-check (<12% baseline)",
    focus: "Density calibration, elimination of hollow/defective seeds, sand-free pre-cleaning.",
    icon: SearchCheck,
  },
  {
    stage: "Stage 2",
    title: "Hygienic & Precision Processing",
    desc: "Controlled roasting and popping methods designed to preserve natural nutrients, crunch, and purity without chemical additives or artificial enhancers.",
    metrics: "Even thermal distribution & sand-tempered popping",
    focus: "Zero artificial bleaching agents, 100% naturally popped white expanded phool makhana.",
    icon: Flame,
  },
  {
    stage: "Stage 3",
    title: "Optical & Manual Sorting",
    desc: "Multi-tier size grading (from standard grades to jumbo Suta makhana) and visual screening to eliminate broken pieces, husks, or foreign matter.",
    metrics: "Sortex aspiration & vibratory grading screens",
    focus: "3 Suta to 6+ Jumbo Suta segregation, manual conveyor table inspection for unpopped hard kernel removal.",
    icon: Eye,
  },
  {
    stage: "Stage 4",
    title: "Moisture & Shelf-Life Testing",
    desc: "Precise moisture-level verification before sealing in food-grade, barrier-protected packaging to lock in crispness and freshness.",
    metrics: "Controlled target: < 3.0% for roasted, < 9.5% for raw phool",
    focus: "Digital moisture testing to halt microbial activity and ensure crunchy long shelf-life.",
    icon: Droplets,
  },
  {
    stage: "Stage 5",
    title: "Finished Product Quality",
    desc: "Comprehensive evaluation of consistency, cleanliness, freshness, product appearance, and packaging integrity before market release.",
    metrics: "Hermetic seal integrity & tamper-evident verification",
    focus: "Food-grade nitrogen flushing, airtight multi-layer barrier films, and batch-coded origin traceability.",
    icon: PackageCheck,
  },
];

const QUALITY_HIGHLIGHTS = [
  {
    title: "Raw Material Inspection",
    desc: "Direct farm-gate screening of raw Guria seeds across Kishanganj, Purnea, and Saharsa, rejecting immature, broken, or insect-damaged harvests at the source.",
    icon: SearchCheck,
  },
  {
    title: "Size & Grade Consistency",
    desc: "Standardized multi-deck mechanical sieving producing uniform 3 Suta, 4 Suta, 5 Suta, and 6+ Jumbo lots without diameter blending or grade compromise.",
    icon: Layers,
  },
  {
    title: "Processing Hygiene",
    desc: "Sanitary stainless-steel contact surfaces (SS304), mandatory personnel cleanroom attire, and zero chemical whitening or artificial flavour enhancers.",
    icon: ShieldCheck,
  },
  {
    title: "Moisture Verification",
    desc: "Rigorous digital batch-level moisture auditing prior to packing, maintaining optimum crunch and preventing rancidity or texture degradation.",
    icon: Droplets,
  },
  {
    title: "Packaging Integrity",
    desc: "Multi-layer barrier pouches for consumer retail and 100-micron LDPE liners inside heavy-duty 8kg PP bags for bulk wholesale transit.",
    icon: PackageCheck,
  },
  {
    title: "Batch-Level Traceability",
    desc: "Machine-readable lot numbering stamped on every container, connecting final retail and commercial packs back to regional FPC procurement clusters.",
    icon: BadgeCheck,
  },
];

export default function QualityAssurancePage() {
  return (
    <div className="bg-ivory-50 text-forest-950">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-forest-950 py-16 sm:py-24 text-ivory-100 border-b border-gold-500/30">
        <div className="pointer-events-none absolute inset-4 border border-gold-500/20 sm:inset-6" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-forest-800/40 via-forest-950/80 to-forest-950 pointer-events-none" />

        <div className="section-shell relative z-10">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ivory-100/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-gold-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gold-300 font-medium">Standards</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">Quality Assurance</li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
              <span>Multi-Stage Protocol · Purnia Facility</span>
            </div>
            <GIBadge variant="compact" />
          </div>

          <h1 className="mt-5 max-w-4xl font-serif text-[34px] sm:text-[48px] lg:text-[54px] font-bold leading-tight text-ivory-50">
            Uncompromising Quality,<br />
            <span className="text-gold-400 font-normal">From Wetland to Pack.</span>
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-[15.5px] sm:text-[17px] leading-relaxed text-ivory-100/90 font-light">
            <p>
              At <strong className="font-semibold text-ivory-50">Avrelle Agro Products Private Limited</strong>, quality assurance is not just a final checkpoint—it is built into every stage of our supply chain. By sourcing raw <strong className="font-semibold text-gold-300">Guria seeds</strong> directly from <strong className="font-semibold text-ivory-50">Kishanganj, Purnea, and Saharsa</strong> through our <strong className="font-semibold text-gold-300">seven-district Farmer Producer Company (FPC) network</strong>, we maintain complete control and traceability from the very first harvest.
            </p>
            <p>
              Every batch undergoes a rigorous, multi-stage quality protocol at our Purnea facility:
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#qa-stages" className="btn-gold flex items-center gap-2 text-[13px]">
              <span>Explore 5 QA Stages</span> <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#quality-highlights" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px]">
              6 Core Highlights
            </a>
            <Link href="/products" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px]">
              View Graded Products
            </Link>
          </div>
        </div>
      </section>

      {/* 5 Distinct Quality Assurance Stages */}
      <section id="qa-stages" className="py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-700">Five Rigorous Checkpoints</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-forest-950">
              The 5-Stage Purnia Facility Protocol
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-ink-600 leading-relaxed font-light">
              From raw Guria seed density analysis to precision thermal roasting and hermetic barrier packaging, each checkpoint guarantees purity and crunch.
            </p>
          </div>

          <div className="mt-14 space-y-6">
            {QA_STAGES.map((s, idx) => (
              <div
                key={s.stage}
                className="relative rounded-2xl border border-beige-300 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-gold-500 hover:shadow-md"
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_2fr_1.2fr] lg:items-center">
                  
                  {/* Stage Identifier & Icon */}
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-forest-900 p-3.5 text-gold-400 shrink-0">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-gold-700">
                        {s.stage}
                      </span>
                      <h3 className="font-serif text-[20px] sm:text-[22px] font-bold text-forest-950">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  {/* Core Description & Focus */}
                  <div className="space-y-2">
                    <p className="text-[14.5px] sm:text-[15.5px] text-ink-800 leading-relaxed font-light">
                      &ldquo;{s.desc}&rdquo;
                    </p>
                    <p className="text-[12.5px] text-ink-500 leading-relaxed">
                      <strong>Operational Focus:</strong> {s.focus}
                    </p>
                  </div>

                  {/* Technical Benchmark Box */}
                  <div className="rounded-xl border border-gold-500/30 bg-ivory-50 p-4 text-[12px] text-forest-900 font-mono">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-800 block mb-1">
                      Quality Benchmark
                    </span>
                    <span className="text-forest-950 font-semibold block">
                      {s.metrics}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Closing Statement Callout Banner */}
          <div className="mt-14 rounded-2xl border-2 border-gold-500/50 bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 p-8 sm:p-10 text-ivory-100 text-center shadow-xl">
            <Award className="h-8 w-8 text-gold-400 mx-auto" />
            <h3 className="mt-3 font-serif text-[22px] sm:text-[28px] font-bold text-ivory-50">
              Export-Grade Purity &amp; Food Safety Standards
            </h3>
            <p className="mt-3 text-[15.5px] sm:text-[17px] leading-relaxed text-gold-200 max-w-3xl mx-auto font-light">
              &ldquo;The result is 100% natural, clean, and export-grade makhana that meets stringent domestic and international food safety standards.&rdquo;
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/products" className="btn-gold text-[13px]">
                Explore Export &amp; Retail Grades
              </Link>
              <Link href="/bulk-supply" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px]">
                Request Technical Batch Specifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Quality Highlights Section */}
      <section id="quality-highlights" className="bg-ivory-100 py-16 sm:py-24 border-b border-beige-300">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-700">Enterprise Standards</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-forest-950">
              Six Core Quality Highlights
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-ink-600 leading-relaxed font-light">
              How AVRELLE AGRO ensures complete consistency, hygiene, and confidence for brands and consumers alike.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {QUALITY_HIGHLIGHTS.map((h, i) => (
              <div
                key={i}
                className="rounded-xl border border-beige-300 bg-white p-6 shadow-sm transition-all hover:border-gold-500 hover:shadow-md"
              >
                <div className="rounded-full bg-forest-900/10 p-3 w-fit text-forest-900 border border-gold-500/20">
                  <h.icon className="h-6 w-6 text-gold-700" />
                </div>
                <h3 className="mt-4 font-serif text-[18px] font-bold text-forest-950">
                  {h.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-600 font-light">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Size & Grade Assurance Showcase */}
      <section className="py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="rounded-2xl border border-beige-300 bg-white p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-beige-200 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold-700">Size Calibrations</span>
                <h3 className="font-serif text-[20px] font-bold text-forest-950">
                  Precision Suta Segregation (3 to 6+ Suta)
                </h3>
                <p className="text-[12.5px] text-ink-500 mt-0.5">
                  Every consignment is mechanically verified for diameter consistency and zero undersized blending.
                </p>
              </div>
              <Link href="/grades" className="btn-outline btn-sm">
                View Size Standards →
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-beige-200 bg-ivory-50 p-2 text-center">
              <img
                src="/brand/grades/size.jpeg"
                alt="Photographic size comparison scale of graded fox nuts"
                width={800}
                height={516}
                className="mx-auto max-h-[340px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Management Review & Transparency Notice */}
      <section className="bg-ivory-100 py-6 border-b border-beige-300">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl rounded-lg border border-beige-300 bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
              <div className="text-[12px] text-ink-600 leading-relaxed">
                <span className="font-bold uppercase tracking-wider text-[10.5px] text-forest-950 block">
                  Corporate Content Verification &amp; Food Safety Standards
                </span>
                <p className="mt-0.5">
                  Statements regarding direct Guria seed sourcing, optical sorting, moisture verification, zero chemical additives, and export-grade safety are client-provided operational descriptions. Formal laboratory COA (Certificate of Analysis) and batch-specific testing documents are available upon institutional request for wholesale and international export consignments.
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
            Request Certified Quality Makhana
          </h2>
          <p className="mt-3 text-[14.5px] text-ivory-200/80 leading-relaxed font-light">
            Discuss customized grade specifications, moisture requirements, and private-label packaging with our quality team in Purnea.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/bulk-supply" className="btn-gold text-[13px]">
              Request Wholesale Quotation
            </Link>
            <Link href="/contact" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px]">
              Contact Corporate Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
