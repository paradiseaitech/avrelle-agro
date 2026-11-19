import Link from "next/link";
import { Award, ShieldCheck, ChevronRight } from "lucide-react";

interface GIBadgeProps {
  variant?: "compact" | "card" | "banner" | "subtle";
  certNumber?: string;
  giNumber?: string;
  className?: string;
  href?: string;
}

export function GIBadge({
  variant = "card",
  certNumber = "AU/48155/GI/696/76",
  giNumber = "GI-696",
  className = "",
  href = "/mithila-makhana-gi-recognition",
}: GIBadgeProps) {
  if (variant === "compact") {
    const content = (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-gold-500/50 bg-forest-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-300 shadow-sm backdrop-blur-sm transition-all hover:border-gold-400 hover:text-gold-200 ${className}`}
      >
        <Award className="h-3 w-3 text-gold-400 shrink-0" aria-hidden="true" />
        <span className="truncate">GI-696 Authorized User</span>
      </span>
    );
    return href ? <Link href={href} aria-label="View Mithila Makhana GI-696 Authorized User Recognition">{content}</Link> : content;
  }

  if (variant === "subtle") {
    const content = (
      <div
        className={`inline-flex items-center gap-2 rounded border border-gold-500/30 bg-forest-900/10 px-3 py-1.5 text-forest-950 transition-colors hover:border-gold-500/60 ${className}`}
      >
        <ShieldCheck className="h-4 w-4 text-gold-600 shrink-0" aria-hidden="true" />
        <div className="text-left leading-tight">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-forest-900">
            Authorized User · Mithila Makhana
          </p>
          <p className="font-mono text-[9.5px] text-gold-800">
            {giNumber} | {certNumber}
          </p>
        </div>
      </div>
    );
    return href ? <Link href={href} aria-label="Explore our GI recognition details">{content}</Link> : content;
  }

  if (variant === "banner") {
    const content = (
      <div
        className={`relative overflow-hidden rounded-lg border border-gold-500/40 bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 p-4 sm:p-5 text-ivory-50 shadow-md ${className}`}
      >
        {/* Subtle decorative gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/20 via-gold-400 to-gold-500/20" />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-gold-500/10 p-2.5 border border-gold-500/30 text-gold-400 shrink-0">
              <Award className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  Official Recognition
                </span>
                <span className="rounded bg-gold-500/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-gold-300">
                  {giNumber}
                </span>
              </div>
              <h4 className="mt-1 font-serif text-[16px] sm:text-[18px] font-semibold text-ivory-100">
                Authorized User – Mithila Makhana
              </h4>
              <p className="mt-0.5 font-mono text-[11px] text-ivory-300/80">
                Certificate No: <span className="text-gold-300 font-medium">{certNumber}</span>
              </p>
            </div>
          </div>
          {href && (
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-gold-300 transition-transform group-hover:translate-x-1 shrink-0 self-end sm:self-center">
              <span>View Recognition</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    );
    return href ? <Link href={href} className="group block focus:outline-none">{content}</Link> : content;
  }

  // Default: "card" variant
  const cardContent = (
    <div
      className={`relative rounded-lg border border-gold-500/40 bg-gradient-to-br from-forest-950 to-forest-900 p-4 text-ivory-50 shadow-sm transition-all hover:border-gold-400 hover:shadow-md ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-gold-500/15 p-2 text-gold-300 border border-gold-500/30 shrink-0">
          <Award className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
            Authorized User – Mithila Makhana
          </p>
          <div className="mt-1 flex items-baseline gap-2 font-mono text-[11.5px] text-ivory-200">
            <span className="font-semibold text-gold-300">{giNumber}</span>
            <span className="text-ivory-400">|</span>
            <span className="truncate text-ivory-300">{certNumber}</span>
          </div>
          <p className="mt-1 text-[11px] text-ivory-300/90 leading-snug">
            AVRELLE AGRO PRODUCTS PRIVATE LIMITED
          </p>
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="group block focus:outline-none" aria-label="Explore Mithila Makhana GI Authorized User Recognition">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}

