import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";
import {
  Award,
  ShieldCheck,
  MapPin,
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
    <div className="bg-ivory-50 text-forest-950">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-forest-950 py-16 sm:py-24 text-ivory-100 border-b border-gold-500/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-forest-800/40 via-forest-950/80 to-forest-950 pointer-events-none" />
        <div className="section-shell relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 bg-forest-900/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300 shadow-sm backdrop-blur-sm">
            <Award className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
            <span>Official Recognition · Geographical Indication</span>
          </div>

          <h1 className="mt-6 font-serif text-[32px] sm:text-[44px] md:text-[52px] font-bold tracking-tight text-ivory-50 leading-[1.15]">
            Celebrating the Heritage of Mithila Makhana
          </h1>

          <p className="mt-5 text-[16px] sm:text-[18px] text-ivory-200/90 leading-relaxed font-light max-w-3xl mx-auto">
            <strong className="font-semibold text-gold-300">{entityName}</strong> has been officially recognized as an Authorized User of{" "}
            <strong className="font-semibold text-ivory-50">Mithila Makhana ({giNumber})</strong> under Certificate Number{" "}
            <span className="font-mono font-medium text-gold-300">{certNumber}</span>.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#certificate-view"
              className="inline-flex items-center gap-2 rounded bg-gold-500 px-6 py-3 text-[13px] font-semibold text-forest-950 shadow-md transition-all hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <FileText className="h-4 w-4" />
              <span>View Authorized User Certificate</span>
            </a>
            <Link
              href="/origin"
              className="inline-flex items-center gap-2 rounded border border-ivory-100/30 bg-forest-900/50 px-6 py-3 text-[13px] font-semibold text-ivory-100 transition-all hover:bg-forest-900 focus:outline-none"
            >
              <span>Explore Mithila Origin</span>
              <ArrowRight className="h-4 w-4 text-gold-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Legal & Regulatory Framework Notice */}
      <section className="border-b border-beige-300/80 bg-ivory-100 py-6">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl rounded-lg border border-gold-500/30 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3.5">
              <ShieldCheck className="h-6 w-6 text-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-[13px] leading-relaxed text-ink-600">
                <p className="font-semibold text-forest-950 uppercase tracking-wide text-[11.5px]">
                  Legal Recognition Note &amp; GI Integrity
                </p>
                <p className="mt-1">
                  A Geographical Indication (GI) identifies goods as originating in a specific territory where a given quality, reputation, or characteristic is essentially attributable to its geographical environment. <strong>Mithila Makhana</strong> is legally registered under <strong>GI-696</strong>. <strong>{entityName}</strong> holds official recognition as an <strong>Authorized User</strong> under Certificate Number <strong>{certNumber}</strong>, affirming our sourcing adherence and authentic regional processing in Bihar.
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
            <h2 className="mt-2 font-serif text-[28px] sm:text-[36px] font-bold text-forest-950 leading-tight">
              What Distinguishes Genuine Mithila Makhana
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-600">
              Mithila Makhana (Euryale ferox Salisb.) is a celebrated aquatic superfood deeply rooted in the wetlands and perennial ponds of North Bihar. Unlike generic fox nuts produced across mixed agricultural lands, genuine Mithila Makhana is characterized by its superior puff volume, high carbohydrate-to-protein ratio, distinct natural crispness, and delicate floral aroma.
            </p>
            <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-ink-600">
              The regional identity is forged by the alluvial silt carried down by Himalayan tributaries, coupled with the sub-tropical climate of Mithilanchal. This combination creates an unmatched aquatic micro-climate for gorgon nut cultivation.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-beige-200 pt-6">
              <div className="rounded border border-beige-200 bg-white p-4">
                <span className="block font-serif text-[20px] font-bold text-forest-900">Over 85%</span>
                <span className="mt-1 block text-[12px] text-ink-500">Of global makhana harvest originates in Bihar's wetland belt.</span>
              </div>
              <div className="rounded border border-beige-200 bg-white p-4">
                <span className="block font-serif text-[20px] font-bold text-forest-900">GI-696</span>
                <span className="mt-1 block text-[12px] text-ink-500">Official Geographical Indication granting regional origin protection.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-beige-300 bg-white shadow-lg">
              <div className="aspect-[4/3] bg-gradient-to-tr from-forest-900 to-forest-800 p-8 flex flex-col justify-between text-ivory-100">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-gold-500/20 px-3 py-1 text-[11px] font-mono font-semibold text-gold-300">
                    MITHILANCHAL HERITAGE
                  </span>
                  <MapPin className="h-5 w-5 text-gold-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-[22px] sm:text-[26px] font-bold text-ivory-50">
                    The Geographic Homeland
                  </h3>
                  <p className="text-[13px] text-ivory-200/90 leading-relaxed">
                    Spanning Purnia, Katihar, Darbhanga, Madhubani, Saharsa, and surrounding wetland districts where centuries of generational wisdom guide every harvest.
                  </p>
                </div>
                <div className="pt-4 border-t border-forest-700/60 flex items-center justify-between text-[11.5px] text-gold-300 font-mono">
                  <span>AU/48155/GI/696/76</span>
                  <span>BIHAR, INDIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. Geographical & Cultural Identity and Agricultural Heritage */}
      <section className="bg-forest-950 py-16 sm:py-24 text-ivory-100 border-b border-gold-500/30">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-gold-400">Sections 02 &amp; 03 · Culture &amp; Agriculture</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-ivory-50 leading-tight">
              An Inextricable Bond With Mithila’s Cultural Tapestry
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] text-ivory-200/90 leading-relaxed">
              In Mithila, makhana is far more than an agricultural commodity. It is an auspicious sacred emblem of hospitality, reverence, and ritual integrity. Known locally as the triad of Mithila pride—<em>"Paan, Maachh, aur Makhan"</em> (betel leaf, fish, and makhana)—no sacred ceremony, wedding ritual, or festive offering in Mithilanchal is complete without makhana.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gold-500/20 bg-forest-900/60 p-6 backdrop-blur-sm">
              <Droplets className="h-8 w-8 text-gold-400" />
              <h3 className="mt-4 font-serif text-[18px] font-semibold text-ivory-100">
                Pond &amp; Wetland Ecology
              </h3>
              <p className="mt-2 text-[13px] text-ivory-200/80 leading-relaxed">
                Thriving exclusively in stagnant, nutrient-abundant freshwater ponds and wetland oxbow lakes recharged annually by seasonal monsoons.
              </p>
            </div>

            <div className="rounded-lg border border-gold-500/20 bg-forest-900/60 p-6 backdrop-blur-sm">
              <Wheat className="h-8 w-8 text-gold-400" />
              <h3 className="mt-4 font-serif text-[18px] font-semibold text-ivory-100">
                Traditional Grassroots Cultivators
              </h3>
              <p className="mt-2 text-[13px] text-ivory-200/80 leading-relaxed">
                Nurtured by the indigenous Mallah community whose specialized pond-diving and seed-gathering techniques have been handed down through generations.
              </p>
            </div>

            <div className="rounded-lg border border-gold-500/20 bg-forest-900/60 p-6 backdrop-blur-sm">
              <Flame className="h-8 w-8 text-gold-400" />
              <h3 className="mt-4 font-serif text-[18px] font-semibold text-ivory-100">
                Artisanal Popping Expertise
              </h3>
              <p className="mt-2 text-[13px] text-ivory-200/80 leading-relaxed">
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
            <h2 className="mt-2 font-serif text-[28px] sm:text-[36px] font-bold text-forest-950">
              The Journey From Pond Bed to Golden Nut
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-ink-600">
              The processing of Mithila Makhana involves rigorous, labor-intensive artisanal steps that cannot be fully mechanized without compromising nut crunch and integrity.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-beige-300 bg-white p-5 shadow-sm">
              <div className="font-mono text-[12px] font-bold text-gold-700">STEP 01</div>
              <h4 className="mt-2 font-serif text-[16px] font-bold text-forest-950">Pond Sowing &amp; Submersion</h4>
              <p className="mt-2 text-[12.5px] text-ink-600 leading-relaxed">
                Seeds germinate beneath the water surface between December and February. Prickly broad leaves spread across pond water, flowering with delicate purple blooms.
              </p>
            </div>

            <div className="rounded-lg border border-beige-300 bg-white p-5 shadow-sm">
              <div className="font-mono text-[12px] font-bold text-gold-700">STEP 02</div>
              <h4 className="mt-2 font-serif text-[16px] font-bold text-forest-950">Skilled Bed Diving</h4>
              <p className="mt-2 text-[12.5px] text-ink-600 leading-relaxed">
                Between July and October, harvesters dive to the muddy pond bed holding bamboo sieves (<em>gaanja</em>) to scoop and collect dark, heavy seeds from the silt.
              </p>
            </div>

            <div className="rounded-lg border border-beige-300 bg-white p-5 shadow-sm">
              <div className="font-mono text-[12px] font-bold text-gold-700">STEP 03</div>
              <h4 className="mt-2 font-serif text-[16px] font-bold text-forest-950">Grading &amp; Sun-Drying</h4>
              <p className="mt-2 text-[12.5px] text-ink-600 leading-relaxed">
                Cleaned raw seeds are sun-dried on clean mats to stabilize internal moisture, then passed through multi-aperture sieves into distinct size classifications.
              </p>
            </div>

            <div className="rounded-lg border border-beige-300 bg-white p-5 shadow-sm">
              <div className="font-mono text-[12px] font-bold text-gold-700">STEP 04</div>
              <h4 className="mt-2 font-serif text-[16px] font-bold text-forest-950">Double Roasting &amp; Popping</h4>
              <p className="mt-2 text-[12.5px] text-ink-600 leading-relaxed">
                Seeds are pre-heated in earthen pots, rested, then rapid-roasted over intense fire and struck with wooden mallets (<em>thapi</em>) to pop into pristine white nuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 & 6. AVRELLE's Authorized User Recognition & Certificate Display */}
      <section id="certificate-view" className="bg-ivory-100 py-16 sm:py-24 border-b border-beige-300">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow text-gold-700">Sections 05 &amp; 06 · Official Credentials</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-forest-950">
              Official Authorized User Certificate
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-ink-600 leading-relaxed">
              Issued under the Geographical Indications of Goods (Registration &amp; Protection) Act.
            </p>
          </div>

          <div className="mt-12 mx-auto max-w-3xl">
            {/* Elegant Certificate Showcase Card */}
            <div className="relative rounded-xl border-2 border-gold-500/50 bg-white p-6 sm:p-10 shadow-xl">
              {/* Gold Filigree Corner Accents */}
              <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-gold-600" />
              <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-gold-600" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-gold-600" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-gold-600" />

              <div className="text-center border-b border-beige-200 pb-6">
                <div className="mx-auto inline-flex items-center justify-center rounded-full bg-gold-500/10 p-3 border border-gold-500/40 text-gold-700">
                  <Award className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mt-3 font-serif text-[22px] sm:text-[26px] font-bold uppercase tracking-wider text-forest-950">
                  Authorized User Recognition
                </h3>
                <p className="mt-1 text-[13px] font-serif italic text-gold-800">
                  Geographical Indication · Mithila Makhana
                </p>
              </div>

              {/* Certificate Details Grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 text-[13.5px]">
                <div className="rounded bg-ivory-50 p-4 border border-beige-200">
                  <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-ink-500">
                    Authorized User Name
                  </span>
                  <span className="mt-1 block font-semibold text-forest-950">
                    {entityName}
                  </span>
                </div>

                <div className="rounded bg-ivory-50 p-4 border border-beige-200">
                  <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-ink-500">
                    Authorized User Certificate No.
                  </span>
                  <span className="mt-1 block font-mono font-bold text-forest-950">
                    {certNumber}
                  </span>
                </div>

                <div className="rounded bg-ivory-50 p-4 border border-beige-200">
                  <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-ink-500">
                    Registered GI Reference
                  </span>
                  <span className="mt-1 block font-mono font-bold text-forest-950">
                    {giNumber} (Mithila Makhana)
                  </span>
                </div>

                <div className="rounded bg-ivory-50 p-4 border border-beige-200">
                  <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-ink-500">
                    Origin Territory
                  </span>
                  <span className="mt-1 block font-semibold text-forest-950">
                    Mithila Region · Bihar, India
                  </span>
                </div>
              </div>

              {/* Certificate Document Display / Viewer */}
              <div className="mt-8 rounded-lg border border-dashed border-gold-500/40 bg-gold-500/5 p-6 text-center">
                {certificateFileUrl ? (
                  <div className="space-y-4">
                    <p className="text-[13px] font-medium text-forest-900">
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
                          className="mx-auto max-h-96 rounded border border-beige-300 shadow"
                        />
                        <a
                          href={certificateFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-forest-800 hover:text-gold-700"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>View Full-Resolution Certificate</span>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ShieldCheck className="mx-auto h-8 w-8 text-gold-600" aria-hidden="true" />
                    <div>
                      <h4 className="font-serif text-[16px] font-bold text-forest-950">
                        Official Authorized User Record
                      </h4>
                      <p className="mt-1 text-[12.5px] text-ink-600 max-w-md mx-auto">
                        Official Authorized User Certificate Reference <strong>{certNumber}</strong> is verified and logged. Document scans can be inspected by buyers and partners upon formal enquiry.
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gold-800 hover:text-forest-900 underline"
                    >
                      Request Certified Verification Copy for Institutional Procurement &rarr;
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-ink-500 border-t border-beige-200 pt-4">
                <span>Verified Entity: {entityName}</span>
                <span>Purnia, Bihar, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Commitment to Origin Authenticity & Responsible Sourcing */}
      <section className="py-16 sm:py-24">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-eyebrow text-gold-700">Section 07 · Responsible Sourcing</p>
              <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] font-bold text-forest-950 leading-tight">
                Upholding the Integrity of Every Harvest
              </h2>
              <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-ink-600">
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
                    <span className="text-[14px] text-ink-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/bulk-supply" className="btn-primary">
                  Bulk Supply Enquiries
                </Link>
                <Link href="/shop" className="btn-outline">
                  Browse Retail Packs
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <GIBadge variant="banner" certNumber={certNumber} giNumber={giNumber} />
              
              <div className="rounded-lg border border-beige-300 bg-white p-6 shadow-sm">
                <h4 className="font-serif text-[18px] font-bold text-forest-950">
                  Partner With an Authorized User
                </h4>
                <p className="mt-2 text-[13px] text-ink-600 leading-relaxed">
                  Whether you are an FMCG manufacturer, private label dry fruit brand, organic retail chain, or export distributor, our GI Authorized User standing ensures authentic provenance and verifiable product integrity.
                </p>
                <div className="mt-4 pt-4 border-t border-beige-200 flex items-center justify-between">
                  <span className="text-[12px] font-mono text-gold-700">{certNumber}</span>
                  <Link href="/contact" className="text-[12px] font-semibold text-forest-900 hover:text-gold-700">
                    Contact Procurement Team &rarr;
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

