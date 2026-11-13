import type { Metadata } from "next";
import Link from "next/link";
import { getSettings, listPublishedGrades } from "@/lib/db-data";
import { BulkEnquiryForm } from "@/components/bulk/bulk-enquiry-form";
import { BulkRateCard } from "@/components/bulk/bulk-rate-card";
import { BULK_QUOTATION_DETAILS } from "@/lib/bulk-rates";
import { Download, FileText, ArrowDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Bulk & Wholesale Makhana Quotation & Rates — AVRELLE AGRO",
  description:
    "Official wholesale phool makhana rate card (Ref: AVA/QTN/2026/038). 8 commercial tiers from ₹350/kg to ₹1,275/kg packed in 8 kg White PP bags. Ex-Purnea, Bihar dispatch for distributors, food processors, and exporters.",
};

const STEPS = [
  {
    n: "01",
    title: "Review Official Rate Card",
    body: "Browse our verified 8-tier quotation rates below (Ref: AVA/QTN/2026/038) or download the official letterhead copy.",
  },
  {
    n: "02",
    title: "Submit Volume Requirement",
    body: "Select your preferred grades, quantity in 8 kg bags or kilograms, destination pincode, and business details via the calculator below.",
  },
  {
    n: "03",
    title: "Proforma Invoice & Dispatch",
    body: "Receive instant WhatsApp / email confirmation with formal proforma invoice, freight estimate, and 7–10 days dispatch tracking.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the standard bulk packaging specification?",
    a: "All bulk orders are packed in hygienic White PP bags with a 100-micron plastic inner moisture liner, weighing 8 kg net per bag. Custom 10 kg, 20 kg, or retail pouches are also available on special contract.",
  },
  {
    q: "How are freight and transport charges handled?",
    a: "All quoted rates are Ex-Purnea, Bihar. Freight, transport insurance, and handling charges are paid by the buyer or billed at actual carrier rates to your nearest transport hub.",
  },
  {
    q: "What are the payment and GST terms?",
    a: "Payment terms are 100% advance prior to factory dispatch. Goods and Services Tax (GST) is charged at 5% extra as per statutory norms under HSN code 19041010.",
  },
  {
    q: "How do I verify the authenticity of the wholesale rates?",
    a: "You can view and download the signed and stamped official letterhead quotation (Ref: AVA/QTN/2026/038) directly on this page or contact our corporate office at +91 79797 82185.",
  },
];

export default async function BulkOrdersPage() {
  const [grades, settings] = await Promise.all([listPublishedGrades(), getSettings()]);
  const wa = settings.business.whatsapp.replace(/\D/g, "");
  const waPrefill = encodeURIComponent(
    `Hello AVRELLE AGRO, I am reviewing your wholesale quotation (${BULK_QUOTATION_DETAILS.quotationNo}) and would like to place a bulk order.`,
  );

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-forest-900 botanical-grid">
        <div className="pointer-events-none absolute inset-4 border border-gold-500/20 sm:inset-6" aria-hidden="true" />
        <div className="section-shell relative py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ivory-100/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-gold-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">Bulk Orders</li>
            </ol>
          </nav>
          
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
            <FileText className="h-3.5 w-3.5" />
            Official Quotation Ref: {BULK_QUOTATION_DETAILS.quotationNo}
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-tight text-ivory-50 sm:text-[48px]">
            Wholesale Makhana Supply &amp; Official Rate Card
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ivory-100/85">
            AVRELLE AGRO PVT LTD is an authentic processor and wholesale supplier of phool makhana (fox nuts)
            from Purnea, Bihar. Below is our verified commercial rate quotation for 8 standard tiers,
            packed in 8 kg White PP bags with 100μ liner.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#rate-card" className="btn-gold flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              View 8-Tier Rate Card
            </a>
            <a
              href="/Rate.jpeg"
              download="AVRELLE_AGRO_Makhana_Bulk_Rate_Quotation.jpeg"
              className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Quotation (JPEG)
            </a>
            {wa && (
              <a
                href={`https://wa.me/${wa}?text=${waPrefill}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5"
              >
                WhatsApp Inquiry
              </a>
            )}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="bg-ivory-50 border-b border-beige-200">
        <div className="section-shell py-12 sm:py-16">
          <h2 id="how-heading" className="text-center font-serif text-[28px] text-forest-900 sm:text-[34px]">
            Wholesale Supply Process
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="border border-beige-200 bg-white p-6 sm:p-7 rounded-xl shadow-xs">
                <span className="font-serif text-[30px] font-bold text-gold-600" aria-hidden="true">{s.n}</span>
                <h3 className="mt-3 font-serif text-[18px] font-bold text-forest-900">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Rate Card Section */}
      <section id="rate-card" aria-labelledby="rate-card-heading" className="bg-ivory-100 py-14 sm:py-20 scroll-mt-20">
        <div className="section-shell max-w-5xl">
          <BulkRateCard />
        </div>
      </section>

      {/* Enquiry and Calculator Form */}
      <section id="enquiry-form" aria-labelledby="form-heading" className="bg-white py-14 sm:py-20 scroll-mt-24 border-t border-beige-200">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-eyebrow">Direct Factory Booking</p>
              <h2 id="form-heading" className="mt-3 font-serif text-[30px] text-forest-900 sm:text-[38px]">
                Request Commercial Dispatch
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                Use the live rate calculator below to choose your desired tiers, compute bag counts (8 kg net per bag),
                estimate 5% GST, and receive an instant formal confirmation.
              </p>
            </div>
            <div className="mt-10">
              <BulkEnquiryForm grades={grades} whatsapp={settings.business.whatsapp} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="bulk-faq-heading" className="border-t border-beige-200 bg-ivory-50">
        <div className="section-shell max-w-3xl py-14 sm:py-16">
          <h2 id="bulk-faq-heading" className="font-serif text-[26px] text-forest-900 sm:text-[30px] text-center">
            Frequently Asked Wholesale Questions
          </h2>
          <div className="mt-8 divide-y divide-beige-200 border-y border-beige-200 bg-white rounded-xl border p-4 sm:p-6 shadow-xs">
            {FAQ_ITEMS.map((f) => (
              <details key={f.q} className="group py-4 first:pt-2 last:pb-2">
                <summary className="cursor-pointer list-none text-[15.5px] font-serif font-bold text-forest-900 marker:hidden flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="ml-2 inline-block text-gold-600 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
