import type { Metadata } from "next";
import {
  getSettings,
  listFeaturedProducts,
} from "@/lib/db-data";
import { BrandStory } from "@/components/home/brand-story";
import { ContactStrip } from "@/components/home/contact-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/hero";
import { PackSizeShowcase } from "@/components/home/pack-size-showcase";
import { RetailVsBulk } from "@/components/home/retail-vs-bulk";
import { TrustHighlights } from "@/components/home/trust-highlights";
import { SampleDataNotice } from "@/components/site/sample-data-notice";

export const metadata: Metadata = {
  title: "AVRELLE AGRO PVT LTD — Premium Makhana from Purnea, Bihar",
  description:
    "Premium phool makhana directly from Purnea, Bihar in 100g, 200g, 400g, 500g, and 1kg retail packs with Cash on Delivery, or wholesale bulk supply in 8kg White PP bags.",
};

export default async function HomePage() {
  const [settings, featured] = await Promise.all([
    getSettings(),
    listFeaturedProducts(),
  ]);

  return (
    <>
      <SampleDataNotice />
      <HomeHero hero={settings.hero} />
      <TrustHighlights />
      {/* Pack Size Showcase: 100g, 200g, 400g, 500g, 1kg retail options */}
      <PackSizeShowcase products={featured} />
      <FeaturedProducts products={featured} />
      <RetailVsBulk />
      <BrandStory story={settings.homeContent} />
      <ContactStrip business={settings.business} />
    </>
  );
}
