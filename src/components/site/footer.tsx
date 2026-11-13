import Link from "next/link";
import { getSettings } from "@/lib/db-data";
import { SocialMediaLinks } from "@/components/site/social-links";

const shopLinks = [
  { href: "/shop", label: "Shop All Makhana" },
  { href: "/#pack-size-heading", label: "100g Pocket Pack" },
  { href: "/#pack-size-heading", label: "200g Daily Pack" },
  { href: "/#pack-size-heading", label: "400g Family Pack" },
  { href: "/#pack-size-heading", label: "500g Pantry Pack" },
  { href: "/#pack-size-heading", label: "1 kg Mega Pack" },
];

const infoLinks = [
  { href: "/about", label: "About Us" },
  { href: "/bulk-orders", label: "Bulk Rate Card & Enquiry" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact Us" },
];

const policyLinks = [
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/returns-policy", label: "Cancellation & Returns" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export async function SiteFooter() {
  const { business } = await getSettings();
  const waNumber = business.whatsapp.replace(/\D/g, "");

  return (
    <footer className="mt-auto bg-forest-900 text-ivory-100">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Col 1: Brand, Address & Social Icons */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/brand/logo-mark.svg" alt="" width={40} height={40} className="h-10 w-10" aria-hidden="true" />
            <div>
              <p className="font-serif text-lg tracking-[0.22em] text-ivory-50">AVRELLE</p>
              <p className="mt-0.5 text-[8.5px] font-semibold uppercase tracking-luxe text-gold-400">
                Agro Pvt Ltd
              </p>
            </div>
          </div>
          <p className="mt-4 font-serif text-sm italic text-gold-300">{business.tagline}</p>
          <address className="mt-4 space-y-1 text-[13px] not-italic text-ivory-100/80">
            <p>{business.addressLine}, {business.state}, India</p>
            <p>
              <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="hover:text-gold-300">
                {business.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${business.email}`} className="hover:text-gold-300">
                {business.email}
              </a>
            </p>
          </address>
          {business.showGst && business.gstNumber && (
            <p className="mt-3 text-[12px] text-ivory-100/60">GSTIN: {business.gstNumber}</p>
          )}

          {/* Social media placeholder icons */}
          <div className="mt-5 border-t border-ivory-100/10 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 mb-2.5">
              Connect With Us
            </p>
            <SocialMediaLinks />
          </div>
        </div>

        {/* Col 2: Retail Pack Sizes */}
        <nav aria-label="Shop">
          <h2 className="text-eyebrow !text-gold-400">Retail Pack Sizes</h2>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-ivory-100/85">
            {shopLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3: Company & Policies */}
        <nav aria-label="Information">
          <h2 className="text-eyebrow !text-gold-400">Information</h2>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-ivory-100/85">
            {infoLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
            {policyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 4: Bulk Supply & Rate Card */}
        <div>
          <h2 className="text-eyebrow !text-gold-400">Bulk &amp; Wholesale</h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-ivory-100/85">
            Official 8-tier wholesale supply direct from Purnea, Bihar (Ref: AVA/QTN/2026/038).
            Standard 8 kg White PP bags with 100μ liner starting at ₹350/kg.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Link href="/bulk-orders" className="btn-gold btn-sm w-fit">
              View Bulk Rate Card
            </Link>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello AVRELLE AGRO, I would like to enquire about bulk makhana quotation.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold btn-sm w-fit"
            >
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory-100/10">
        <div className="section-shell flex flex-col items-center justify-between gap-3 py-5 text-[12px] text-ivory-100/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} AVRELLE AGRO PVT LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-gold-400/80">Socials:</span>
            <SocialMediaLinks buttonSize="h-7 w-7" iconSize="h-3.5 w-3.5" />
          </div>
          <p>Makhana (Fox Nuts) · Purnea, Bihar, India</p>
        </div>
      </div>
    </footer>
  );
}
