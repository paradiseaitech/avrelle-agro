import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";
import { 
  Building2, 
  Target, 
  Award, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Sparkles,
  Wheat,
  Factory,
  Globe2
} from "lucide-react";
import { GIBadge } from "@/components/site/gi-badge";

export const metadata: Metadata = {
  title: "About Us | AVRELLE AGRO PRODUCTS PRIVATE LIMITED — Mithila Makhana GI-696 Authorized User",
  description:
    "Learn about Avrelle Agro Products Private Limited, an officially recognized Authorized User of Mithila Makhana (GI-696), dedicated to traceable sourcing, hygienic processing, and bringing authentic fox nuts from Bihar to the world.",
  keywords: [
    "Avrelle Agro Products Private Limited",
    "About Avrelle Agro",
    "Mithila Makhana GI Authorized User",
    "GI-696",
    "AU/48155/GI/696/76",
    "Makhana processing Purnia Bihar",
    "Bihar makhana company",
  ],
};

export default async function AboutPage() {
  const { business, companyHistory, giRecognition } = await getSettings();

  const certNumber = giRecognition?.certNumber || "AU/48155/GI/696/76";
  const giNumber = giRecognition?.giNumber || "GI-696";

  return (
    <div className="bg-ivory-50 text-forest-950">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-forest-900 botanical-grid py-14 text-ivory-100 sm:py-20 border-b border-gold-500/30">
        <div className="pointer-events-none absolute inset-4 border border-gold-500/20 sm:inset-6" aria-hidden="true" />
        <div className="section-shell relative">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ivory-100/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-gold-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gold-300 font-medium">Company</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">About Us</li>
            </ol>
          </nav>
          
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
              <Building2 className="h-3.5 w-3.5" />
              <span>Corporate Profile · Avrelle Agro Products Private Limited</span>
            </div>
            <GIBadge variant="compact" certNumber={certNumber} giNumber={giNumber} />
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-tight text-ivory-50 sm:text-[48px] font-bold">
            Rooted in Mithila.<br />
            <span className="text-gold-400 font-normal">Crafted for Global Agro Excellence.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ivory-100/90 font-light">
            Avrelle Agro Products Private Limited is an agro-processing and makhana enterprise headquartered in Purnia, Bihar.
            As an officially recognized Authorized User of Mithila Makhana (GI-696), we bridge the gap between traditional farming communities and quality-conscious domestic and global markets.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/mithila-makhana-gi-recognition" className="btn-gold flex items-center gap-2 text-[13px]">
              Explore Our GI Recognition <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/origin" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px]">
              Discover Mithila Origin
            </Link>
            <Link href="/manufacturing" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px]">
              View Processing Facility
            </Link>
          </div>
        </div>
      </div>

      {/* Prominent GI Authorized User Banner */}
      <section className="border-b border-beige-300/80 bg-ivory-100 py-6">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <GIBadge variant="banner" certNumber={certNumber} giNumber={giNumber} />
          </div>
        </div>
      </section>

      {/* Company History: 4 Authoritative Storytelling Chapters */}
      <section className="py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-eyebrow text-gold-700">Company History &amp; Evolution</p>
            <h2 className="mt-2 font-serif text-[30px] sm:text-[40px] font-bold text-forest-950">
              The Journey of Avrelle Agro Products
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-ink-600 leading-relaxed">
              From our origin in the premier makhana belt of Bihar to building integrated, hygienic processing and global supply capabilities.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {/* Chapter 1: Beginning */}
            <div className="relative rounded-2xl border border-beige-300 bg-white p-6 sm:p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex items-center gap-3 md:flex-col md:items-start shrink-0">
                  <div className="rounded-full bg-forest-900 p-3 text-gold-400">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-gold-700">
                    Chapter 01
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-forest-950">
                    {companyHistory?.beginningHeadline || "Beginning"}
                  </h3>
                  <div className="mt-4 space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-700 font-light whitespace-pre-line">
                    {companyHistory?.beginningText ||
                      "Founded with a vision to elevate one of India’s most nutrient-dense superfoods from local harvests to global pantries, Avrelle Agro Products Private Limited began its journey in the heartland of makhana cultivation.\n\nRecognizing the immense potential of fox nuts—and the need for modernized, hygienic, and transparent processing—we set out to bridge the gap between traditional farming communities and quality-conscious consumers."}
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter 2: Our Foundation */}
            <div className="relative rounded-2xl border-2 border-gold-500/40 bg-gradient-to-br from-ivory-50 to-white p-6 sm:p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex items-center gap-3 md:flex-col md:items-start shrink-0">
                  <div className="rounded-full bg-gold-500 p-3 text-forest-950">
                    <Award className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-gold-700">
                    Chapter 02
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-forest-950">
                      {companyHistory?.foundationHeadline || "Our Foundation"}
                    </h3>
                    <span className="rounded bg-gold-500/20 px-2.5 py-0.5 text-[11px] font-mono font-bold text-gold-800">
                      {giNumber} Authorized User
                    </span>
                  </div>
                  <div className="mt-4 space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-700 font-light whitespace-pre-line">
                    {companyHistory?.foundationText ||
                      "From day one, our foundation has been built on direct collaboration with local farmers and harvesters across Bihar’s premier makhana-producing belt.\n\nProudly recognized as an Authorized User of Mithila Makhana (GI-696), we uphold the authentic regional heritage, unique agro-climatic identity, and traditional cultivation practices that distinguish genuine Mithila Makhana.\n\nBy working closely at the grassroots level, we aim to ensure origin traceability and fair value for local cultivators while preserving time-honored pond harvesting and seed-popping expertise."}
                  </div>
                  <div className="mt-6 pt-5 border-t border-beige-200 flex flex-wrap items-center justify-between gap-3 text-[12.5px]">
                    <span className="font-mono font-semibold text-gold-800">
                      Authorized User Certificate: {certNumber}
                    </span>
                    <Link
                      href="/mithila-makhana-gi-recognition"
                      className="font-medium text-forest-800 hover:text-gold-700 underline"
                    >
                      View GI Recognition Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter 3: Our Growth and Capabilities */}
            <div className="relative rounded-2xl border border-beige-300 bg-white p-6 sm:p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex items-center gap-3 md:flex-col md:items-start shrink-0">
                  <div className="rounded-full bg-forest-900 p-3 text-gold-400">
                    <Factory className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-gold-700">
                    Chapter 03
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-forest-950">
                    {companyHistory?.growthHeadline || "Our Growth and Capabilities"}
                  </h3>
                  <div className="mt-4 space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-700 font-light whitespace-pre-line">
                    {companyHistory?.growthText ||
                      "As demand grew, we expanded our capabilities from raw agricultural sourcing into end-to-end processing, grading, and packaging.\n\nBy integrating clean, food-grade sorting, roasting, and moisture-controlled packaging infrastructure, we transform GI-eligible harvests into export-ready, shelf-stable products.\n\nEvery batch undergoes quality checks for size, crunch, purity, and freshness—delivering authenticity across both bulk B2B supplies and retail lines like Super Makhana Raw."}
                  </div>
                  <div className="mt-6 pt-5 border-t border-beige-200 flex flex-wrap gap-4">
                    <Link href="/manufacturing" className="text-[12.5px] font-medium text-forest-800 hover:text-gold-700 underline">
                      Explore Processing Facility &rarr;
                    </Link>
                    <Link href="/quality-assurance" className="text-[12.5px] font-medium text-forest-800 hover:text-gold-700 underline">
                      Review Quality Protocols &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter 4: Where We Stand Today */}
            <div className="relative rounded-2xl border border-beige-300 bg-white p-6 sm:p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex items-center gap-3 md:flex-col md:items-start shrink-0">
                  <div className="rounded-full bg-forest-900 p-3 text-gold-400">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-gold-700">
                    Chapter 04
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-forest-950">
                    {companyHistory?.todayHeadline || "Where We Stand Today"}
                  </h3>
                  <div className="mt-4 space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-700 font-light whitespace-pre-line">
                    {companyHistory?.todayText ||
                      "Today, Avrelle Agro Products is building its presence across the makhana value chain, supplying traceable fox nuts to domestic and international markets.\n\nGuided by integrity, regional pride, and continuous innovation, we remain committed to supporting rural livelihoods while bringing authentic Mithila Makhana to the world."}
                  </div>
                  <div className="mt-6 pt-5 border-t border-beige-200 flex flex-wrap items-center justify-between gap-3 text-[12.5px]">
                    <span className="text-ink-500">Purnia, Bihar, India · Domestic &amp; Global Supply</span>
                    <Link href="/exports" className="font-medium text-forest-800 hover:text-gold-700 underline">
                      Global Exports Desk &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Strategic Visual Storytelling Pillars */}
      <section className="bg-forest-950 py-16 sm:py-24 text-ivory-100 border-b border-gold-500/30">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-400">Our Strategic Foundations</p>
            <h2 className="mt-2 font-serif text-[30px] sm:text-[40px] font-bold text-ivory-50">
              The Seven Pillars of Avrelle Agro
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-ivory-200/90 leading-relaxed font-light">
              How we uphold traditional agro-heritage while delivering modern, certified, and traceable excellence.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Our Roots in Bihar",
                desc: "Direct operational base in Purnia, situated at the nexus of India's richest wetland makhana ecosystems.",
                icon: MapPin,
              },
              {
                title: "Commitment to Farmers",
                desc: "Direct procurement partnerships with wetland harvesters, ensuring origin traceability and fair economic returns.",
                icon: Users,
              },
              {
                title: "Processing & Capabilities",
                desc: "Integrated mechanical grading, sorting, and moisture-controlled packaging from raw harvests to shelf-stable packs.",
                icon: Factory,
              },
              {
                title: "Quality Philosophy",
                desc: "Stringent sizing benchmarks, zero chemical puffing, and moisture retention guarantees across all batches.",
                icon: ShieldCheck,
              },
              {
                title: "GI Authorized User Recognition",
                desc: `Officially recognized under GI-696 with Certificate ${certNumber}, celebrating authentic Mithila origin.`,
                icon: Award,
              },
              {
                title: "Vision for the Future",
                desc: "Positioning Mithila Makhana as a premier, sustainable global superfood across international specialty food markets.",
                icon: Target,
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gold-500/20 bg-forest-900/60 p-6 backdrop-blur-sm transition-all hover:border-gold-500/40"
              >
                <p.icon className="h-7 w-7 text-gold-400" />
                <h3 className="mt-4 font-serif text-[18px] font-semibold text-ivory-100">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ivory-200/80 font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Summary & Contact Callout */}
      <section className="py-16 sm:py-20">
        <div className="section-shell">
          <div className="rounded-2xl border border-beige-300 bg-white p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h2 className="font-serif text-[26px] sm:text-[34px] font-bold text-forest-950">
              Partner With Avrelle Agro Products
            </h2>
            <p className="mt-3 text-[15px] text-ink-600 max-w-2xl mx-auto leading-relaxed">
              We welcome enquiries from wholesale distributors, private label food brands, international importers, and retail institutional buyers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/bulk-supply" className="btn-primary">
                Submit Wholesale Enquiry
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Corporate Office
              </Link>
            </div>
            <p className="mt-6 text-[12px] font-mono text-ink-400">
              Registered Entity: {business.displayName} · Purnia, Bihar, India
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
