import type { Metadata } from "next";
import Link from "next/link";
import { getSettings, listPublishedGrades } from "@/lib/db-data";
import { BulkEnquiryForm } from "@/components/bulk/bulk-enquiry-form";
import { 
  Globe, 
  Ship, 
  Plane, 
  FileCheck, 
  Package, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Anchor, 
  FileText,
  Mail,
  PhoneCall,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Global Makhana Exports & International Supply | AVRELLE AGRO PVT LTD",
  description:
    "AVRELLE AGRO's international export desk. Sourcing and exporting premium Bihar phool makhana (fox nuts) worldwide with FCL/LCL container logistics, phytosanitary compliance, and export packaging.",
};

const LOGISTICS_CAPABILITIES = [
  {
    mode: "Ocean Freight (FCL / LCL)",
    port: "Kolkata / Haldia Port Gateway",
    leadTime: "Approx. 7–10 days from factory to port vessel loading",
    details:
      "Strategic proximity to Eastern India's primary container terminals. Available in 20ft Dry Van (~2.5–3.0 MT) and 40ft High Cube (~5.5–6.5 MT) due to the high volumetric density of puffed makhana.",
    icon: Ship,
  },
  {
    mode: "Air Freight Expedited",
    port: "Patna / Kolkata / Delhi Air Terminals",
    leadTime: "3–5 days dispatch for urgent commercial or trial consignments",
    details:
      "Specialized temperature-controlled air courier cargo for rapid market testing, international trade show sampling, or high-value retail launches.",
    icon: Plane,
  },
  {
    mode: "Inland Container Depots (ICD)",
    port: "Customs Bonded Rail Transport",
    leadTime: "Direct factory stuffing to domestic dry port hub",
    details:
      "Full container stuffing at factory premises in Purnia under customs supervision or domestic movement to designated ICD hubs.",
    icon: Anchor,
  },
];

const EXPORT_DOCUMENTATION = [
  {
    doc: "Commercial Invoice & Packing List",
    description: "Detailed itemized HS-Code 19041010 breakdown with gross, net, and volumetric weights.",
  },
  {
    doc: "Certificate of Origin (COO)",
    description: "Issued by authorized chambers of commerce confirming 100% Indian origin from Bihar.",
  },
  {
    doc: "Phytosanitary Certificate",
    description: "Statutory inspection by the Plant Quarantine Organization of India declaring freedom from pests.",
  },
  {
    doc: "Certificate of Analysis (COA)",
    description: "Batch analytical report detailing moisture (<9.5%), ash, aflatoxins, and microbiological counts.",
  },
  {
    doc: "Fumigation Certificate",
    description: "Conducted by accredited agencies adhering to ISPM-15 standards with non-toxic protocols.",
  },
  {
    doc: "Bill of Lading (B/L) / AWB",
    description: "Negotiable clean-on-board ocean bill of lading or international airway bill for customs clearance.",
  },
];

const EXPORT_PORTFOLIO = [
  {
    grade: "Jumbo 6+ Suta (20–24 mm)",
    ideal: "Gourmet retail brands, luxury snacking, and high-end specialty grocery in Europe & US.",
    packaging: "Nitrogen-flushed retail standup pouches (100g to 400g) or 8 kg master bags.",
  },
  {
    grade: "Premium Plus 5 Suta (17–19 mm)",
    ideal: "Supermarket own-brand programs, continuous roasting, and healthy snack repackers.",
    packaging: "Standard 8 kg White PP bags with 100-micron LDPE moisture barrier.",
  },
  {
    grade: "Standard Plus 4 Suta (14–16 mm)",
    ideal: "Volume snacking, extruded ingredient processing, and everyday retail packaging.",
    packaging: "High-density master cartons or bulk palletized export bags.",
  },
  {
    grade: "Makhana Powder (60–80 Mesh)",
    ideal: "Gluten-free functional flour, infant formulations, nutraceutical shakes, and bakeries.",
    packaging: "10 kg / 20 kg multilayer kraft paper bags with inner hermetic liner.",
  },
];

export default async function ExportsPage() {
  const [grades, settings] = await Promise.all([listPublishedGrades(), getSettings()]);
  const wa = settings.business.whatsapp.replace(/\D/g, "");

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
              <li className="text-gold-300 font-medium">Trade &amp; B2B</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">Exports</li>
            </ol>
          </nav>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
            <Globe className="h-3.5 w-3.5" />
            Global Trade &amp; Ocean Freight Desk
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-tight text-ivory-50 sm:text-[48px]">
            Bringing Authentic Mithila Makhana to Global Food Markets.
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ivory-100/85">
            AVRELLE AGRO PVT LTD supplies international food brands, distributors, and ingredient manufacturers with export-grade Indian phool makhana, full container logistics (FCL/LCL), and complete customs documentation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#export-rfq" className="btn-gold flex items-center gap-2">
              Submit International RFQ <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#logistics-specs" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              Freight &amp; Container Specs
            </a>
            <Link href="/certifications" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              Export Compliance &amp; IEC
            </Link>
          </div>
        </div>
      </div>

      {/* Strategic Export Positioning */}
      <section className="bg-ivory-50 py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-eyebrow">Global Trade Architecture</p>
            <h2 className="mt-2 font-serif text-[30px] leading-tight text-forest-900 sm:text-[38px]">
              Direct Source Proximity with International Shipping Standards
            </h2>
            <span className="ornament-line mt-4 block" aria-hidden="true" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-700">
              <p>
                As global consumer awareness of plant-based superfoods, low-glycemic snacking, and clean-label dietary fibres accelerates, phool makhana (fox nut) is rapidly transitioning from a regional specialty into an international FMCG staple.
              </p>
              <p>
                <strong>AVRELLE AGRO PVT LTD</strong> addresses the primary bottleneck facing international importers: <em>inconsistent grading and poor moisture barrier packaging during maritime transit</em>. Operating directly out of Purnia, Bihar, we enforce strict mechanical sortex sizing and hermetic moisture barrier packing before cargo leaves our facility.
              </p>
              <p>
                Our international trade desk handles Incoterms (FOB Kolkata/Haldia, CIF, CFR, Ex-Works) and coordinates all mandatory export clearances, phytosanitary checks, and certificate generation.
              </p>
            </div>

            {/* Export Disclaimer Callout */}
            <div className="mt-8 rounded-xl border border-gold-500/30 bg-gold-50/60 p-5">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gold-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-[15px] font-bold text-forest-900">
                    Export Regulatory Governance
                  </h4>
                  <p className="mt-1 text-[13px] text-ink-600 leading-relaxed">
                    <em>[All export consignments are processed under AVRELLE AGRO PVT LTD&apos;s verified Import Export Code (IEC). Destination-country specific labelling, language adaptations, and custom phytosanitary treatments are aligned per formal commercial agreements.]</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-beige-300 bg-white p-6 shadow-luxe-md">
              <h3 className="font-serif text-[18px] font-bold text-forest-900 border-b border-beige-200 pb-3 mb-4">
                Export Target Specifications
              </h3>
              <dl className="space-y-3 text-[13px]">
                <div className="flex justify-between border-b border-beige-100 pb-2">
                  <dt className="text-ink-500">Harmonized System (HS) Code</dt>
                  <dd className="font-mono font-semibold text-forest-900">1904 10 10 / 0802</dd>
                </div>
                <div className="flex justify-between border-b border-beige-100 pb-2">
                  <dt className="text-ink-500">Target Moisture for Ocean Freight</dt>
                  <dd className="font-semibold text-forest-900">&lt; 9.0% (Max 9.5%)</dd>
                </div>
                <div className="flex justify-between border-b border-beige-100 pb-2">
                  <dt className="text-ink-500">Foreign Matter &amp; Dust</dt>
                  <dd className="font-semibold text-forest-900">Nil / Sortex Cleaned</dd>
                </div>
                <div className="flex justify-between border-b border-beige-100 pb-2">
                  <dt className="text-ink-500">Primary Packaging Liner</dt>
                  <dd className="font-semibold text-forest-900">100μ Food-Grade LDPE Liner</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">Pallet Standards</dt>
                  <dd className="font-semibold text-forest-900">ISPM-15 Heat-Treated / Plastic</dd>
                </div>
              </dl>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl border border-beige-200 bg-white p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-700">Gateway Port</span>
                <p className="mt-1 font-serif text-[18px] font-bold text-forest-900">Kolkata / Haldia</p>
                <p className="text-[11.5px] text-ink-500">~450 km direct highway link</p>
              </div>
              <div className="rounded-xl border border-beige-200 bg-white p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-700">Container Types</span>
                <p className="mt-1 font-serif text-[18px] font-bold text-forest-900">20ft &amp; 40ft HC</p>
                <p className="text-[11.5px] text-ink-500">FCL &amp; Palletized LCL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Product Portfolio */}
      <section className="bg-white py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">Product Selection</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[38px]">
              Export-Oriented Product Portfolio
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              Carefully calibrated makhana grades prepared for overseas retail and ingredient requirements.
            </p>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EXPORT_PORTFOLIO.map((item) => (
              <div key={item.grade} className="rounded-xl border border-beige-200 bg-ivory-50/70 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-[18px] font-bold text-forest-900">{item.grade}</h3>
                  <p className="mt-2 text-[13px] text-ink-700 leading-relaxed">
                    <strong>Target Application:</strong> {item.ideal}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-beige-200 text-[12px] text-ink-500">
                  <strong>Export Packaging:</strong> {item.packaging}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics & Container Stuffing Specs */}
      <section id="logistics-specs" className="bg-beige-100/40 py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">Maritime &amp; Air Logistics</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[36px]">
              Shipping Modes &amp; Container Specifications
            </h2>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {LOGISTICS_CAPABILITIES.map((log) => {
              const Icon = log.icon;
              return (
                <div key={log.mode} className="rounded-xl border border-beige-300 bg-white p-6 shadow-sm">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-forest-900/10 text-forest-900">
                    <Icon className="h-5 w-5 text-forest-800" />
                  </div>
                  <h3 className="mt-4 font-serif text-[18px] font-semibold text-forest-900">{log.mode}</h3>
                  <p className="mt-1 text-[12px] font-medium text-gold-700">{log.port}</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-700">{log.details}</p>
                  <div className="mt-4 pt-3 border-t border-beige-200 text-[12px] text-ink-500">
                    <strong>Transit Time:</strong> {log.leadTime}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Export Documentation */}
      <section className="bg-white py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">Customs &amp; Compliance</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[36px]">
              Full Export Documentation Suite
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              We provide complete commercial and statutory documentation to guarantee smooth customs clearance at destination ports.
            </p>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXPORT_DOCUMENTATION.map((d) => (
              <div key={d.doc} className="rounded-xl border border-beige-200 bg-ivory-50 p-6">
                <FileCheck className="h-6 w-6 text-gold-700" />
                <h3 className="mt-3 font-serif text-[17px] font-semibold text-forest-900">{d.doc}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Buyer RFQ Form */}
      <section id="export-rfq" className="bg-ivory-50 py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-eyebrow">International Trade Desk</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[38px]">
              Request an International Export Quotation
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              Submit your destination country, required grade specifications, and volume requirements. Our export department will issue formal FOB/CIF pricing within 1 business day.
            </p>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <BulkEnquiryForm grades={grades} whatsapp={wa} />
          </div>
        </div>
      </section>

      {/* Global Contact Bar */}
      <section className="bg-forest-900 botanical-grid text-ivory-100 py-16">
        <div className="section-shell flex flex-col items-center text-center">
          <p className="text-eyebrow !text-gold-400">Direct International Desk</p>
          <h2 className="mt-3 max-w-2xl font-serif text-[28px] text-ivory-50 sm:text-[38px]">
            Speak Directly with Our Trade Officers
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ivory-100/80">
            For urgent vessel bookings, Letter of Credit (LC) negotiations, or private-label export consultations, contact our executive office.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-[13.5px]">
            <a href={`tel:${settings.business.phone.replace(/\s/g, "")}`} className="btn-gold flex items-center gap-2">
              <PhoneCall className="h-4 w-4" /> Call: {settings.business.phone}
            </a>
            <a href={`mailto:${settings.business.email}`} className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email: {settings.business.email}
            </a>
            <a
              href={`https://wa.me/${wa}?text=${encodeURIComponent("Hello AVRELLE AGRO, I am an international buyer enquiring about export makhana consignments.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400"
            >
              WhatsApp International Desk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

