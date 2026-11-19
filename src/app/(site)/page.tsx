import type { Metadata } from "next";
import {
  getSettings,
  listFeaturedProducts,
} from "@/lib/db-data";
import { ContactStrip } from "@/components/home/contact-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/hero";
import { GIAnnouncement } from "@/components/home/gi-announcement";
import { PackSizeShowcase } from "@/components/home/pack-size-showcase";
import { TrustHighlights } from "@/components/home/trust-highlights";
import { SampleDataNotice } from "@/components/site/sample-data-notice";
import { CorporateShowcase } from "@/components/home/corporate-showcase";

export const metadata: Metadata = {
  title: "AVRELLE AGRO | Authorized User of Mithila Makhana GI-696",
  description:
    "Discover AVRELLE AGRO PRODUCTS PRIVATE LIMITED, an officially recognized Authorized User of Mithila Makhana (GI-696), based in Bihar, India. Explore our makhana products, heritage, processing, and bulk supply offerings.",
  keywords: [
    "Mithila Makhana",
    "GI Authorized User Mithila Makhana",
    "Makhana company in Bihar",
    "Makhana supplier in Purnia",
    "Fox nuts supplier India",
    "Makhana wholesale",
    "Mithila Makhana bulk supply",
    "GI-696",
    "AU/48155/GI/696/76",
  ],
};

export default async function HomePage() {
  const [settings, featured] = await Promise.all([
    getSettings(),
    listFeaturedProducts(),
  ]);

  return (
    <>
      <SampleDataNotice />
      {/* 1. Hero with exact brand positioning & GI highlight */}
      <HomeHero hero={settings.hero} />

      {/* 2. Official GI Authorized User Recognition Announcement Banner */}
      <GIAnnouncement gi={settings.giRecognition} />
      
      {/* 3. Trust Highlights: Bihar Origin, Sortex Grading, Hygiene, Sourcing */}
      <TrustHighlights />

      {/* 4. Corporate Visual Storytelling: Origin, 5 Product Categories, Processing, Quality, Bulk & Exports */}
      <CorporateShowcase />

      {/* 5. Consumer Retail Packs (100g, 200g, 400g, 500g, 1 kg) with Instant Cart & COD */}
      <PackSizeShowcase products={featured} />

      {/* 6. Featured Products Catalog Grid */}
      <FeaturedProducts products={featured} />

      {/* 7. Corporate Contact Strip */}
      <ContactStrip business={settings.business} />
    </>
  );
}
