import Link from "next/link";
import { Award, ShieldCheck, ChevronRight } from "lucide-react";

interface GIBadgeProps {
  variant?: "compact" | "card" | "banner" | "subtle" | "logo";
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
        className={`inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-charcoal-900 shadow-xs transition-all hover:border-gold-500 hover:shadow-sm ${className}`}
      >
        <img
          src="/gitag.jpeg"
          alt="Official Mithila Makhana GI Logo"
          width={18}
          height={20}
          className="h-4 w-auto object-contain shrink-0"
        />
        <span className="truncate">Authorized User · {giNumber}</span>
      </span>
    );
    return href ? (
      <Link href={href} aria-label="View Mithila Makhana GI-696 Authorized User Recognition">
        {content}
      </Link>
    ) : (
      content
    );
  }

  if (variant === "subtle") {
    const content = (
      <div
        className={`inline-flex items-center gap-2.5 rounded-lg border border-beige-300 bg-white px-3 py-2 text-charcoal-900 shadow-xs transition-colors hover:border-gold-500/60 ${className}`}
      >
        <img
          src="/gitag.jpeg"
          alt="Official Mithila Makhana GI Logo"
          width={32}
          height={35}
          className="h-7 w-auto object-contain shrink-0"
        />
        <div className="text-left leading-tight">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-charcoal-900">
            Authorized User · Mithila Makhana
          </p>
          <p className="font-mono text-[10px] text-gold-700 mt-0.5">
            {giNumber} | {certNumber}
          </p>
        </div>
      </div>
    );
    return href ? (
      <Link href={href} aria-label="Explore our GI recognition details">
        {content}
      </Link>
    ) : (
      content
    );
  }

  if (variant === "banner") {
    const content = (
      <div
        className={`relative overflow-hidden rounded-xl border border-gold-500/30 bg-gradient-to-r from-ivory-50 via-white to-ivory-50 p-4 sm:p-5 text-charcoal-900 shadow-xs ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="rounded-lg bg-white p-1.5 border border-gold-500/30 shadow-xs shrink-0">
              <img
                src="/gitag.jpeg"
                alt="Official Mithila Makhana GI Logo"
                width={52}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700">
                  Official Recognition · GI-696
                </span>
                <span className="rounded bg-sage-100 px-2 py-0.5 text-[9.5px] font-semibold text-sage-700 border border-sage-200">
                  Government of India
                </span>
              </div>
              <h4 className="mt-1 font-serif text-[16px] sm:text-[18px] font-bold text-charcoal-900">
                Authorized User – Mithila Makhana
              </h4>
              <p className="mt-0.5 text-[12px] text-muted-grey">
                Certificate No: <span className="font-mono font-bold text-charcoal-900">{certNumber}</span>
                {" · "}AVRELLE AGRO PRODUCTS PRIVATE LIMITED
              </p>
            </div>
          </div>
          {href && (
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-gold-700 transition-transform group-hover:translate-x-1 shrink-0 self-end sm:self-center">
              <span>View Recognition</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    );
    return href ? (
      <Link href={href} className="group block focus:outline-none">
        {content}
      </Link>
    ) : (
      content
    );
  }

  // Default: "card" variant
  const cardContent = (
    <div
      className={`relative rounded-xl border border-beige-300 bg-white p-4 shadow-xs transition-all hover:border-gold-500 hover:shadow-md ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="rounded-lg bg-ivory-50 p-1.5 border border-beige-200 shrink-0">
          <img
            src="/gitag.jpeg"
            alt="Official Mithila Makhana GI Logo"
            width={44}
            height={48}
            className="h-10 w-auto object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700">
            Authorized User – Mithila Makhana
          </p>
          <div className="mt-1 flex items-baseline gap-2 font-mono text-[11.5px] text-charcoal-900">
            <span className="font-bold text-charcoal-900">{giNumber}</span>
            <span className="text-muted-grey">|</span>
            <span className="truncate text-muted-grey font-medium">{certNumber}</span>
          </div>
          <p className="mt-1 text-[11.5px] text-muted-grey leading-snug">
            AVRELLE AGRO PRODUCTS PRIVATE LIMITED
          </p>
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link
      href={href}
      className="group block focus:outline-none"
      aria-label="Explore Mithila Makhana GI Authorized User Recognition"
    >
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
