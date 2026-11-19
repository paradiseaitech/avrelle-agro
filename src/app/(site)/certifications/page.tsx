import type { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileCheck2, 
  Award, 
  Building2, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Download,
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Certifications & Statutory Compliance | AVRELLE AGRO PVT LTD",
  description:
    "Review AVRELLE AGRO's food safety licences, corporate registrations, GST, Import Export Code (IEC), APEDA status, and Mithila Makhana GI compliance.",
};

const CERTIFICATIONS = [
  {
    category: "Food Safety & Standards",
    title: "FSSAI Food Business Operator Licence",
    authority: "Food Safety and Standards Authority of India (FSSAI)",
    description:
      "Mandatory statutory food licensing governing hygienic manufacturing, processing, storage, packaging, and commercial distribution of makhana nuts.",
    status: "Active Corporate Registration",
    regNo: "[FSSAI Licence Number to be displayed upon verification]",
    validity: "Subject to verified certificate validity",
    badge: "Food Safety",
    verificationLink: "https://foscos.fssai.gov.in",
  },
  {
    category: "Corporate & Tax Compliance",
    title: "Ministry of Corporate Affairs (MCA) Incorporation",
    authority: "Registrar of Companies (RoC), Ministry of Corporate Affairs, Government of India",
    description:
      "Legally incorporated Private Limited corporate entity under the Companies Act, 2013, with registered headquarters in Purnia, Bihar.",
    status: "Duly Incorporated Private Limited Company",
    regNo: "[Corporate Identification Number (CIN) to be displayed upon verification]",
    validity: "Permanent Corporate Entity",
    badge: "Corporate Status",
    verificationLink: "https://www.mca.gov.in",
  },
  {
    category: "Corporate & Tax Compliance",
    title: "Goods & Services Tax (GST) Registration",
    authority: "Goods and Services Tax Network (GSTN), Department of Revenue, Government of India",
    description:
      "Statutory tax registration for inter-state and intra-state wholesale trade of processed and raw agricultural fox nuts under HSN 19041010.",
    status: "Verified GSTIN Registered",
    regNo: "[GSTIN to be displayed upon corporate verification]",
    validity: "Active Tax Compliance",
    badge: "Tax Registered",
    verificationLink: "https://www.gst.gov.in",
  },
  {
    category: "International Trade & Exports",
    title: "Import Export Code (IEC)",
    authority: "Directorate General of Foreign Trade (DGFT), Ministry of Commerce and Industry",
    description:
      "Statutory 10-digit authorization mandatory for commercial clearance, customs documentation, and international ocean/air export shipments.",
    status: "Export Authorized Entity",
    regNo: "[IEC Code to be displayed upon corporate verification]",
    validity: "Permanent Export Registration",
    badge: "Foreign Trade",
    verificationLink: "https://www.dgft.gov.in",
  },
  {
    category: "International Trade & Exports",
    title: "APEDA Registration (Agricultural Export)",
    authority: "Agricultural and Processed Food Products Export Development Authority",
    description:
      "Apex statutory body for export promotion and quality surveillance of scheduled agro-food products originating from India.",
    status: "Registration Under Process / Review",
    regNo: "[RCMC Number pending confirmation]",
    validity: "Periodic Regulatory Renewal",
    badge: "Export Promotion",
    verificationLink: "https://apeda.gov.in",
  },
  {
    category: "Geographical Indication (GI Heritage)",
    title: "Mithila Makhana Geographical Indication (GI) Provenance",
    authority: "Geographical Indications Registry, Controller General of Patents, Designs and Trade Marks",
    description:
      "Statutory recognition of the agricultural origin, physical morphology, and traditional processing of makhana from the Mithila wetland basin. GI recognition applies to eligible agricultural produce of the territory under the GI Act, 1999.",
    status: "Product & Terroir Recognition",
    regNo: "Registered GI Product: Mithila Makhana",
    validity: "Statutory Origin Protection",
    badge: "Origin Heritage",
    verificationLink: "https://ipindia.gov.in",
  },
  {
    category: "Quality Management Systems",
    title: "ISO 22000 / HACCP Food Safety Framework",
    authority: "International Organization for Standardization / Accredited Certification Body",
    description:
      "Comprehensive Hazard Analysis Critical Control Point (HACCP) system monitoring physical, biological, and chemical hazards across all processing nodes.",
    status: "Quality Management Alignment",
    regNo: "[ISO / HACCP Audit Documentation in progress]",
    validity: "Audit Certification Cycle",
    badge: "Quality System",
    verificationLink: null,
  },
];

export default function CertificationsPage() {
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
              <li className="text-gold-300 font-medium">Processing &amp; Quality</li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ivory-100">Certifications</li>
            </ol>
          </nav>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Statutory Licences &amp; Regulatory Compliance
          </div>

          <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-tight text-ivory-50 sm:text-[48px]">
            Institutional Transparency, Licences &amp; Compliance.
          </h1>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ivory-100/85">
            AVRELLE AGRO PVT LTD adheres strictly to Indian and international food processing, commercial tax, and export mandates. Review our corporate registrations and statutory benchmarks below.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quality-assurance" className="btn-gold">
              Quality Assurance Protocols
            </Link>
            <Link href="/exports" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              International Export Clearance
            </Link>
          </div>
        </div>
      </div>

      {/* Main Certification Grid */}
      <section className="bg-ivory-50 py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow">Regulatory Framework</p>
            <h2 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[38px]">
              Corporate Licences &amp; Authorizations
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              Clearly distinguishing statutory food licensing, corporate registrations, and international export accreditations.
            </p>
            <span className="ornament-line mt-3.5 block mx-auto" aria-hidden="true" />
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className="rounded-2xl border border-beige-300 bg-white p-7 shadow-sm transition-all hover:border-gold-500/50 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-beige-200 pb-3 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800 bg-beige-100 px-2.5 py-0.5 rounded">
                      {cert.category}
                    </span>
                    <span className="text-[10.5px] font-semibold text-gold-800 bg-gold-50 px-2 py-0.5 rounded border border-gold-500/30">
                      {cert.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-[20px] font-semibold text-forest-900 mt-2">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-[12.5px] text-ink-500 font-medium">
                    Issuing Authority: <span className="text-forest-900">{cert.authority}</span>
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-700">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-beige-200/80 bg-ivory-50/70 -mx-7 -mb-7 p-5 rounded-b-2xl space-y-2 text-[12.5px]">
                  <div className="flex justify-between">
                    <span className="text-ink-500">Registration / Reference:</span>
                    <span className="font-mono font-medium text-forest-900 text-right">{cert.regNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-500">Regulatory Status:</span>
                    <span className="font-semibold text-forest-800">{cert.status}</span>
                  </div>
                  {cert.verificationLink && (
                    <div className="pt-2 flex justify-end">
                      <a
                        href={cert.verificationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-gold-800 hover:underline"
                      >
                        Verify Authority Portal <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Verification Protocol Notice */}
          <div className="mt-12 rounded-xl border border-dashed border-beige-400 bg-ivory-50 p-6 text-center max-w-3xl mx-auto">
            <FileText className="h-8 w-8 text-gold-700 mx-auto" />
            <h4 className="font-serif text-[17px] font-semibold text-forest-900 mt-2">
              Statutory Certificate Verification Policy
            </h4>
            <p className="mt-1.5 text-[13px] text-ink-600 leading-relaxed">
              <em>In strict accordance with corporate compliance governance, AVRELLE AGRO PVT LTD publishes certificate identification numbers, PDF downloads, and registry links exclusively after primary validation of physical documentation by the company&apos;s legal and compliance officers.</em>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-900 botanical-grid text-ivory-100 py-16">
        <div className="section-shell flex flex-col items-center text-center">
          <p className="text-eyebrow !text-gold-400">Institutional Onboarding</p>
          <h2 className="mt-3 max-w-2xl font-serif text-[28px] text-ivory-50 sm:text-[38px]">
            Require Vendor Due-Diligence Documents?
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ivory-100/80">
            Our corporate affairs desk provides complete vendor documentation kits, GST compliance certificates, bank details, and formal quotations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/bulk-supply" className="btn-gold">
              Request Vendor Packet &amp; RFQ
            </Link>
            <Link href="/contact" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400">
              Contact Compliance Desk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

