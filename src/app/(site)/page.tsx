import type { Metadata } from "next";
import { getSettings, listFeaturedProducts } from "@/lib/db-data";
import { SampleDataNotice } from "@/components/site/sample-data-notice";
import { HomeHero } from "@/components/home/hero";
import { ProductCollection } from "@/components/home/product-collection";
import { FarmToMarket } from "@/components/home/farm-to-market";
import { OurOriginSection } from "@/components/home/our-origin";
import { QualityAssuranceSection } from "@/components/home/quality-assurance-section";
import { GIRecognitionSection } from "@/components/home/gi-recognition-section";
import { PackSizeShowcase } from "@/components/home/pack-size-showcase";
import { ContactStrip } from "@/components/home/contact-strip";

export const metadata: Metadata = {
  title: "AVRELLE AGRO | Authorized User of Mithila Makhana GI-696",
  description:
    "Discover AVRELLE AGRO PRODUCTS PRIVATE LIMITED, an officially recognized Authorized User of Mithila Makhana (GI-696), based in Purnea, Bihar, India. Explore our makhana collection, farm-to-market journey, and bulk supply.",
  keywords: [
    "Mithila Makhana",
    "GI Authorized User Mithila Makhana",
    "Makhana company in Bihar",
    "Makhana supplier in Purnea",
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

      {/* Section 1: Hero Banner */}
      <HomeHero hero={settings.hero} />

      {/* Section 2: Product Collection (Raw, Graded, Roasted, Flavoured) */}
      <ProductCollection />

      {/* Section 3: From Farm to Market (6-Stage Visual Journey) */}
      <FarmToMarket />

      {/* Section 4: Our Origin (Rooted in Mithila) */}
      <OurOriginSection />

      {/* Section 5: Quality Assurance (Quality at Every Step) */}
      <QualityAssuranceSection />

      {/* Section 6: GI Recognition (Official GI-696 Logo & Statement) */}
      <GIRecognitionSection gi={settings.giRecognition} />

      {/* Retail Packs Direct Purchase (100g to 1kg with COD & Instant Cart) */}
      <PackSizeShowcase products={featured} />

      {/* Direct Contact & Support Strip */}
      <ContactStrip business={settings.business} />
    </>
  );
}
