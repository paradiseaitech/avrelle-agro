"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  Droplets, 
  Sparkles, 
  CheckCircle2, 
  Info,
  Scale,
  Compass,
  ArrowRight
} from "lucide-react";
import { MITHILA_GI_CONTENT, type GIDistrict } from "@/lib/gi-content";

export function MithilaMakhanaGISection() {
  const [selectedDistrict, setSelectedDistrict] = useState<GIDistrict>(
    MITHILA_GI_CONTENT.districts[1], // Default: Purnia
  );

  return (
    <section 
      id="mithila-gi-heritage" 
      aria-labelledby="mithila-gi-heading"
      className="relative overflow-hidden bg-ivory-100/70 py-16 sm:py-24 border-t border-b border-beige-300"
    >
      <div className="section-shell">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-900">
            <Award className="h-3.5 w-3.5 text-gold-700" />
            {MITHILA_GI_CONTENT.sectionEyebrow}
          </div>
          <h2 
            id="mithila-gi-heading" 
            className="mt-4 font-serif text-[32px] leading-tight text-forest-900 sm:text-[44px]"
          >
            {MITHILA_GI_CONTENT.sectionTitle}
          </h2>
          <span className="ornament-line mt-4 block mx-auto" aria-hidden="true" />
          <p className="mt-5 text-[15.5px] leading-relaxed text-ink-700 max-w-2xl mx-auto">
            {MITHILA_GI_CONTENT.leadParagraph}
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600 max-w-2xl mx-auto">
            {MITHILA_GI_CONTENT.supportingParagraph}
          </p>
        </div>

        {/* Regional Bihar & Mithila Geographic Map & District Explorer */}
        <div className="mt-10 sm:mt-14 rounded-2xl border border-beige-300 bg-white p-4 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Interactive SVG Regional Map Graphic */}
            <div className="relative rounded-xl border border-gold-500/20 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 p-3.5 sm:p-6 text-ivory-100 overflow-hidden shadow-inner">
              <div className="absolute inset-0 botanical-grid opacity-20 pointer-events-none" />
              
              <div className="relative flex items-center justify-between border-b border-gold-500/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-gold-400" />
                  <span className="font-serif text-[14px] sm:text-[15px] font-bold text-ivory-50 tracking-wider">
                    North Bihar Makhana Wetland Basin
                  </span>
                </div>
                <span className="text-[10px] sm:text-[10.5px] uppercase tracking-widest text-gold-400 font-mono">
                  GI Geographic Origin
                </span>
              </div>

              {/* Styled Vector Canvas representing Bihar's North Wetland Corridor */}
              <div className="relative w-full aspect-[16/10] min-h-[220px] bg-forest-900/60 rounded-lg border border-gold-500/15 p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
                {/* River paths (decorative Ganga & Kosi river flows) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 400 250">
                  <path d="M 0,180 Q 150,160 250,190 T 400,210" fill="none" stroke="#C5A059" strokeWidth="3" strokeDasharray="4 2" />
                  <path d="M 230,0 Q 220,100 250,190" fill="none" stroke="#C5A059" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="310" y="225" fill="#C5A059" fontSize="9" fontFamily="serif" letterSpacing="1">Ganga Basin</text>
                  <text x="240" y="70" fill="#C5A059" fontSize="9" fontFamily="serif" letterSpacing="1">Kosi Basin</text>
                </svg>

                {/* District Hotspot Nodes */}
                <div className="relative h-full w-full">
                  {MITHILA_GI_CONTENT.districts.map((d) => {
                    const isSelected = selectedDistrict.name === d.name;
                    return (
                      <button
                        key={d.name}
                        type="button"
                        onClick={() => setSelectedDistrict(d)}
                        style={{ left: `${d.coordinates.x}%`, top: `${d.coordinates.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center focus:outline-none transition-all duration-200 z-10 ${
                          isSelected ? "scale-110" : "hover:scale-105"
                        }`}
                        aria-label={`Select district ${d.name}`}
                      >
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all ${
                          isSelected
                            ? "border-gold-300 bg-gold-500 text-forest-950 shadow-lg shadow-gold-500/40"
                            : "border-gold-400/60 bg-forest-950/90 text-gold-300 hover:border-gold-300 hover:bg-forest-900"
                        }`}>
                          <MapPin className="h-3.5 w-3.5" />
                        </span>
                        <span className={`mt-1 text-[11px] font-serif font-bold whitespace-nowrap px-2 py-0.5 rounded backdrop-blur-sm transition-colors ${
                          isSelected 
                            ? "bg-gold-500 text-forest-950 shadow-sm" 
                            : "bg-forest-950/80 text-ivory-100 group-hover:text-gold-300 border border-gold-500/20"
                        }`}>
                          {d.name.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] text-ivory-100/70 border-t border-gold-500/15 pt-2">
                  <span>Interactive Map · Click district to view agro-ecological role</span>
                  <span className="text-gold-400 font-semibold">Origin Sourcing Belt</span>
                </div>
              </div>
            </div>

            {/* Selected District Details Card */}
            <div className="space-y-4">
              <div className="rounded-xl border border-beige-300 bg-ivory-50 p-4 sm:p-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-800 bg-gold-100 px-2.5 py-1 rounded inline-block">
                  Selected Procurement Hub
                </span>
                <h3 className="mt-3 font-serif text-[22px] sm:text-[24px] font-bold text-forest-900">
                  {selectedDistrict.name}
                </h3>
                <p className="mt-1 font-serif text-[13.5px] sm:text-[14px] text-gold-900 font-semibold italic">
                  {selectedDistrict.role}
                </p>
                <p className="mt-2.5 sm:mt-3 text-[13.5px] sm:text-[14px] leading-relaxed text-ink-700">
                  {selectedDistrict.description}
                </p>

                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-beige-200/80 flex flex-col xs:flex-row xs:items-center justify-between gap-2 text-[12px] text-ink-500">
                  <span>Procurement Type: <strong>Freshwater Wetland Aggregation</strong></span>
                  <Link href="/farmer-network" className="text-forest-800 hover:text-gold-700 font-semibold flex items-center gap-1">
                    Farmer Network →
                  </Link>
                </div>
              </div>

              {/* Terroir Quality Highlights */}
              <div className="rounded-xl border border-beige-200 bg-white p-4 sm:p-5 space-y-2 text-[13px] text-ink-700">
                <h4 className="font-serif text-[15px] font-bold text-forest-900">
                  Terroir-Driven Nut Characteristics:
                </h4>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                    <span><strong>Natural Sponginess:</strong> Retains high moisture-resilience upon light clay-oven roasting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                    <span><strong>Mineral Concentration:</strong> Naturally enriched in calcium, magnesium, and plant-based protein from riverine silt.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Comprehensive In-Depth Pillars */}
        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 lg:grid-cols-3">
          {MITHILA_GI_CONTENT.pillars.map((pillar) => (
            <div 
              key={pillar.title} 
              className="rounded-2xl border border-beige-300 bg-white p-5 sm:p-7 shadow-sm flex flex-col justify-between transition-all hover:border-gold-500/50 hover:shadow-md"
            >
              <div>
                <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-forest-900">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-[12px] sm:text-[12.5px] font-semibold uppercase tracking-wider text-gold-800">
                  {pillar.tagline}
                </p>
                <span className="ornament-line mt-3 block" aria-hidden="true" />
                <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-[13px] sm:text-[13.5px] text-ink-700 leading-relaxed">
                  {pillar.content.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-600 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Preservation Callout with Official GI Logo */}
        <div className="mt-10 sm:mt-12 rounded-3xl border border-gold-500/40 bg-gradient-to-r from-gold-50/80 via-white to-gold-50/80 p-6 sm:p-8 lg:p-10 shadow-xs text-center max-w-4xl mx-auto">
          <div className="mx-auto mb-4 flex justify-center">
            <img
              src="/gitag.jpeg"
              alt="Official Mithila Makhana GI Logo (GI-696)"
              width={80}
              height={86}
              className="h-20 w-auto object-contain"
            />
          </div>
          <h3 className="font-serif text-[22px] font-bold text-charcoal-900 sm:text-[26px]">
            Preserving Authenticity for Future Generations
          </h3>
          <p className="mt-2 font-serif text-[16px] italic text-gold-700">
            &ldquo;Proudly recognized as an Authorized User of Mithila Makhana (GI-696).&rdquo;
          </p>
          <p className="mt-2 text-[12px] font-mono font-semibold text-charcoal-700">
            Authorized User Certificate Number: AU/48155/GI/696/76
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-grey max-w-2xl mx-auto">
            {MITHILA_GI_CONTENT.preservationStatement}
          </p>
          <div className="mt-6">
            <Link
              href="/mithila-makhana-gi-recognition"
              className="btn-gold inline-flex items-center gap-2 text-[13px] shadow-sm"
            >
              <Award className="h-4 w-4" />
              <span>View Official Authorized User Certificate (AU/48155/GI/696/76) &rarr;</span>
            </Link>
          </div>
        </div>

        {/* IMPORTANT LEGAL & STATUTORY GOVERNANCE BOX */}
        <div className="mt-12 rounded-2xl border border-beige-400 bg-ivory-50 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-forest-800 shrink-0 mt-1" />
            <div>
              <h4 className="font-serif text-[17px] font-bold text-forest-900">
                {MITHILA_GI_CONTENT.legalNotice.heading}
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-700">
                {MITHILA_GI_CONTENT.legalNotice.body}
              </p>
              
              <div className="mt-4 rounded-xl border border-beige-300 bg-white p-4 space-y-2 text-[12.5px] text-ink-600">
                <span className="font-semibold text-forest-900 block uppercase tracking-wider text-[11px]">
                  Institutional Brand Transparency Standards:
                </span>
                <ul className="space-y-1.5 list-disc pl-5">
                  {MITHILA_GI_CONTENT.legalNotice.compliancePoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 text-[11.5px] text-ink-500 italic">
                * Note: {MITHILA_GI_CONTENT.legalNotice.reviewStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

