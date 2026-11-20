import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Factory, 
  ShieldCheck, 
  Users, 
  Globe, 
  Package, 
  Layers, 
  Flame, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Ship,
  Scale
} from "lucide-react";

export function CorporateShowcase() {
  return (
    <div className="space-y-12 sm:space-y-16 py-10 sm:py-16 bg-ivory-50">
      {/* 1. Origin & Brand Introduction */}
      <section className="section-shell">
        <div className="rounded-xl sm:rounded-2xl border border-beige-300 bg-white p-4 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-50 px-3 py-1 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-gold-900">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Origin Terroir · Kosi Belt · Purnea Hub</span>
              </div>
              <h2 className="mt-3 font-serif text-[24px] xs:text-[26px] sm:text-[34px] font-bold text-forest-900 leading-tight break-words">
                Rooted in the Kosi Belt. Connected to the World.
              </h2>
              <span className="ornament-line mt-3 sm:mt-4 block" aria-hidden="true" />
              <p className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] leading-relaxed text-ink-700 font-light">
                The story of <strong>Avrelle Agro Products Private Limited</strong> begins in Purnea, Bihar—the vibrant epicenter of the Kosi region, where fertile alluvial plains and abundant waterways sustain the world&apos;s finest makhana cultivation. We directly source raw <strong>Guria seeds</strong> from prime growing belts across <strong>Kishanganj, Purnea, and Saharsa</strong> through our <strong>seven-district Farmer Producer Company (FPC) network</strong>.
              </p>
              <p className="mt-3 text-[13.5px] sm:text-[14.5px] leading-relaxed text-ink-600 font-light">
                Combining grassroots farmer partnerships with hygienic precision processing in Purnea, every batch reflects the purity of Bihar&apos;s wetlands, ethical sourcing, and complete origin traceability.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link href="/origin" className="btn-gold flex items-center justify-center gap-2 !py-2.5 sm:!py-3 text-[12.5px] w-full sm:w-auto">
                  <span>Explore Sourcing Journey</span> <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
                <Link href="/about" className="btn-outline flex items-center justify-center !py-2.5 sm:!py-3 text-[12.5px] w-full sm:w-auto">
                  About AVRELLE AGRO
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-beige-200 bg-ivory-100 p-2 sm:p-3">
              <img
                src="/brand/makhana_hero.jpeg"
                alt="Harvesting, roasting and sorting authentic Mithila makhana"
                width={800}
                height={500}
                className="w-full rounded-md sm:rounded-lg object-cover aspect-[4/3]"
              />
              <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] sm:text-[12px] text-ink-500">
                <span>Mithila Makhana GI Tag Terroir</span>
                <span className="font-semibold text-gold-800">100% Naturally Popped</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Core Product Categories */}
      <section className="section-shell">
        <div className="max-w-2xl mx-auto text-center px-1">
          <p className="text-eyebrow">Product Capabilities</p>
          <h2 className="mt-2 font-serif text-[24px] xs:text-[26px] sm:text-[34px] font-bold text-forest-900 break-words">
            Comprehensive Makhana Portfolio
          </h2>
          <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-ink-600 font-light">
            From raw commodity nuts to calibrated suta grading and specialty roasted and flavoured lines.
          </p>
          <span className="ornament-line mt-3 block mx-auto" aria-hidden="true" />
        </div>

        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Category A */}
          <div className="rounded-xl border border-beige-300 bg-white p-4 sm:p-5 flex flex-col justify-between hover:border-gold-500/50 hover:shadow-md transition-all">
            <div>
              <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-forest-900/10 text-forest-900">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-[17px] font-bold text-forest-900">1. Raw Makhana</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-600 leading-relaxed font-light">
                Naturally sun-dried and popped fox nuts in consumer packs (100g–1kg) &amp; bulk 8kg PP bags.
              </p>
            </div>
            <Link href="/products#raw-makhana" className="mt-4 text-[12px] font-semibold text-gold-800 hover:underline">
              View Specs →
            </Link>
          </div>

          {/* Category B */}
          <div className="rounded-xl border border-gold-500/40 bg-gold-50/30 p-4 sm:p-5 flex flex-col justify-between hover:border-gold-500 hover:shadow-md transition-all">
            <div>
              <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gold-600 text-white">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-[17px] font-bold text-forest-900">2. Graded Makhana</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-600 leading-relaxed font-light">
                Calibrated millimeter tiers: 4 Suta (~13–16mm), 5 Suta, and 6+ Suta Jumbo varieties.
              </p>
            </div>
            <Link href="/products#graded-makhana" className="mt-4 text-[12px] font-semibold text-gold-800 hover:underline">
              View Grades →
            </Link>
          </div>

          {/* Category C */}
          <div className="rounded-xl border border-beige-300 bg-white p-4 sm:p-5 flex flex-col justify-between hover:border-gold-500/50 hover:shadow-md transition-all">
            <div>
              <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-forest-900/10 text-forest-900">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-[17px] font-bold text-forest-900">3. Roasted Makhana</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-600 leading-relaxed font-light">
                Slow hot-air roasted to sub-3% moisture for enduring crunch without artificial preservatives.
              </p>
            </div>
            <Link href="/products#roasted-makhana" className="mt-4 text-[12px] font-semibold text-gold-800 hover:underline">
              View Roasting →
            </Link>
          </div>

          {/* Category D */}
          <div className="rounded-xl border border-beige-300 bg-white p-4 sm:p-5 flex flex-col justify-between hover:border-gold-500/50 hover:shadow-md transition-all">
            <div>
              <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-forest-900/10 text-forest-900">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-[17px] font-bold text-forest-900">4. Flavoured Makhana</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-600 leading-relaxed font-light">
                Crafted with balanced seasonings and natural spices—ranging from classic masalas to savory herbs.
              </p>
            </div>
            <Link href="/products#flavoured-makhana" className="mt-4 text-[12px] font-semibold text-gold-800 hover:underline">
              View Formulations →
            </Link>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <Link href="/products" className="btn-outline w-full sm:w-auto text-[12.5px]">
            Explore Complete Technical Portfolio →
          </Link>
        </div>
      </section>

      {/* 3. Manufacturing & Quality Assurance Snapshot */}
      <section className="section-shell">
        <div className="rounded-xl sm:rounded-2xl border border-beige-300 bg-white p-4 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-forest-900/20 bg-forest-900/5 px-3 py-1 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-forest-900">
                <Factory className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Agro-Processing &amp; Food Safety</span>
              </div>
              <h2 className="mt-3 font-serif text-[24px] xs:text-[26px] sm:text-[34px] font-bold text-forest-900 leading-tight break-words">
                Uncompromising Quality, From Wetland to Pack
              </h2>
              <span className="ornament-line mt-3 sm:mt-4 block" aria-hidden="true" />
              <p className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] leading-relaxed text-ink-700 font-light">
                Every batch entering our Purnia facility undergoes our 5-stage quality protocol: Guria seed grading, precision thermal roasting, optical &amp; manual defect elimination, digital moisture verification, and barrier-protected packaging.
              </p>

              <div className="mt-5 space-y-2.5 text-[13px] sm:text-[13.5px] text-ink-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                  <span><strong>Food-Grade SS304 Surfaces:</strong> Certified sanitary contact surfaces with zero chemical whitening agents.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                  <span><strong>Moisture Verification:</strong> Controlled to sub-3% for roasted and sub-9.5% for raw phool to ensure lasting crunch.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                  <span><strong>Batch Traceability:</strong> Machine-readable lot identifiers connect finished packaging to primary FPC aggregation logs.</span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link href="/quality-assurance" className="btn-gold flex items-center justify-center !py-2.5 sm:!py-3 text-[12.5px] w-full sm:w-auto">
                  View 5-Stage Protocol
                </Link>
                <Link href="/manufacturing" className="btn-outline flex items-center justify-center !py-2.5 sm:!py-3 text-[12.5px] w-full sm:w-auto">
                  Purnia Facility Journey
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-beige-300 bg-ivory-50 p-4 sm:p-6 space-y-3.5 sm:space-y-4">
              <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-forest-900 border-b border-beige-200 pb-2.5">
                Statutory Compliance &amp; Standards
              </h3>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-[12px] sm:text-[13px]">
                <div className="rounded-lg bg-white p-2.5 sm:p-3 border border-beige-200">
                  <span className="text-ink-400 text-[10px] sm:text-[11px] uppercase font-semibold block">Food Safety</span>
                  <strong className="text-forest-900 text-[13px] sm:text-[14px] block mt-0.5">FSSAI Registered</strong>
                  <p className="text-[11px] text-ink-500 mt-0.5">FBO licensing framework</p>
                </div>
                <div className="rounded-lg bg-white p-2.5 sm:p-3 border border-beige-200">
                  <span className="text-ink-400 text-[10px] sm:text-[11px] uppercase font-semibold block">Tax &amp; Corporate</span>
                  <strong className="text-forest-900 text-[13px] sm:text-[14px] block mt-0.5">GSTIN Registered</strong>
                  <p className="text-[11px] text-ink-500 mt-0.5">HSN Code 19041010</p>
                </div>
                <div className="rounded-lg bg-white p-2.5 sm:p-3 border border-beige-200">
                  <span className="text-ink-400 text-[10px] sm:text-[11px] uppercase font-semibold block">Global Trade</span>
                  <strong className="text-forest-900 text-[13px] sm:text-[14px] block mt-0.5">IEC Authorized</strong>
                  <p className="text-[11px] text-ink-500 mt-0.5">DGFT Export License</p>
                </div>
                <div className="rounded-lg bg-white p-2.5 sm:p-3 border border-beige-200">
                  <span className="text-ink-400 text-[10px] sm:text-[11px] uppercase font-semibold block">Terroir Protection</span>
                  <strong className="text-forest-900 text-[13px] sm:text-[14px] block mt-0.5">GI-696 User</strong>
                  <p className="text-[11px] text-ink-500 mt-0.5">AU/48155/GI/696/76</p>
                </div>
              </div>

              <div className="pt-2 text-right">
                <Link href="/certifications" className="text-[12px] sm:text-[12.5px] font-semibold text-gold-800 hover:underline">
                  View Full Compliance Framework →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dual Commercial Channels: Domestic Wholesale & Global Exports */}
      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Channel 1: Domestic Wholesale */}
          <div className="rounded-xl sm:rounded-2xl border border-beige-300 bg-white p-5 sm:p-8 lg:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded bg-gold-100 px-2.5 py-0.5 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-gold-900">
                <Scale className="h-3.5 w-3.5" /> Domestic B2B Wholesale
              </div>
              <h3 className="mt-3 font-serif text-[22px] xs:text-[24px] sm:text-[30px] font-bold text-forest-900 leading-tight">
                Bulk Supply Direct from Purnea
              </h3>
              <p className="mt-2.5 sm:mt-3 text-[13.5px] sm:text-[14.5px] leading-relaxed text-ink-600 font-light">
                Standard 8 kg White PP bags with 100μ LDPE liner across verified commercial tiers. Serving national dry fruit wholesalers, supermarket chains, and FMCG processors.
              </p>
              <ul className="mt-4 sm:mt-5 space-y-2 text-[12.5px] sm:text-[13.5px] text-ink-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0" />
                  <span>Standardized 8 kg net moisture-barrier bags</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0" />
                  <span>Direct mandi price discovery from Kosi region</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0" />
                  <span>Prompt Ex-Purnea truckload freight coordination</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-beige-200">
              <Link href="/bulk-supply" className="btn-gold w-full text-center !py-2.5 sm:!py-3 text-[12.5px]">
                Explore Wholesale Rate Card &amp; RFQ
              </Link>
            </div>
          </div>

          {/* Channel 2: Global Exports */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-forest-900 p-5 sm:p-8 lg:p-10 text-ivory-100 botanical-grid flex flex-col justify-between">
            <div className="pointer-events-none absolute inset-2 sm:inset-4 border border-gold-500/20" aria-hidden="true" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded bg-gold-500/20 px-2.5 py-0.5 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-gold-300 border border-gold-500/40">
                <Ship className="h-3.5 w-3.5" /> Global Maritime Exports
              </div>
              <h3 className="mt-3 font-serif text-[22px] xs:text-[24px] sm:text-[30px] font-bold text-ivory-50 leading-tight">
                International Container Shipping
              </h3>
              <p className="mt-2.5 sm:mt-3 text-[13.5px] sm:text-[14.5px] leading-relaxed text-ivory-100/85 font-light">
                Supplying international food importers, specialty retail brands, and food manufacturers with 20ft / 40ft FCL container freight via Kolkata and Haldia seaports.
              </p>
              <ul className="mt-4 sm:mt-5 space-y-2 text-[12.5px] sm:text-[13.5px] text-ivory-100/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0" />
                  <span>Incoterms: FOB Kolkata/Haldia, CIF, CFR, Ex-Works</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0" />
                  <span>Phytosanitary &amp; ISPM-15 palletized export packing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0" />
                  <span>Full trade documentation: COO, COA, B/L, Fumigation</span>
                </li>
              </ul>
            </div>

            <div className="relative mt-6 sm:mt-8 pt-4 border-t border-ivory-100/15">
              <Link href="/exports" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 w-full text-center !py-2.5 sm:!py-3 text-[12.5px]">
                Access International Export Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
