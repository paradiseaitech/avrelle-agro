import type { Metadata } from "next";
import Link from "next/link";
import { getSettings, listPublishedGrades } from "@/lib/db-data";
import { BulkEnquiryForm } from "@/components/bulk/bulk-enquiry-form";
import { BulkRateCard } from "@/components/bulk/bulk-rate-card";
import { BULK_QUOTATION_DETAILS } from "@/lib/bulk-rates";
import { 
  Building2, 
  Package, 
  Layers, 
  Truck, 
  Download, 
  FileText, 
  ArrowDown, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  Scale
} from "lucide-react";

export const metadata: Metadata = {
  title: "B2B Bulk Supply & Official Wholesale Makhana Rate Card | AVRELLE AGRO",
  description:
    "Official wholesale phool makhana rate quotation (Ref: AVA/QTN/2026/038). Direct-from-source bulk supply in 8 kg White PP bags with 100μ liner for wholesalers, FMCG manufacturers, and exporters.",
};

const TARGET_BUYERS = [
  {
    role: "National Wholesalers & Traders",
    need: "Consistent multi-tier suta grades with predictable dispatch schedules.",
    solution: "Bulk supply in standard 8 kg White PP moisture-barrier bags with truckload logistics.",
  },
  {
    role: "FMCG Snack Food Manufacturers",
    need: "Low-moisture, uniform pop nuts optimized for high-speed automated seasoning and packing.",
    solution: "Sub-3% roast benchmarking, Sortex cleaned, and optical defect screening.",
  },
  {
    role: "Modern Retail Supermarket Chains",
    need: "Consistent quality control, formal GST compliance, and barcode-ready private label packs.",
    solution: "Custom retail pouches (100g to 1 kg) or bulk master cartons with complete batch traceability.",
  },
  {
    role: "Nutraceutical & Bakery Formulators",
    need: "Micro-milled, pure fox nut powder and dense Thurr grades for health supplements.",
    solution: "60–80 mesh pure makhana powder and industrial grade Thurri supplied on contract.",
  },
  {
    role: "Merchant & International Exporters",
    need: "Container stuffing, port transit documentation, and phytosanitary certificates.",
    solution: "Export-grade packaging, pallets, fumigation, and FCL/LCL dispatch via Kolkata port.",
  },
  {
    role: "Institutional Catering & HoReCa",
    need: "Bulk kitchen packs with stable monthly pricing and prompt delivery.",
    solution: "High-yield medium and jumbo grades for curries, desserts, and hospitality gifting.",
  },
];

const PACKAGING_SPECS = [
  {
    name: "Standard Wholesale White PP Bag",
    weight: "8 kg Net Weight",
    liner: "100-Micron Food-Grade LDPE Inner Liner",
    closure: "Machine Twin-Thread Stitching",
    feature: "Guarantees moisture protection against ambient humidity during long-distance transit.",
  },
  {
    name: "Heavy-Duty Bulk Sacks",
    weight: "10 kg / 15 kg / 20 kg",
    liner: "Multi-Layer Barrier Film",
    closure: "Hermetic Heat Seal & Outer Stitch",
    feature: "Designed for industrial processors and regional re-bagging facilities.",
  },
  {
    name: "Export Master Corrugated Cartons",
    weight: "Custom Palletized Specs",
    liner: "Fumigated Wooden or Heavy Plastic Pallets",
    closure: "Shrink-Wrapped & Strapped",
    feature: "Engineered to withstand ocean container freight without crushing.",
  },
];

export default async function BulkSupplyPage() {
  const [grades, settings] = await Promise.all([listPublishedGrades(), getSettings()]);
  const wa = settings.business.whatsapp.replace(/\D/g, "");

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-forest-900 botanical-grid py-14 text-ivory-100 sm:py-20">
        <div className="pointer-events-none absolute inset-4 border border-gold-500/20 sm:inset-6" aria-hidden="true" />
        <div className="section-shell relative">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ivory-100/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-gold-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gold-300 font-medium">Trade &amp; B2B</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">Bulk Supply</li>
            </ol>
          </nav>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
            <FileText className="h-3.5 w-3.5" />
            Official Wholesale Quotation Ref: {BULK_QUOTATION_DETAILS.quotationNo}
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-tight text-ivory-50 sm:text-[48px]">
            Wholesale Makhana Supply Direct From Purnea, Bihar.
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ivory-100/85">
            AVRELLE AGRO PVT LTD supplies 8 verified commercial tiers in standard 8 kg White PP bags with 100μ moisture liners. Serving domestic distributors, FMCG brands, and institutional food processors.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#rate-card" className="btn-gold flex items-center gap-2">
              <ArrowDown className="h-4 w-4" /> View 8-Tier Rate Card
            </a>
            <a href="#rfq-form" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              Submit Request for Quotation (RFQ)
            </a>
            <a
              href="/Rate.jpeg"
              download="AVRELLE_AGRO_Bulk_Quotation.jpeg"
              className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 flex items-center gap-1.5"
            >
              <Download className="h-4 w-4" /> Download Official Rate Sheet
            </a>
          </div>
        </div>
      </div>

      {/* Target Buyer Segments */}
      <section className="bg-ivory-50 py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">Market Solutions</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[38px]">
              Tailored Supply for Commercial Buyers
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              Meeting the diverse technical, volumetric, and packaging specifications of commercial industries.
            </p>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TARGET_BUYERS.map((b) => (
              <div key={b.role} className="rounded-xl border border-beige-200 bg-white p-6 shadow-sm">
                <Building2 className="h-6 w-6 text-gold-700" />
                <h3 className="mt-3 font-serif text-[18px] font-semibold text-forest-900">{b.role}</h3>
                <p className="mt-2 text-[13px] text-ink-500"><strong>Requirement:</strong> {b.need}</p>
                <p className="mt-2 text-[13px] text-forest-900 font-medium"><strong>Solution:</strong> {b.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Card Section */}
      <section id="rate-card" className="bg-white py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block rounded-full bg-gold-100 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-900">
              Verified Letterhead Quotation · Ref: {BULK_QUOTATION_DETAILS.quotationNo}
            </span>
            <h2 className="mt-3 font-serif text-[30px] text-forest-900 sm:text-[38px]">
              Official 8-Tier Commercial Rate Schedule
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              Rates are Ex-Factory Purnea, Bihar, packed in standard 8 kg White PP bags with 100μ liner. Freight and 5% GST extra as per statutory norms.
            </p>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12">
            <BulkRateCard />
          </div>
        </div>
      </section>

      {/* Packaging Specifications & MOQ */}
      <section className="bg-beige-100/40 py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">Packaging Infrastructure</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[36px]">
              Bulk Packaging &amp; Minimum Order Guidelines
            </h2>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PACKAGING_SPECS.map((pkg) => (
              <div key={pkg.name} className="rounded-xl border border-beige-300 bg-white p-6 shadow-sm">
                <Package className="h-6 w-6 text-forest-800" />
                <h3 className="mt-3 font-serif text-[18px] font-semibold text-forest-900">{pkg.name}</h3>
                <div className="mt-3 space-y-1.5 text-[13px] text-ink-700">
                  <p><strong>Standard Net Weight:</strong> {pkg.weight}</p>
                  <p><strong>Barrier Protection:</strong> {pkg.liner}</p>
                  <p><strong>Bag Sealing:</strong> {pkg.closure}</p>
                </div>
                <p className="mt-3 text-[12.5px] text-ink-500 border-t border-beige-200 pt-3">
                  {pkg.feature}
                </p>
              </div>
            ))}
          </div>

          {/* MOQ & Sample Policy */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gold-500/30 bg-gold-50/50 p-6">
              <h4 className="font-serif text-[17px] font-bold text-forest-900">
                Minimum Order Quantity (MOQ) Policy
              </h4>
              <p className="mt-2 text-[13.5px] text-ink-700 leading-relaxed">
                Standard commercial MOQ begins at <strong>10 bags (80 kg)</strong> for trial consignments. Truckload dispatches (FCL domestic freight) range from 3,000 kg to 10,000 kg depending on vehicle capacity.
              </p>
            </div>
            <div className="rounded-xl border border-gold-500/30 bg-gold-50/50 p-6">
              <h4 className="font-serif text-[17px] font-bold text-forest-900">
                Sample Request &amp; Lab Benchmarking
              </h4>
              <p className="mt-2 text-[13.5px] text-ink-700 leading-relaxed">
                Genuine commercial buyers and food product developers may request calibrated sample kits across all 8 grades for physical density, puffiness, and laboratory testing. Contact our trade desk below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Form Section */}
      <section id="rfq-form" className="bg-ivory-50 py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-eyebrow">Commercial Quotation</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[38px]">
              Submit Your Bulk Requirement (RFQ)
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              Select your required grade, calculate estimated bag quantities, and receive a formal proforma invoice with freight estimate within 4 business hours.
            </p>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <BulkEnquiryForm grades={grades} whatsapp={wa} />
          </div>
        </div>
      </section>

      {/* Corporate Help & FAQs */}
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell max-w-3xl mx-auto">
          <div className="text-center">
            <HelpCircle className="h-8 w-8 text-gold-700 mx-auto" />
            <h3 className="mt-2 font-serif text-[26px] text-forest-900">
              Frequently Asked Wholesale Questions
            </h3>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-8 space-y-4 text-[14px]">
            <div className="rounded-xl border border-beige-200 bg-ivory-50 p-5">
              <h4 className="font-semibold text-forest-900">How is dispatch executed Ex-Purnea?</h4>
              <p className="mt-1 text-ink-600">
                All consignments are loaded from our Purnia factory. We coordinate with national logistics carriers (V-Trans, TCI, Safexpress, Rivigo) or your designated transport company.
              </p>
            </div>
            <div className="rounded-xl border border-beige-200 bg-ivory-50 p-5">
              <h4 className="font-semibold text-forest-900">What are the commercial payment terms?</h4>
              <p className="mt-1 text-ink-600">
                Standard terms are 100% advance against Proforma Invoice prior to factory gate dispatch. Bank transfers (RTGS/NEFT) are executed to the company&apos;s verified corporate current account.
              </p>
            </div>
            <div className="rounded-xl border border-beige-200 bg-ivory-50 p-5">
              <h4 className="font-semibold text-forest-900">Are private label packaging options supported?</h4>
              <p className="mt-1 text-ink-600">
                Yes. For qualifying annual volume commitments, we provide customized primary pouches, secondary display boxes, and contract packaging adhering to your brand artwork.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

