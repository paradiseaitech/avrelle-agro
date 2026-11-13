import { getSettings } from "@/lib/db-data";
import { CartProvider } from "@/components/cart/cart-context";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { FloatingSupport } from "@/components/site/floating-support";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const { business } = await getSettings();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.displayName,
    description: "Makhana (fox nuts) business based in Purnea, Bihar, India.",
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city || "Purnea",
      addressRegion: business.state || "Bihar",
      addressCountry: "IN",
    },
    telephone: business.phone,
    email: business.email,
    url: siteUrl,
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingSupport phone={business.phone} whatsapp={business.whatsapp} />
    </CartProvider>
  );
}
