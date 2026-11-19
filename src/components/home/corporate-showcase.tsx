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
  Wheat, 
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Ship,
  Scale
} from "lucide-react";

export function CorporateShowcase() {
  return (
    <div className="space-y-16 py-12 sm:py-16 bg-ivory-50">
      {/* 1. Origin & Brand Introduction */}
      <section className="section-shell">
        <div className="rounded-2xl border border-beige-300 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-900">
                <MapPin className="h-3.5 w-3.5" />
                Origin Terroir · Kosi Belt · Purnea Hub
              </div>
              <h2 className="mt-3 font-serif text-[28px] text-forest-900 sm:text-[36px] leading-tight">
                Rooted in the Kosi Belt. Connected to the World.
              </h2>
              <span className="ornament-line mt-4 block" aria-hidden="true" />
              <p className="mt-5 text-[15px] leading-relaxed text-ink-700">
                The story of <strong>Avrelle Agro Products Private Limited</strong> begins in Purnea, Bihar—the vibrant epicenter of the Kosi region, where fertile alluvial plains and abundant waterways sustain the world\'s finest makhana cultivation. We directly source raw <strong>Guria seeds</strong> from prime growing belts across <strong>Kishanganj, Purnea, and Saharsa</strong> through our <strong>seven-district Farmer Producer Company (FPC) network</strong>.
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
                Our operations serve both domestic and global clients: offering consumer retail packs (100g to 1 kg), institutional wholesale consignments in 8 kg White PP bags with 100μ moisture liners, and container exports for overseas food brands.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/origin" className="btn-gold flex items-center gap-2">
                  Explore Our Origin &amp; Heritage <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/about" className="btn-outline">
                  About AVRELLE AGRO
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-beige-200 bg-ivory-100 p-3">
              <img
                src="/brand/makhana_hero.jpeg"
                alt="Harvesting, roasting and sorting authentic Mithila makhana"
                width={800}
                height={500}
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
              <div className="mt-3 flex items-center justify-between px-2 text-[12px] text-ink-500">
                <span>Mithila Makhana GI Tag Terroir</span>
                <span className="font-semibold text-gold-800">100% Naturally Popped</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Five Core Product Categories */}
      <section className="section-shell">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-eyebrow">Product Capabilities</p>
          <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[36px]">
            Comprehensive Makhana Portfolio
          </h2>
          <p className="mt-3 text-[15px] text-ink-600">
            From raw commodity nuts to calibrated suta grading and advanced food powder applications.
          </p>
          <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {/* Category A */}
          <div className="rounded-xl border border-beige-300 bg-white p-5 flex flex-col justify-between hover:border-gold-500/50 hover:shadow-md transition-all">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-forest-900/10 text-forest-900">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-[17px] font-bold text-forest-900">A. Raw Makhana</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-600 leading-snug">
                Naturally sun-dried and popped fox nuts in consumer packs (100g–1kg) &amp; bulk 8kg PP bags.
              </p>
            </div>
            <Link href="/products#raw-makhana" className="mt-4 text-[12px] font-semibold text-gold-800 hover:underline">
              View Specs →
            </Link>
          </div>

          {/* Category B */}
          <div className="rounded-xl border border-gold-500/40 bg-gold-50/30 p-5 flex flex-col justify-between hover:border-gold-500 hover:shadow-md transition-all">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-600 text-white">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-[17px] font-bold text-forest-900">B. Graded Makhana</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-600 leading-snug">
                Calibrated millimeter tiers: 3 Suta (~11–13mm), 4 Suta, 5 Suta, 6+ Suta &amp; Thurri.
              </p>
            </div>
            <Link href="/products#graded-makhana" className="mt-4 text-[12px] font-semibold text-gold-800 hover:underline">
              View Grades →
            </Link>
          </div>

          {/* Category C */}
          <div className="rounded-xl border border-beige-300 bg-white p-5 flex flex-col justify-between hover:border-gold-500/50 hover:shadow-md transition-all">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-forest-900/10 text-forest-900">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-[17px] font-bold text-forest-900">C. Roasted Makhana</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-600 leading-snug">
                Slow hot-air roasted with cold-pressed oils or desi ghee to sub-3% moisture for enduring crunch.
              </p>
            </div>
            <Link href="/products#roasted-makhana" className="mt-4 text-[12px] font-semibold text-gold-800 hover:underline">
              View Roasting →
            </Link>
          </div>

          {/* Category D */}
          <div className="rounded-xl border border-beige-300 bg-white p-5 flex flex-col justify-between hover:border-gold-500/50 hover:shadow-md transition-all">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-forest-900/10 text-forest-900">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-[17px] font-bold text-forest-900">D. Flavoured Makhana</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-600 leading-snug">
                Crafted with balanced seasonings and natural spices—ranging from classic Indian masalas to global savory and herb blends.
              </p>
            </div>
            <Link href="/products#flavoured-makhana" className="mt-4 text-[12px] font-semibold text-gold-800 hover:underline">
              View Flavours →
            </Link>
          </div>

          {/* Category E */}
          <div className="rounded-xl border border-beige-300 bg-white p-5 flex flex-col justify-between hover:border-gold-500/50 hover:shadow-md transition-all">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-forest-900/10 text-forest-900">
                <Wheat className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-[17px] font-bold text-forest-900">E. Makhana Powder</h3>
              <p className="mt-1.5 text-[12.5px] text-ink-600 leading-snug">
                60–80 mesh pure fox nut flour for gluten-free baking, baby foods, protein shakes &amp; pharma.
              </p>
            </div>
            <Link href="/products#makhana-powder" className="mt-4 text-[12px] font-semibold text-gold-800 hover:underline">
              View Applications →
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/products" className="btn-outline">
            Explore Complete Technical Portfolio →
          </Link>
        </div>
      </section>

      {/* 3. Manufacturing & Quality Assurance Snapshot */}
      <section className="section-shell">
        <div className="rounded-2xl border border-beige-300 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-forest-900/20 bg-forest-900/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest-900">
                <Factory className="h-3.5 w-3.5" />
                Agro-Processing &amp; Food Safety
              </div>
              <h2 className="mt-3 font-serif text-[28px] text-forest-900 sm:text-[36px] leading-tight">
                Hygienic 10-Stage Processing &amp; Multi-Deck Mechanical Grading
              </h2>
              <span className="ornament-line mt-4 block" aria-hidden="true" />
              <p className="mt-5 text-[15px] leading-relaxed text-ink-700">
                Every consignment entering our Purnia facility undergoes digital moisture screening, pneumatic dust extraction, circular vibratory sieving, and optical defect elimination.
              </p>

              <div className="mt-6 space-y-2.5 text-[13.5px] text-ink-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                  <span><strong>Food-Grade Contact Surfaces:</strong> All sorting conveyors and packaging chutes use certified SS304 stainless steel.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                  <span><strong>Nitrogen-Flush Technology:</strong> Replaces atmospheric oxygen to prevent oil oxidation and ensure lasting crunch.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                  <span><strong>Batch Traceability:</strong> Unique lot identifiers connect finished packaging to primary wetland aggregation logs.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/manufacturing" className="btn-gold">
                  View 10-Stage Processing Journey
                </Link>
                <Link href="/quality-assurance" className="btn-outline">
                  Food Safety Protocols
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-beige-300 bg-ivory-50 p-6 space-y-4">
              <h3 className="font-serif text-[18px] font-bold text-forest-900 border-b border-beige-200 pb-2.5">
                Statutory Compliance &amp; Standards
              </h3>
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div className="rounded-lg bg-white p-3 border border-beige-200">
                  <span className="text-ink-400 text-[11px] uppercase font-semibold block">Food Safety</span>
                  <strong className="text-forest-900 text-[14px]">FSSAI Registered</strong>
                  <p className="text-[11.5px] text-ink-500 mt-0.5">FBO licensing framework</p>
                </div>
                <div className="rounded-lg bg-white p-3 border border-beige-200">
                  <span className="text-ink-400 text-[11px] uppercase font-semibold block">Tax &amp; Corporate</span>
                  <strong className="text-forest-900 text-[14px]">GSTIN Registered</strong>
                  <p className="text-[11.5px] text-ink-500 mt-0.5">HSN Code 19041010</p>
                </div>
                <div className="rounded-lg bg-white p-3 border border-beige-200">
                  <span className="text-ink-400 text-[11px] uppercase font-semibold block">Global Trade</span>
                  <strong className="text-forest-900 text-[14px]">IEC Code Authorized</strong>
                  <p className="text-[11.5px] text-ink-500 mt-0.5">DGFT Export License</p>
                </div>
                <div className="rounded-lg bg-white p-3 border border-beige-200">
                  <span className="text-ink-400 text-[11px] uppercase font-semibold block">Terroir Protection</span>
                  <strong className="text-forest-900 text-[14px]">Mithila GI Tag</strong>
                  <p className="text-[11.5px] text-ink-500 mt-0.5">Geographical Indication</p>
                </div>
              </div>

              <div className="pt-2 text-right">
                <Link href="/certifications" className="text-[12.5px] font-semibold text-gold-800 hover:underline">
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
          <div className="rounded-2xl border border-beige-300 bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded bg-gold-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-900">
                <Scale className="h-3.5 w-3.5" /> Domestic B2B Wholesale
              </div>
              <h3 className="mt-3 font-serif text-[26px] text-forest-900 sm:text-[30px]">
                Bulk Supply Direct from Purnea
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
                Standard 8 kg White PP bags with 100μ LDPE liner across 8 verified commercial tiers. Serving national dry fruit wholesalers, supermarket chains, and FMCG snack processors.
              </p>
              <ul className="mt-5 space-y-2 text-[13.5px] text-ink-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-forest-700" />
                  <span>Official rate quotation Ref: AVA/QTN/2026/038</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-forest-700" />
                  <span>Standardized 8 kg net moisture-barrier bags</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-forest-700" />
                  <span>Prompt Ex-Purnea truckload freight coordination</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-beige-200">
              <Link href="/bulk-supply" className="btn-gold w-full text-center">
                Explore Wholesale Rate Card &amp; RFQ
              </Link>
            </div>
          </div>

          {/* Channel 2: Global Exports */}
          <div className="relative overflow-hidden rounded-2xl bg-forest-900 p-8 text-ivory-100 botanical-grid sm:p-10 flex flex-col justify-between">
            <div className="pointer-events-none absolute inset-4 border border-gold-500/20" aria-hidden="true" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded bg-gold-500/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-300 border border-gold-500/40">
                <Ship className="h-3.5 w-3.5" /> Global Maritime Exports
              </div>
              <h3 className="mt-3 font-serif text-[26px] text-ivory-50 sm:text-[30px]">
                International Container Shipping
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ivory-100/85">
                Supplying international food importers, specialty retail brands, and food manufacturers with 20ft / 40ft FCL container freight via Kolkata and Haldia seaports.
              </p>
              <ul className="mt-5 space-y-2 text-[13.5px] text-ivory-100/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold-400" />
                  <span>Incoterms: FOB Kolkata/Haldia, CIF, CFR, Ex-Works</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold-400" />
                  <span>Phytosanitary &amp; ISPM-15 palletized export packing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold-400" />
                  <span>Full trade documentation: COO, COA, B/L, Fumigation</span>
                </li>
              </ul>
            </div>

            <div className="relative mt-8 pt-4 border-t border-ivory-100/15">
              <Link href="/exports" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 w-full text-center">
                Access International Export Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

