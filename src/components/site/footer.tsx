import Link from "next/link";
import { getSettings } from "@/lib/db-data";
import { SocialMediaLinks } from "@/components/site/social-links";
import { ShieldCheck, Globe, Building2, MapPin, Award } from "lucide-react";
import { GIBadge } from "@/components/site/gi-badge";

const corporateLinks = [
  { href: "/about", label: "About AVRELLE AGRO" },
  { href: "/mithila-makhana-gi-recognition", label: "Mithila Makhana GI Recognition" },
  { href: "/origin", label: "Our Origin & Heritage" },
  { href: "/farmer-network", label: "Farmer Network & Sourcing" },
  { href: "/manufacturing", label: "Manufacturing & Facility" },
  { href: "/quality-assurance", label: "Quality Assurance & Hygiene" },
  { href: "/certifications", label: "Certifications & Compliance" },
];

const productTradeLinks = [
  { href: "/products", label: "Product Portfolio (5 Categories)" },
  { href: "/grades", label: "Makhana Grading Standards" },
  { href: "/bulk-supply", label: "B2B Bulk Supply (Domestic)" },
  { href: "/exports", label: "International Exports & Logistics" },
  { href: "/shop", label: "Shop Retail Packs (100g – 1 kg)" },
];

const policyLinks = [
  { href: "/contact", label: "Contact Corporate Desk" },
  { href: "/faqs", label: "Frequently Asked Questions" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/returns-policy", label: "Cancellation & Returns" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export async function SiteFooter() {
  const { business } = await getSettings();
  const waNumber = business.whatsapp.replace(/\D/g, "");

  return (
    <footer className="mt-auto bg-forest-950 text-ivory-100 border-t border-gold-500/20">
      {/* Top Corporate Strip */}
      <div className="border-b border-ivory-100/10 bg-forest-900/60 py-4 sm:py-6">
        <div className="section-shell flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2.5 sm:gap-4 text-[12px] sm:text-[12.5px] text-ivory-100/80">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold-400 shrink-0" />
            <span>Processing &amp; Sourcing Hub: <strong>Purnea, Bihar, India</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-gold-400 shrink-0" />
            <span>Food Safety, Multi-Stage Grading &amp; Hygienic Packaging</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gold-400 shrink-0" />
            <span>Domestic Bulk Supply &amp; Global Export Ready</span>
          </div>
        </div>
      </div>

      <div className="section-shell grid gap-8 sm:gap-10 py-10 sm:py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Col 1: Brand & Corporate Address */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/brand/logo-mark.svg" alt="" width={42} height={42} className="h-10 w-10" aria-hidden="true" />
            <div>
              <p className="font-serif text-lg tracking-[0.16em] text-ivory-50 font-bold">AVRELLE AGRO</p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-luxe text-gold-400">
                Pvt Ltd · Mithila Makhana
              </p>
            </div>
          </div>
          <p className="mt-4 font-serif text-[14px] italic text-gold-300">
            &ldquo;Bringing the Finest of Mithila Makhana to the World.&rdquo;
          </p>

          <div className="mt-4">
            <GIBadge variant="subtle" />
          </div>

          <address className="mt-4 space-y-1.5 text-[13px] not-italic text-ivory-100/80 leading-relaxed">
            <p className="font-medium text-ivory-50">{business.displayName}</p>
            <p>{business.addressLine}, {business.city}, {business.state}, India</p>
            <p>
              Corporate Inquiries:{" "}
              <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="hover:text-gold-300 text-gold-400 font-medium">
                {business.phone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${business.email}`} className="hover:text-gold-300 text-ivory-100 underline underline-offset-2">
                {business.email}
              </a>
            </p>
          </address>
          {business.showGst && business.gstNumber && (
            <p className="mt-2 text-[11.5px] text-ivory-100/60 font-mono">GSTIN: {business.gstNumber}</p>
          )}

          <div className="mt-5 border-t border-ivory-100/10 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 mb-2.5">
              Connect With Us
            </p>
            <SocialMediaLinks />
          </div>
        </div>

        {/* Col 2: Corporate & Operations */}
        <nav aria-label="Corporate">
          <h2 className="text-eyebrow !text-gold-400">Company &amp; Quality</h2>
          <ul className="mt-4 space-y-2.5 text-[13px] text-ivory-100/85">
            {corporateLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-300 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold-400/60" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3: Products & Trade */}
        <nav aria-label="Products & B2B">
          <h2 className="text-eyebrow !text-gold-400">Products &amp; Trade</h2>
          <ul className="mt-4 space-y-2.5 text-[13px] text-ivory-100/85">
            {productTradeLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-300 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold-400/60" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 4: Commercial Portals & Support */}
        <div>
          <h2 className="text-eyebrow !text-gold-400">Trade Enquiries</h2>
          <p className="mt-4 text-[13px] leading-relaxed text-ivory-100/85">
            Direct agro-processing supply from Purnea, Bihar. Ex-factory quotations, 8 kg White PP bags with 100μ liner, custom master packaging, and export container freight.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <Link href="/bulk-supply" className="btn-gold btn-sm w-full text-center">
              Request Wholesale Quote
            </Link>
            <Link href="/exports" className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 btn-sm w-full text-center">
              International Export Desk
            </Link>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello AVRELLE AGRO, I am contacting you for corporate makhana supply enquiry.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-[12px] font-medium text-gold-300 hover:underline pt-1"
            >
              Direct WhatsApp Support →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory-100/10 bg-forest-950 py-5">
        <div className="section-shell flex flex-col items-center justify-between gap-3 text-[11.5px] sm:text-[12px] text-ivory-100/60 text-center sm:text-left sm:flex-row">
          <p>
            © {new Date().getFullYear()} AVRELLE AGRO PRODUCTS PRIVATE LIMITED. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-[11px] sm:text-[11.5px]">
            {policyLinks.slice(2).map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold-300">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-[11px] sm:text-[12px]">Rooted in Mithila · Purnia, Bihar, India</p>
        </div>
      </div>
    </footer>
  );
}
