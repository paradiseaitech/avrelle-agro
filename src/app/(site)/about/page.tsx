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
  Factory 
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
    <div className="bg-ivory-50 text-charcoal-900">
      {/* Header Banner - Light & Elegant */}
      <div className="relative overflow-hidden bg-ivory-50 py-14 sm:py-20 border-b border-beige-200">
        <div className="section-shell relative">
          <nav aria-label="Breadcrumb" className="text-[12px] text-muted-grey">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-gold-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gold-700 font-medium">Company</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-charcoal-900">About Us</li>
            </ol>
          </nav>
          
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-800">
              <Building2 className="h-3.5 w-3.5" />
              <span>Corporate Profile · Avrelle Agro Products Private Limited</span>
            </div>
            <GIBadge variant="compact" certNumber={certNumber} giNumber={giNumber} />
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-tight text-charcoal-900 sm:text-[48px] font-bold">
            Rooted in Mithila.<br />
            <span className="text-gold-600 font-serif italic font-normal">Crafted for Global Agro Excellence.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-muted-grey">
            Avrelle Agro Products Private Limited is an agro-processing and makhana enterprise headquartered in Purnia, Bihar.
            As an officially recognized Authorized User of Mithila Makhana (GI-696), we bridge the gap between traditional farming communities and quality-conscious domestic and global markets.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/mithila-makhana-gi-recognition" className="btn-gold flex items-center gap-2 text-[13px]">
              Explore Our GI Recognition <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/origin" className="btn-outline text-[13px]">
              Discover Mithila Origin
            </Link>
            <Link href="/manufacturing" className="btn-outline text-[13px]">
              View Processing Facility
            </Link>
          </div>
        </div>
      </div>

      {/* Prominent GI Authorized User Banner with Official Logo */}
      <section className="border-b border-beige-200 bg-white py-8">
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
            <h2 className="mt-2 font-serif text-[30px] sm:text-[40px] font-bold text-charcoal-900">
              The Journey of Avrelle Agro Products
            </h2>
            <span className="ornament-line mt-3 block mx-auto" aria-hidden="true" />
            <p className="mt-3 text-[15px] sm:text-[16px] text-muted-grey leading-relaxed">
              From our origin in the premier makhana belt of Bihar to building integrated, hygienic processing and global supply capabilities.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {[
              {
                num: "01",
                era: "The Beginning",
                title: companyHistory?.beginningHeadline || "Deep Roots in Purnea Wetlands",
                text:
                  companyHistory?.beginningText ||
                  "Avrelle Agro Products Private Limited emerged from direct immersion in the makhana heartland of North Bihar. Recognizing the exceptional quality of local aquatic crops alongside the fragmented nature of traditional trading channels, the founders envisioned a modernized agro-enterprise anchored directly at the source.",
                takeaway: "Direct local presence in the primary aggregation market of Purnea.",
              },
              {
                num: "02",
                era: "Foundational Sourcing",
                title: companyHistory?.foundationHeadline || "Empowering Grassroots Harvesters",
                text:
                  companyHistory?.foundationText ||
                  "We instituted fair procurement mechanisms with wetland farming communities across the Kosi and Seemanchal basins. By establishing direct FPC aggregation, we ensured farmers receive fair market compensation while guaranteeing complete traceability for raw Guria seed batches.",
                takeaway: "Transparent procurement eliminating multi-tiered broker distortion.",
              },
              {
                num: "03",
                era: "Capacity & Processing",
                title: companyHistory?.growthHeadline || "Modern Mechanical & Hygienic Standards",
                text:
                  companyHistory?.growthText ||
                  "Investing in Purnea's post-harvest infrastructure, we established modern Sortex optical grading lines, controlled thermal roasting ovens, and food-grade barrier packaging facilities, adhering to strict food safety benchmarks.",
                takeaway: "Sub-3% roasted moisture and multi-stage calibrated sizing.",
              },
              {
                num: "04",
                era: "Today & Beyond",
                title: companyHistory?.todayHeadline || "Official GI-696 Recognition & Global Trade",
                text:
                  companyHistory?.todayText ||
                  `Today, officially recognized as an Authorized User of Mithila Makhana (${giNumber}) under Certificate ${certNumber}, Avrelle serves both Indian households with premium retail packs and global food importers with containerized ocean freight.`,
                takeaway: "Government-recognized origin provenance and export compliance.",
              },
            ].map((ch) => (
              <div
                key={ch.num}
                className="grid gap-6 rounded-2xl border border-beige-300 bg-white p-6 sm:p-8 lg:grid-cols-[140px_1fr] shadow-xs"
              >
                <div>
                  <span className="font-mono text-[32px] sm:text-[40px] font-bold text-gold-500/80 leading-none">
                    {ch.num}
                  </span>
                  <span className="mt-1 block text-[11px] font-bold uppercase tracking-wider text-muted-grey">
                    {ch.era}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-[20px] sm:text-[22px] font-bold text-charcoal-900">
                    {ch.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted-grey">
                    {ch.text}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ivory-50 px-3 py-1.5 text-[12px] font-medium text-charcoal-800 border border-beige-200">
                    <CheckCircle2 className="h-4 w-4 text-gold-600 shrink-0" />
                    <span>{ch.takeaway}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Foundations - Light Theme */}
      <section className="bg-ivory-100/60 py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-700">Our Strategic Foundations</p>
            <h2 className="mt-2 font-serif text-[30px] sm:text-[40px] font-bold text-charcoal-900">
              The Seven Pillars of Avrelle Agro
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-muted-grey leading-relaxed">
              How we uphold traditional agro-heritage while delivering modern, certified, and traceable excellence.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Our Roots in Bihar",
                desc: "Direct operational base in Purnia, situated at the nexus of India's richest wetland makhana ecosystems.",
                icon: MapPin,
                image: null,
              },
              {
                title: "Commitment to Farmers",
                desc: "Direct procurement partnerships with wetland harvesters, ensuring origin traceability and fair economic returns.",
                icon: Users,
                image: null,
              },
              {
                title: "Processing & Capabilities",
                desc: "Integrated mechanical grading, sorting, and moisture-controlled packaging from raw harvests to shelf-stable packs.",
                icon: Factory,
                image: null,
              },
              {
                title: "Quality Philosophy",
                desc: "Stringent sizing benchmarks, zero chemical puffing, and moisture retention guarantees across all batches.",
                icon: ShieldCheck,
                image: null,
              },
              {
                title: "GI Authorized User Recognition",
                desc: `Proudly recognized as an Authorized User of Mithila Makhana (GI-696) under Certificate ${certNumber}.`,
                icon: Award,
                image: "/gitag.jpeg",
              },
              {
                title: "Vision for the Future",
                desc: "Positioning Mithila Makhana as a premier, sustainable global superfood across international specialty food markets.",
                icon: Target,
                image: null,
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-beige-300 bg-white p-6 shadow-xs transition-all hover:border-gold-500 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p.icon className="h-7 w-7 text-gold-600" />
                  {p.image && (
                    <img
                      src={p.image}
                      alt="Official Mithila Makhana GI Logo"
                      width={36}
                      height={40}
                      className="h-9 w-auto object-contain"
                    />
                  )}
                </div>
                <h3 className="mt-4 font-serif text-[18px] font-bold text-charcoal-900">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-grey">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Summary & Contact Callout */}
      <section className="py-16 sm:py-20">
        <div className="section-shell">
          <div className="rounded-3xl border border-beige-300 bg-white p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
            <h2 className="font-serif text-[26px] sm:text-[34px] font-bold text-charcoal-900">
              Partner With Avrelle Agro Products
            </h2>
            <p className="mt-3 text-[15px] text-muted-grey max-w-2xl mx-auto leading-relaxed">
              We welcome enquiries from wholesale distributors, private label food brands, international importers, and retail institutional buyers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/bulk-supply" className="btn-gold">
                Submit Wholesale Enquiry
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Corporate Office
              </Link>
            </div>
            <p className="mt-6 text-[12px] font-mono text-muted-grey">
              Registered Entity: {business.displayName} · Purnia, Bihar, India
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
