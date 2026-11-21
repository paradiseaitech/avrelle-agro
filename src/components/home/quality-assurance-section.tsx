import Link from "next/link";
import { ShieldCheck, Factory, Gauge, Sparkles, ArrowRight } from "lucide-react";

interface QualityStep {
  title: string;
  description: string;
  metric: string;
  icon: typeof ShieldCheck;
}

const QUALITY_CARDS: QualityStep[] = [
  {
    title: "Raw Seed Grading",
    description: "Inspection of Guria seeds for moisture, size distribution, and density.",
    metric: "Intake Density",
    icon: Gauge,
  },
  {
    title: "Hygienic Processing",
    description: "Food-grade stainless steel surfaces with zero chemical bleaching agents.",
    metric: "SS304 Sanitary",
    icon: Factory,
  },
  {
    title: "Precision Sorting",
    description: "Multi-stage optical defect elimination and calibrated suta mesh classification.",
    metric: "Sortex Sizing",
    icon: Sparkles,
  },
  {
    title: "Moisture & Packaging Checks",
    description: "Controlled sub-3% moisture testing with barrier nitrogen-flushed sealing.",
    metric: "Sub-3% Moisture",
    icon: ShieldCheck,
  },
];

export function QualityAssuranceSection() {
  return (
    <section className="bg-ivory-100/50 py-16 sm:py-20 lg:py-24 border-b border-beige-200">
      <div className="section-shell">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-eyebrow">Zero Compromise</p>
          <h2 className="mt-2 font-serif text-[28px] sm:text-[36px] lg:text-[40px] font-bold text-charcoal-900 tracking-tight">
            Quality at Every Step
          </h2>
          <span className="ornament-line mt-3 block mx-auto" aria-hidden="true" />
          <p className="mt-4 text-[15px] sm:text-[16px] text-muted-grey">
            Rigorous food safety protocols and precision mechanical grading protect every bag we pack.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="mt-12 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {QUALITY_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group flex flex-col justify-between rounded-2xl border border-beige-300 bg-white p-6 shadow-xs transition-all duration-300 hover:border-gold-500 hover:shadow-md hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ivory-50 text-gold-700 border border-beige-200 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-muted-grey">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-[18px] font-bold text-charcoal-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-grey">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-beige-100 flex items-center justify-between text-[11.5px]">
                  <span className="text-muted-grey">Benchmark:</span>
                  <span className="font-semibold text-charcoal-900">{card.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Detailed Quality Assurance Page */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/quality-assurance"
            className="btn-gold inline-flex items-center gap-2 !py-3 !px-7 !text-[13px] shadow-sm hover:shadow"
          >
            <span>Explore Our Full 5-Stage Quality Protocol</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
