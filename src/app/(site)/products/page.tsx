import type { Metadata } from "next";
import Link from "next/link";
import { 
  Package, 
  Layers, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingBag,
  Building2,
  Award,
  Info,
  Scale
} from "lucide-react";
import { GIBadge } from "@/components/site/gi-badge";

export const metadata: Metadata = {
  title: "Our Products — Pure, Versatile, and Crafted to Perfection | AVRELLE AGRO",
  description:
    "Explore Avrelle Agro's complete makhana portfolio across 4 primary categories: Raw Makhana, Graded Makhana (4 Suta to 6 Suta+), Roasted Makhana, and Flavoured Makhana. Sourced from Guria seeds in Purnea, Bihar.",
  keywords: [
    "Makhana product range",
    "Raw makhana Bihar",
    "Graded makhana 4 5 6 Suta",
    "Roasted makhana",
    "Flavoured makhana",
    "Purnea fox nuts",
    "Mithila Makhana GI-696",
  ],
};

const PRODUCT_CATEGORIES = [
  {
    id: "raw-makhana",
    number: "01",
    title: "Raw Makhana",
    lead: "Pure, unroasted, and naturally harvested fox nuts straight from the wetlands of Bihar. Retaining their authentic texture and nutritional integrity, our raw makhana serves as an ideal base for culinary preparations, traditional recipes, and further value-added processing.",
    badge: "Core Agricultural Harvest",
    packSizes: ["100g Pocket Pack", "200g Daily Pack", "400g Family Pack", "500g Pantry Pack", "1 kg Mega Saver", "8 kg Wholesale PP Bag"],
    specs: [
      { label: "Origin", value: "Wetlands of Kishanganj, Purnea & Saharsa, Bihar" },
      { label: "Moisture Content", value: "< 9.5% (Max 10%)" },
      { label: "Processing", value: "Sun-dried, sand-popped, Sortex-cleaned" },
      { label: "Additives", value: "100% Pure & Natural · Zero Chemical Bleaching" },
    ],
    image: "/brand/500g.png",
    alt: "Raw natural white makhana retail pack from Purnea, Bihar",
    retailLink: "/shop",
    retailText: "Buy Retail Packs (100g – 1 kg)",
    bulkLink: "/bulk-supply",
    bulkText: "Bulk 8kg PP Enquiry",
  },
  {
    id: "graded-makhana",
    number: "02",
    title: "Graded Makhana",
    lead: "Precision-sorted by size, whiteness, and density to meet exact commercial and export specifications. From standard commercial grades to uniform, bold jumbo Suta varieties (4 Suta to 6 Suta+), our graded lots guarantee consistency, minimal breakage, and superior visual appeal.",
    badge: "Export & Commercial Grading",
    grades: [
      {
        name: "6+ Suta (Jumbo Bold)",
        size: "~19 – 24 mm",
        desc: "The largest, most premium grade — exceptional size for luxury retail shelves, temple offerings, and premium gifting.",
        image: "/brand/grades/6-suta.png",
      },
      {
        name: "5 Suta (Premium Plus)",
        size: "~16 – 19 mm",
        desc: "Large, uniform nuts favored for everyday premium snacking, gourmet roasting, and brand-name private labeling.",
        image: "/brand/grades/5-suta.png",
      },
      {
        name: "4 Suta (Standard Plus)",
        size: "~13 – 16 mm",
        desc: "Balanced mid-size grade for curries, kheer, confectionery mixes, and high-volume commercial food preparation.",
        image: "/brand/grades/4-suta.png",
      },
    ],
    packSizes: ["Available in 500g & 1 kg Retail Packs", "8 kg Master Commercial PP Bags"],
    image: "/brand/grades/size.jpeg",
    alt: "Side-by-side photographic comparison of 4 Suta, 5 Suta, and 6+ Suta makhana grades",
    retailLink: "/shop",
    retailText: "Shop Graded Retail Packs",
    bulkLink: "/bulk-supply",
    bulkText: "Request Graded Lot Quotation",
  },
  {
    id: "roasted-makhana",
    number: "03",
    title: "Roasted Makhana",
    lead: "Slow-roasted to achieve a light, airy crunch without losing its delicate, nutty flavor. Free from artificial preservatives, our plain roasted makhana offers a clean, wholesome, and ready-to-eat snack for everyday mindful munching.",
    badge: "Ready-to-Eat Snacking",
    packSizes: ["100g Trial Pouch", "200g Snack Pack", "Custom Private-Label Packaging for B2B"],
    specs: [
      { label: "Texture", value: "Light, ultra-crisp & airy crunch" },
      { label: "Moisture Content", value: "< 3.0% (Controlled for maximum crispness)" },
      { label: "Ingredients", value: "Phool Makhana (Plain dry-roasted or light cold-pressed oil)" },
      { label: "Preservatives", value: "Zero artificial preservatives or trans fats" },
    ],
    image: "/brand/100g.png",
    alt: "Crisp golden roasted makhana ready-to-eat snack pouch",
    retailLink: "/shop",
    retailText: "Browse Roasted Selection",
    bulkLink: "/bulk-supply",
    bulkText: "Inquire for Private Label Roasting",
  },
  {
    id: "flavoured-makhana",
    number: "04",
    title: "Flavoured Makhana",
    lead: "A contemporary twist on an ancient superfood. Crafted using carefully balanced seasonings and natural spices—ranging from classic Indian masalas to global savory and herb blends—our flavoured makhana delivers bold taste and guilt-free indulgence in every bite.",
    badge: "Specialty Seasonings & B2B Formulations",
    flavorProfiles: [
      {
        profile: "Classic Indian Masala Blends",
        desc: "Spiced with authentic regional spices, roasted cumin, and black salt for traditional savory indulgence.",
      },
      {
        profile: "Global Savory & Herb Formulations",
        desc: "Crafted with aromatic Mediterranean herbs, sea salt, cracked black pepper, and tangy savory notes.",
      },
      {
        profile: "Custom Client Flavor Co-Development",
        desc: "Bespoke seasoning formulation, oil-spray coating, and private packaging available for institutional brand partners.",
      },
    ],
    packSizes: ["Customized retail pouches and bulk institutional bins upon client specification."],
    note: "Specific flavour varieties, seasonings, and custom blends are developed and manufactured upon client contract. Contact our commercial team for customized product development.",
    image: "/brand/200g.png",
    alt: "Premium gourmet flavoured makhana concept packaging",
    retailLink: "/shop",
    retailText: "View Current Shop Offerings",
    bulkLink: "/contact",
    bulkText: "Discuss Custom Flavor Development",
  },
];

export default function ProductsPage() {
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
              <li className="text-gold-300 font-medium">Portfolio</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">Our Products</li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
              <Package className="h-3.5 w-3.5 text-gold-400" />
              <span>Complete Portfolio · 4 Categories</span>
            </div>
            <GIBadge variant="compact" />
          </div>

          <h1 className="mt-5 max-w-4xl font-serif text-[34px] sm:text-[48px] lg:text-[54px] font-bold leading-tight text-ivory-50">
            Pure, Versatile, and Crafted to Perfection:<br />
            <span className="text-gold-400 font-normal">Our Product Range.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-[15.5px] sm:text-[17px] leading-relaxed text-ivory-100/90 font-light">
            Sourced from the finest <strong className="font-semibold text-gold-300">Guria seeds</strong> of the Kosi belt and processed under strict quality controls in Purnea, <strong className="font-semibold text-ivory-50">Avrelle Agro</strong> offers a complete portfolio of makhana tailored for retail consumers, bulk buyers, and global export markets.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-gold flex items-center gap-2 text-[13px]">
              <ShoppingBag className="h-4 w-4" /> <span>Shop Retail Packs</span>
            </Link>
            <Link href="/bulk-supply" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px]">
              <Building2 className="h-4 w-4" /> <span>B2B Wholesale Inquiries</span>
            </Link>
            <Link href="/grades" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px]">
              <span>Grade Standards (Suta Scale)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Distinct Product Categories Showcase */}
      <section className="py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell space-y-20">

          {/* Category 1: Raw Makhana */}
          <div id="raw-makhana" className="rounded-2xl border border-beige-300 bg-white p-6 sm:p-10 shadow-sm transition-shadow hover:shadow-md">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-700">
                  <span className="rounded bg-gold-500/10 px-2 py-0.5 border border-gold-500/20">Category 01</span>
                  <span>Core Agricultural Commodity</span>
                </div>
                <h2 className="mt-3 font-serif text-[28px] sm:text-[36px] font-bold text-forest-950">
                  Raw Makhana
                </h2>
                <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-700 font-light">
                  Pure, unroasted, and naturally harvested fox nuts straight from the wetlands of Bihar. Retaining their authentic texture and nutritional integrity, our raw makhana serves as an ideal base for culinary preparations, traditional recipes, and further value-added processing.
                </p>

                {/* Technical Specifications */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-beige-200 pt-5 text-[13px]">
                  {PRODUCT_CATEGORIES[0].specs?.map((s, i) => (
                    <div key={i} className="rounded bg-ivory-50 p-3 border border-beige-200">
                      <span className="text-[10.5px] uppercase font-semibold text-ink-500 block">{s.label}</span>
                      <span className="font-medium text-forest-950 block mt-0.5">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Available Pack Sizes */}
                <div className="mt-5">
                  <p className="text-[11.5px] font-bold uppercase tracking-wider text-forest-900 mb-2">Available Pack Sizes:</p>
                  <div className="flex flex-wrap gap-2 text-[11.5px]">
                    {PRODUCT_CATEGORIES[0].packSizes.map((p, i) => (
                      <span key={i} className="rounded border border-beige-300 bg-ivory-100 px-2.5 py-1 text-ink-700 font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/shop" className="btn-primary text-[13px] flex items-center gap-1.5">
                    <ShoppingBag className="h-4 w-4" /> Buy Retail Packs (100g – 1 kg)
                  </Link>
                  <Link href="/bulk-supply" className="btn-outline text-[13px] flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" /> Bulk 8kg PP Bag Enquiry
                  </Link>
                </div>
              </div>

              {/* Product Visual */}
              <div className="rounded-xl border border-beige-200 bg-ivory-50 p-6 flex flex-col items-center justify-center text-center">
                <img
                  src="/brand/500g.png"
                  alt="Raw white natural makhana 500g pantry pack"
                  className="max-h-72 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
                <div className="mt-4 pt-3 border-t border-beige-200 w-full flex items-center justify-between text-[11px] font-mono text-ink-500">
                  <span>100% Naturally Harvested</span>
                  <span className="text-gold-700 font-semibold">Purnea, Bihar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category 2: Graded Makhana */}
          <div id="graded-makhana" className="rounded-2xl border-2 border-gold-500/40 bg-gradient-to-br from-ivory-50 via-white to-ivory-50 p-6 sm:p-10 shadow-sm transition-shadow hover:shadow-md">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-700">
                <span className="rounded bg-gold-500/20 px-2 py-0.5 border border-gold-500/30">Category 02</span>
                <span>Commercial &amp; Jumbo Suta Standards</span>
              </div>
              <h2 className="mt-3 font-serif text-[28px] sm:text-[36px] font-bold text-forest-950">
                Graded Makhana (4 Suta to 6 Suta+)
              </h2>
              <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-700 font-light max-w-4xl">
                Precision-sorted by size, whiteness, and density to meet exact commercial and export specifications. From standard commercial grades to uniform, bold jumbo Suta varieties (4 Suta to 6 Suta+), our graded lots guarantee consistency, minimal breakage, and superior visual appeal.
              </p>

              {/* 3-Column Grade Comparison Cards */}
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {PRODUCT_CATEGORIES[1].grades?.map((g, idx) => (
                  <div key={idx} className="rounded-xl border border-beige-300 bg-white p-5 flex flex-col justify-between shadow-xs hover:border-gold-500 transition-all">
                    <div>
                      <div className="aspect-square w-full rounded-lg bg-ivory-50 overflow-hidden flex items-center justify-center p-3 border border-beige-200 mb-3">
                        <img
                          src={g.image}
                          alt={g.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between border-b border-beige-200 pb-2">
                        <h4 className="font-serif text-[17px] font-bold text-forest-950">{g.name}</h4>
                        <span className="font-mono text-[11.5px] font-bold text-gold-700 bg-gold-500/10 px-2 py-0.5 rounded">
                          {g.size}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[12.5px] text-ink-600 leading-relaxed font-light">
                        {g.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scale Guide Banner */}
              <div className="mt-8 rounded-xl border border-beige-300 bg-white p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Scale className="h-6 w-6 text-gold-600 shrink-0" />
                  <div>
                    <h5 className="font-serif text-[16px] font-bold text-forest-950">
                      Photographic Scale Calibration Reference
                    </h5>
                    <p className="text-[12px] text-ink-500">
                      Inspect our photographic millimeter diameter scale across all standard commercial suta classifications.
                    </p>
                  </div>
                </div>
                <Link href="/grades" className="btn-outline btn-sm shrink-0 whitespace-nowrap">
                  Explore Grade Specifications &rarr;
                </Link>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className="btn-primary text-[13px] flex items-center gap-1.5">
                  <ShoppingBag className="h-4 w-4" /> Shop Graded Packs
                </Link>
                <Link href="/bulk-supply" className="btn-outline text-[13px] flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" /> Inquire for Bulk Graded Lots
                </Link>
              </div>
            </div>
          </div>

          {/* Category 3: Roasted Makhana */}
          <div id="roasted-makhana" className="rounded-2xl border border-beige-300 bg-white p-6 sm:p-10 shadow-sm transition-shadow hover:shadow-md">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-700">
                  <span className="rounded bg-gold-500/10 px-2 py-0.5 border border-gold-500/20">Category 03</span>
                  <span>Ready-to-Eat Crunch</span>
                </div>
                <h2 className="mt-3 font-serif text-[28px] sm:text-[36px] font-bold text-forest-950">
                  Roasted Makhana
                </h2>
                <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-700 font-light">
                  Slow-roasted to achieve a light, airy crunch without losing its delicate, nutty flavor. Free from artificial preservatives, our plain roasted makhana offers a clean, wholesome, and ready-to-eat snack for everyday mindful munching.
                </p>

                {/* Technical Specifications */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-beige-200 pt-5 text-[13px]">
                  {PRODUCT_CATEGORIES[2].specs?.map((s, i) => (
                    <div key={i} className="rounded bg-ivory-50 p-3 border border-beige-200">
                      <span className="text-[10.5px] uppercase font-semibold text-ink-500 block">{s.label}</span>
                      <span className="font-medium text-forest-950 block mt-0.5">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Available Pack Sizes */}
                <div className="mt-5">
                  <p className="text-[11.5px] font-bold uppercase tracking-wider text-forest-900 mb-2">Available Formats:</p>
                  <div className="flex flex-wrap gap-2 text-[11.5px]">
                    {PRODUCT_CATEGORIES[2].packSizes.map((p, i) => (
                      <span key={i} className="rounded border border-beige-300 bg-ivory-100 px-2.5 py-1 text-ink-700 font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/shop" className="btn-primary text-[13px] flex items-center gap-1.5">
                    <ShoppingBag className="h-4 w-4" /> Browse Roasted Selection
                  </Link>
                  <Link href="/bulk-supply" className="btn-outline text-[13px] flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" /> Wholesale Roasted Enquiries
                  </Link>
                </div>
              </div>

              {/* Product Visual */}
              <div className="rounded-xl border border-beige-200 bg-ivory-50 p-6 flex flex-col items-center justify-center text-center">
                <img
                  src="/brand/100g.png"
                  alt="Slow roasted golden makhana trial pocket pack"
                  className="max-h-72 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
                <div className="mt-4 pt-3 border-t border-beige-200 w-full flex items-center justify-between text-[11px] font-mono text-ink-500">
                  <span>Slow Hot-Air Roasted</span>
                  <span className="text-gold-700 font-semibold">&lt; 3.0% Moisture</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category 4: Flavoured Makhana */}
          <div id="flavoured-makhana" className="rounded-2xl border border-beige-300 bg-white p-6 sm:p-10 shadow-sm transition-shadow hover:shadow-md">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-700">
                <span className="rounded bg-gold-500/10 px-2 py-0.5 border border-gold-500/20">Category 04</span>
                <span>Specialty Seasonings &amp; Custom Blends</span>
              </div>
              <h2 className="mt-3 font-serif text-[28px] sm:text-[36px] font-bold text-forest-950">
                Flavoured Makhana
              </h2>
              <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-700 font-light max-w-4xl">
                A contemporary twist on an ancient superfood. Crafted using carefully balanced seasonings and natural spices—ranging from classic Indian masalas to global savory and herb blends—our flavoured makhana delivers bold taste and guilt-free indulgence in every bite.
              </p>

              {/* Flavor Profile Concepts */}
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {PRODUCT_CATEGORIES[3].flavorProfiles?.map((fp, idx) => (
                  <div key={idx} className="rounded-xl border border-beige-300 bg-ivory-50/70 p-5 shadow-xs">
                    <span className="font-mono text-[11px] font-bold text-gold-700 uppercase block mb-1">
                      Blend Profile 0{idx + 1}
                    </span>
                    <h4 className="font-serif text-[17px] font-bold text-forest-950">
                      {fp.profile}
                    </h4>
                    <p className="mt-2 text-[12.5px] text-ink-600 leading-relaxed font-light">
                      {fp.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Institutional Co-Development Note */}
              <div className="mt-8 rounded-xl border border-gold-500/40 bg-gold-500/5 p-4 text-[12.5px] text-forest-950">
                <div className="flex items-start gap-2.5">
                  <Info className="h-5 w-5 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-forest-900">Custom Institutional Seasoning &amp; Private Label Development</span>
                    <p className="mt-0.5 text-ink-700 leading-relaxed">
                      {PRODUCT_CATEGORIES[3].note}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className="btn-primary text-[13px] flex items-center gap-1.5">
                  <ShoppingBag className="h-4 w-4" /> View Store Offerings
                </Link>
                <Link href="/contact" className="btn-outline text-[13px] flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" /> Discuss Custom Seasoning Development
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Summary Strip */}
      <section className="bg-forest-900 py-16 text-ivory-100">
        <div className="section-shell text-center max-w-2xl mx-auto">
          <p className="text-eyebrow !text-gold-400">Institutional Procurement</p>
          <h2 className="mt-3 font-serif text-[28px] sm:text-[36px] font-bold text-ivory-50">
            Wholesale, Export &amp; Custom Sourcing
          </h2>
          <p className="mt-3 text-[14.5px] text-ivory-200/80 leading-relaxed font-light">
            Contact our Purnia corporate desk for ex-factory commodity rates, 8kg moisture-barrier packaging, or export freight dispatch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/bulk-supply" className="btn-gold text-[13px]">
              Submit Wholesale Bulk RFQ
            </Link>
            <Link href="/exports" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 text-[13px]">
              International Export Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
