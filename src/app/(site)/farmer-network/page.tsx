import type { Metadata } from "next";
import Link from "next/link";
import { 
  Users, 
  MapPin, 
  HeartHandshake, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  Sun, 
  Droplets, 
  Sprout, 
  ArrowRight,
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Farmer Network & Sourcing — Bihar Agricultural Partnerships | AVRELLE AGRO",
  description:
    "Discover AVRELLE AGRO's farmer partnerships, regional sourcing practices, transparent weighment, and sustainable wetland procurement across Purnia and Mithila, Bihar.",
};

const SOURCING_PRACTICES = [
  {
    title: "Transparent Digital Weighment",
    desc: "Procurement centers utilize calibrated digital scales, eliminating archaic deduction practices and ensuring growers receive pay for every gram harvested.",
    icon: Scale,
  },
  {
    title: "Direct & Prompt Remuneration",
    desc: "Payments are settled directly through secure electronic transfers or immediate bank accounts, reducing multi-layered intermediary commissions.",
    icon: HeartHandshake,
  },
  {
    title: "Moisture & Quality Feedback",
    desc: "Growers receive scientific moisture testing data immediately at intake, helping them improve on-farm sun-drying and post-harvest handling.",
    icon: Sun,
  },
  {
    title: "Regional Agronomic Guidance",
    desc: "Encouraging best practices in freshwater pond cleaning, organic silt management, and seed retention for the next planting season.",
    icon: Sprout,
  },
];

const PROCUREMENT_CORRIDORS = [
  {
    region: "Purnia & Kosi Basin",
    ecosystem: "Oxbow lakes, low-lying freshwater chaurs, and alluvial floodplains.",
    significance: "Central aggregation hub ensuring minimal transit time between harvest and primary cleaning.",
  },
  {
    region: "Katihar & Mahananda Delta",
    ecosystem: "Deep perennial wetlands with high organic sedimentation.",
    significance: "Known for yielding robust, nutrient-dense black raw seed nuts (Gori).",
  },
  {
    region: "Mithila Wetland Belt (Darbhanga & Madhubani)",
    ecosystem: "Heritage village ponds (pokhars) with centuries of dedicated cultivation.",
    significance: "Producers of traditional GI-compliant seed lines renowned for pure white puffing.",
  },
  {
    region: "Saharsa & Supaul Corridors",
    ecosystem: "Perennial riverine marshes enriched by seasonal monsoonal silt.",
    significance: "Provides consistent supply volume during early and peak harvest windows.",
  },
];

export default function FarmerNetworkPage() {
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
              <li className="text-gold-300 font-medium">Company</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">Farmer Network</li>
            </ol>
          </nav>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
            <Users className="h-3.5 w-3.5" />
            Grower Partnerships · Ethical Sourcing · Wetland Stewardship
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-tight text-ivory-50 sm:text-[48px]">
            Empowering the Keepers of Mithila&apos;s Wetland Agriculture.
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ivory-100/85">
            Behind every snow-white nut of AVRELLE AGRO makhana lies the generational skill of Bihar&apos;s wetland harvesters. We build dependable, respectful agricultural partnerships that foster fair returns and long-term crop sustainability.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#sourcing-practices" className="btn-gold">
              Our Procurement Principles
            </a>
            <Link href="/origin" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              The Mithila Origin Story
            </Link>
          </div>
        </div>
      </div>

      {/* Sourcing Narrative */}
      <section className="bg-ivory-50 py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-eyebrow">The Human Story</p>
            <h2 className="mt-2 font-serif text-[30px] leading-tight text-forest-900 sm:text-[38px]">
              Generations of Artisanal Wetland Mastery
            </h2>
            <span className="ornament-line mt-4 block" aria-hidden="true" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-700">
              <p>
                Makhana cultivation is unlike any terrestrial crop. For centuries, traditional harvesting communities in Bihar—predominantly the Mallah and Sahni clans—have stewarded shallow freshwater wetlands, navigating dense thorny leaves and diving several meters into cold, muddy pond beds to retrieve mature seed pods.
              </p>
              <p>
                <strong>AVRELLE AGRO PVT LTD</strong> approaches regional sourcing with deep reverence for this heritage. Rather than acting as distant commodity traders, our procurement team works directly across primary aggregation centers in Purnia and contiguous growing belts.
              </p>
              <p>
                By stabilizing demand, establishing year-round commercial off-take agreements, and guaranteeing transparent digital weighment, we create a reliable economic bridge between rural pond ecosystems and national/international markets.
              </p>
            </div>

            {/* Sourcing Policy Disclaimer Callout */}
            <div className="mt-8 rounded-xl border border-gold-500/30 bg-gold-50/60 p-5">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gold-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-[15px] font-bold text-forest-900">
                    Sourcing Transparency &amp; Data Integrity Policy
                  </h4>
                  <p className="mt-1 text-[13px] text-ink-600 leading-relaxed">
                    <em>[AVRELLE AGRO PVT LTD procures primary seed stock through verified local aggregator networks and regional grower groups. Precise registered farmer numbers, cooperative contract totals, and formal FPO tie-ups will be published upon conclusion of our ongoing grower registration registry.]</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-beige-300 bg-white p-2 shadow-luxe-md">
              <img
                src="/brand/makhana_hero.jpeg"
                alt="Wetland makhana cultivation, pond harvesting, and clay roasting"
                width={700}
                height={450}
                className="w-full rounded-xl object-cover"
              />
              <p className="mt-2.5 text-center text-[12px] text-ink-500">
                Pond gathering in North Bihar: diving for mature seeds and clay-oven sand roasting.
              </p>
            </div>

            <div className="rounded-xl border border-beige-200 bg-white p-5">
              <h4 className="font-serif text-[16px] font-semibold text-forest-900">
                Ecological Wetland Preservation
              </h4>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">
                Freshwater makhana ponds act as vital carbon sinks and natural bird sanctuaries. Because makhana grows naturally in wild and semi-wild marshlands, it requires minimal synthetic inputs, safeguarding groundwater purity across the Kosi basin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Principles */}
      <section id="sourcing-practices" className="bg-white py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">Fair Trade &amp; Integrity</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[36px]">
              Our Procurement Principles
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              Transforming traditional agricultural trading through transparency, standardized measurement, and respectful grower partnerships.
            </p>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SOURCING_PRACTICES.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-xl border border-beige-200 bg-ivory-50/70 p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-forest-900/10 text-forest-900">
                    <Icon className="h-5 w-5 text-forest-800" />
                  </div>
                  <h3 className="mt-4 font-serif text-[17px] font-semibold text-forest-900">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regional Procurement Corridors */}
      <section className="bg-beige-100/40 py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">Regional Sourcing</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[36px]">
              Key Procurement Corridors
            </h2>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PROCUREMENT_CORRIDORS.map((c) => (
              <div key={c.region} className="rounded-xl border border-beige-300 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold-700" />
                  <h3 className="font-serif text-[18px] font-semibold text-forest-900">{c.region}</h3>
                </div>
                <div className="mt-3 space-y-2 text-[13.5px] text-ink-700">
                  <p><strong>Wetland Ecosystem:</strong> {c.ecosystem}</p>
                  <p className="text-ink-600"><strong>Strategic Role:</strong> {c.significance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-900 botanical-grid text-ivory-100 py-16">
        <div className="section-shell flex flex-col items-center text-center">
          <p className="text-eyebrow !text-gold-400">Join Our Grower Network</p>
          <h2 className="mt-3 max-w-2xl font-serif text-[28px] text-ivory-50 sm:text-[38px]">
            Are You a Regional Producer or Farming Group?
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ivory-100/80">
            AVRELLE AGRO welcomes Farmer Producer Organizations (FPOs), village aggregators, and pond cultivating groups to connect with our Purnia procurement desk.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Contact Procurement Desk
            </Link>
            <Link href="/manufacturing" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              View Processing Facilities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

