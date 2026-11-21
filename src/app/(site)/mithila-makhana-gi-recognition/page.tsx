import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ExternalLink,
  Download,
  Wheat,
  Droplets,
  Flame,
  ArrowRight,
} from "lucide-react";
import { GIBadge } from "@/components/site/gi-badge";

export const metadata: Metadata = {
  title: "Mithila Makhana GI-696 Authorized User Recognition | AVRELLE AGRO",
  description:
    "AVRELLE AGRO PRODUCTS PRIVATE LIMITED is an officially recognized Authorized User of Mithila Makhana (GI-696) under certificate AU/48155/GI/696/76, based in Purnia, Bihar, India.",
  keywords: [
    "Mithila Makhana",
    "GI Authorized User Mithila Makhana",
    "GI-696",
    "AU/48155/GI/696/76",
    "Makhana company in Bihar",
    "Makhana supplier in Purnia",
    "Fox nuts supplier India",
    "Makhana wholesale",
    "Mithila Makhana bulk supply",
  ],
};

export default async function GIRecognitionPage() {
  const { giRecognition } = await getSettings();

  const certNumber = giRecognition?.certNumber || "AU/48155/GI/696/76";
  const giNumber = giRecognition?.giNumber || "GI-696";
  const entityName = giRecognition?.authorizedUserName || "AVRELLE AGRO PRODUCTS PRIVATE LIMITED";
  const certificateFileUrl = giRecognition?.certificateFileUrl;

  return (
    <div className="bg-ivory-50 text-charcoal-900">
      {/* Hero Header - Light, Elegant & Premium */}
      <section className="relative overflow-hidden bg-ivory-50 py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell relative z-10 max-w-4xl text-center">
          
          {/* Official GI Logo Display */}
          <div className="mx-auto mb-6 flex justify-center">
            <div className="rounded-2xl border border-gold-500/40 bg-white p-3 sm:p-4 shadow-sm">
              <img
                src="/gitag.jpeg"
                alt="Official Mithila Makhana GI Logo (GI-696)"
                width={120}
                height={130}
                className="h-24 sm:h-28 w-auto object-contain"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-800 shadow-xs">
            <Award className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
            <span>Official Recognition · Geographical Indication</span>
          </div>

          <h1 className="mt-5 font-serif text-[32px] sm:text-[44px] md:text-[52px] font-bold tracking-tight text-charcoal-900 leading-[1.15]">
            Celebrating the Heritage of Mithila Makhana
          </h1>

          {/* Exact statement requested by client */}
          <p className="mt-4 font-serif text-[18px] sm:text-[21px] italic text-gold-700">
            &ldquo;Proudly recognized as an Authorized User of Mithila Makhana (GI-696).&rdquo;
          </p>

          <p className="mt-4 text-[15.5px] sm:text-[17px] text-muted-grey leading-relaxed max-w-2xl mx-auto">
            <strong className="font-semibold text-charcoal-900">{entityName}</strong> has been officially recognized as an Authorized User under Certificate Number{" "}
            <span className="font-mono font-bold text-charcoal-900">{certNumber}</span>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="#certificate-view"
              className="btn-gold inline-flex items-center justify-center gap-2 text-center"
            >
              <FileText className="h-4 w-4" />
              <span>View Authorized User Certificate</span>
            </a>
            <Link
              href="/origin"
              className="btn-outline inline-flex items-center justify-center gap-2 text-center"
            >
              <span>Explore Mithila Origin</span>
              <ArrowRight className="h-4 w-4 text-gold-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* Legal & Regulatory Framework Notice */}
      <section className="border-b border-beige-200 bg-white py-8">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gold-500/30 bg-ivory-50 p-6 shadow-xs">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-[13.5px] leading-relaxed text-muted-grey">
                <p className="font-bold text-charcoal-900 uppercase tracking-wide text-[11.5px]">
                  Legal Recognition Note &amp; GI Integrity
                </p>
                <p className="mt-1">
                  A Geographical Indication (GI) identifies goods as originating in a specific territory where a given quality, reputation, or characteristic is essentially attributable to its geographical environment. <strong>Mithila Makhana</strong> is legally registered under <strong>GI-696</strong>. <strong>{entityName}</strong> holds official recognition as an <strong>Authorized User</strong> under Certificate Number <strong>{certNumber}</strong>, affirming our sourcing adherence and authentic regional processing in Bihar.
                </p>
                <p className="mt-2 text-[12px] italic text-charcoal-700">
                  Important: Avrelle Agro Products Private Limited is an Authorized User of Mithila Makhana under the Geographical Indications Registry, not the owner of the GI registration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Introduction to Mithila Makhana */}
      <section className="py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-eyebrow text-gold-700">Section 01 · Authentic Origin</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[36px] font-bold text-charcoal-900 leading-tight">
              What Distinguishes Genuine Mithila Makhana
            </h2>
            <span className="ornament-line mt-3 block" aria-hidden="true" />
            <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-muted-grey">
              Mithila Makhana (Euryale ferox Salisb.) is a celebrated aquatic superfood deeply rooted in the wetlands and perennial ponds of North Bihar. Unlike generic fox nuts produced across mixed agricultural lands, genuine Mithila Makhana is characterized by its superior puff volume, high carbohydrate-to-protein ratio, distinct natural crispness, and delicate floral aroma.
            </p>
            <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-muted-grey">
              The regional identity is forged by the alluvial silt carried down by Himalayan tributaries, coupled with the sub-tropical climate of Mithilanchal. This combination creates an unmatched aquatic micro-climate for gorgon nut cultivation.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-beige-200 pt-6">
              <div className="rounded-xl border border-beige-200 bg-white p-4 shadow-xs">
                <span className="block font-serif text-[20px] font-bold text-charcoal-900">Over 85%</span>
                <span className="mt-1 block text-[12px] text-muted-grey">Of global makhana harvest originates in Bihar&apos;s wetland belt.</span>
              </div>
              <div className="rounded-xl border border-beige-200 bg-white p-4 shadow-xs">
                <span className="block font-serif text-[20px] font-bold text-charcoal-900">GI-696</span>
                <span className="mt-1 block text-[12px] text-muted-grey">Official Geographical Indication granting regional origin protection.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-beige-300 bg-white shadow-md p-6">
              <div className="flex items-center justify-between border-b border-beige-200 pb-4">
                <span className="rounded-full bg-gold-50 px-3 py-1 text-[11px] font-mono font-semibold text-gold-800 border border-gold-200">
                  MITHILANCHAL HERITAGE
                </span>
                <img
                  src="/gitag.jpeg"
                  alt="Mithila Makhana GI Tag"
                  width={36}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="mt-6 space-y-3">
                <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-charcoal-900">
                  The Geographic Homeland
                </h3>
                <p className="text-[14px] text-muted-grey leading-relaxed">
                  Spanning Purnea, Katihar, Darbhanga, Madhubani, Saharsa, and surrounding wetland districts where centuries of generational wisdom guide every harvest.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-beige-200 flex items-center justify-between text-[12px] text-charcoal-900 font-mono font-semibold">
                <span>AU/48155/GI/696/76</span>
                <span>BIHAR, INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. Geographical & Cultural Identity and Agricultural Heritage - Light & Elegant */}
      <section className="bg-ivory-100/60 py-16 sm:py-24 border-b border-beige-200">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-700">Sections 02 &amp; 03 · Culture &amp; Agriculture</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-charcoal-900 leading-tight">
              An Inextricable Bond With Mithila’s Cultural Tapestry
            </h2>
            <span className="ornament-line mt-3 block" aria-hidden="true" />
            <p className="mt-4 text-[15px] sm:text-[16px] text-muted-grey leading-relaxed">
              In Mithila, makhana is far more than an agricultural commodity. It is an auspicious sacred emblem of hospitality, reverence, and ritual integrity. Known locally as the triad of Mithila pride—<em>&ldquo;Paan, Maachh, aur Makhan&rdquo;</em> (betel leaf, fish, and makhana)—no sacred ceremony, wedding ritual, or festive offering in Mithilanchal is complete without makhana.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-beige-300 bg-white p-6 shadow-xs">
              <Droplets className="h-8 w-8 text-gold-600" />
              <h3 className="mt-4 font-serif text-[18px] font-bold text-charcoal-900">
                Pond &amp; Wetland Ecology
              </h3>
              <p className="mt-2 text-[13px] text-muted-grey leading-relaxed">
                Thriving exclusively in stagnant, nutrient-abundant freshwater ponds and wetland oxbow lakes recharged annually by seasonal monsoons.
              </p>
            </div>

            <div className="rounded-2xl border border-beige-300 bg-white p-6 shadow-xs">
              <Wheat className="h-8 w-8 text-gold-600" />
              <h3 className="mt-4 font-serif text-[18px] font-bold text-charcoal-900">
                Traditional Grassroots Cultivators
              </h3>
              <p className="mt-2 text-[13px] text-muted-grey leading-relaxed">
                Nurtured by the indigenous Mallah community whose specialized pond-diving and seed-gathering techniques have been handed down through generations.
              </p>
            </div>

            <div className="rounded-2xl border border-beige-300 bg-white p-6 shadow-xs">
              <Flame className="h-8 w-8 text-gold-600" />
              <h3 className="mt-4 font-serif text-[18px] font-bold text-charcoal-900">
                Artisanal Popping Expertise
              </h3>
              <p className="mt-2 text-[13px] text-muted-grey leading-relaxed">
                Graduated roasting in earthen and cast-iron vessels followed by precision manual striking on wooden anvils to expand the white puffed nut.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Traditional Pond Cultivation, Harvesting & Seed Popping */}
      <section className="py-16 sm:py-20 border-b border-beige-200">
        <div className="section-shell">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-eyebrow text-gold-700">Section 04 · Generational Craft</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[36px] font-bold text-charcoal-900">
              The Journey From Pond Bed to Golden Nut
            </h2>
            <span className="ornament-line mt-3 block mx-auto" aria-hidden="true" />
            <p className="mt-3 text-[14px] sm:text-[15px] text-muted-grey">
              The processing of Mithila Makhana involves rigorous, labor-intensive artisanal steps that cannot be fully mechanized without compromising nut crunch and integrity.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-beige-300 bg-white p-5 shadow-xs">
              <div className="font-mono text-[12px] font-bold text-gold-700">STEP 01</div>
              <h4 className="mt-2 font-serif text-[16px] font-bold text-charcoal-900">Pond Sowing &amp; Submersion</h4>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-grey">
                Seeds sprout in deep silty pond beds between December and January, developing large floating thorny leaves.
              </p>
            </div>

            <div className="rounded-2xl border border-beige-300 bg-white p-5 shadow-xs">
              <div className="font-mono text-[12px] font-bold text-gold-700">STEP 02</div>
              <h4 className="mt-2 font-serif text-[16px] font-bold text-charcoal-900">Diving &amp; Guria Gathering</h4>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-grey">
                Harvesters submerge into muddy waters using curved bamboo nets (&lsquo;Kaara&rsquo;) to scoop fallen seeds from the bed.
              </p>
            </div>

            <div className="rounded-2xl border border-beige-300 bg-white p-5 shadow-xs">
              <div className="font-mono text-[12px] font-bold text-gold-700">STEP 03</div>
              <h4 className="mt-2 font-serif text-[16px] font-bold text-charcoal-900">Sun-Drying &amp; Tempering</h4>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-grey">
                Dark seeds are washed, size-sieved through graduated sieves, and sun-dried on bamboo mats to equalize inner moisture.
              </p>
            </div>

            <div className="rounded-2xl border border-beige-300 bg-white p-5 shadow-xs">
              <div className="font-mono text-[12px] font-bold text-gold-700">STEP 04</div>
              <h4 className="mt-2 font-serif text-[16px] font-bold text-charcoal-900">Thermal Roasting &amp; Popping</h4>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-grey">
                Seeds undergo controlled heat roasting before skilled artisans strike them sharply with wooden mallets to pop the white nut.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Official Certificate Section */}
      <section id="certificate-view" className="py-16 sm:py-24 border-b border-beige-200 bg-white">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl rounded-3xl border border-gold-500/40 bg-gradient-to-b from-ivory-50 to-white p-6 sm:p-10 shadow-sm">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-beige-200 pb-6">
              <div className="flex items-center gap-3">
                <img
                  src="/gitag.jpeg"
                  alt="Official Mithila Makhana GI Logo"
                  width={56}
                  height={60}
                  className="h-14 w-auto object-contain"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-700 block">
                    Statutory Registry
                  </span>
                  <h3 className="font-serif text-[20px] sm:text-[24px] font-bold text-charcoal-900">
                    Mithila Makhana Authorized User Certificate
                  </h3>
                </div>
              </div>
              <div className="rounded-full bg-gold-50 px-3 py-1 font-mono text-[12px] font-semibold text-gold-800 border border-gold-300">
                {certNumber}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-ivory-50 p-4 border border-beige-200">
                <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-muted-grey">
                  Authorized User Entity
                </span>
                <span className="mt-1 block font-serif text-[16px] font-bold text-charcoal-900">
                  {entityName}
                </span>
              </div>

              <div className="rounded-xl bg-ivory-50 p-4 border border-beige-200">
                <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-muted-grey">
                  GI Registration Reference
                </span>
                <span className="mt-1 block font-mono font-bold text-charcoal-900">
                  {giNumber} (Mithila Makhana)
                </span>
              </div>
            </div>

            {/* Certificate Document Display */}
            <div className="mt-8 rounded-2xl border border-gold-500/30 bg-white p-6 text-center">
              {certificateFileUrl ? (
                <div className="space-y-4">
                  <p className="text-[13px] font-medium text-charcoal-900">
                    Official Certificate Document is on file:
                  </p>
                  {certificateFileUrl.toLowerCase().endsWith(".pdf") ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={certificateFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline btn-sm inline-flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Open Certificate PDF</span>
                      </a>
                      <a
                        href={certificateFileUrl}
                        download="Mithila_Makhana_GI_Certificate.pdf"
                        className="btn-primary btn-sm inline-flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Certificate</span>
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <img
                        src={certificateFileUrl}
                        alt="Official Authorized User Certificate AU/48155/GI/696/76"
                        className="mx-auto max-h-96 rounded-xl border border-beige-300 shadow-sm"
                      />
                      <a
                        href={certificateFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold-700 hover:text-gold-600"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>View Full-Resolution Certificate</span>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto flex justify-center">
                    <img
                      src="/gitag.jpeg"
                      alt="Official Mithila Makhana GI Logo"
                      width={80}
                      height={86}
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-[17px] font-bold text-charcoal-900">
                      Official Authorized User Record
                    </h4>
                    <p className="mt-1 text-[13px] text-muted-grey max-w-md mx-auto">
                      Official Authorized User Certificate Reference <strong>{certNumber}</strong> is logged with the Geographical Indications Registry. Verification copies can be requested for institutional procurement.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gold-700 hover:underline"
                  >
                    Request Certified Verification Copy for Institutional Procurement &rarr;
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-muted-grey border-t border-beige-200 pt-4">
              <span>Verified Entity: {entityName}</span>
              <span>Purnia, Bihar, India</span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Commitment & Sourcing CTA */}
      <section className="py-16 sm:py-24">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-eyebrow text-gold-700">Section 07 · Responsible Sourcing</p>
              <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-charcoal-900 leading-tight">
                Upholding the Integrity of Every Harvest
              </h2>
              <span className="ornament-line mt-3 block" aria-hidden="true" />
              <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-muted-grey">
                Holding the GI Authorized User recognition is a profound responsibility. At <strong>AVRELLE AGRO PRODUCTS PRIVATE LIMITED</strong>, our commitment extends from direct grassroots farmer fair-dealings to hygienic modern grading and moisture-controlled packaging.
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  "Direct procurement with Bihar wetland cultivators, eliminating multi-layer broker dilution.",
                  "Zero chemical bleaching or artificial puffing agents — retaining 100% natural colour and crunch.",
                  "Strict size calibration adhering to authentic grading standards.",
                  "Moisture-impermeable barrier packaging to preserve freshness across domestic and international transit.",
                  "Batch-level origin traceability from registered Mithilanchal harvesting clusters.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                    <span className="text-[14px] text-charcoal-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/bulk-supply" className="btn-gold text-center">
                  Bulk Supply Enquiries
                </Link>
                <Link href="/shop" className="btn-outline text-center">
                  Browse Retail Packs
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <GIBadge variant="banner" certNumber={certNumber} giNumber={giNumber} />
              
              <div className="rounded-2xl border border-beige-300 bg-white p-6 shadow-xs">
                <h4 className="font-serif text-[18px] font-bold text-charcoal-900">
                  Partner With an Authorized User
                </h4>
                <p className="mt-2 text-[13px] text-muted-grey leading-relaxed">
                  Whether you are an FMCG manufacturer, private label dry fruit brand, organic retail chain, or export distributor, our GI Authorized User standing ensures authentic provenance and verifiable product integrity.
                </p>
                <div className="mt-4 pt-4 border-t border-beige-200 flex items-center justify-between">
                  <span className="text-[12px] font-mono text-gold-700 font-semibold">{giNumber}</span>
                  <Link href="/contact" className="text-[12px] font-semibold text-charcoal-900 hover:text-gold-700 underline">
                    Initiate Trade Dialogue →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
