"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  PhoneCall, 
  Building2, 
  ShieldCheck, 
  Globe, 
  Layers, 
  ArrowRight,
  MessageCircle
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export type NavEntry = 
  | { type: "link"; label: string; href: string }
  | { type: "group"; label: string; items: NavItem[]; align?: "left" | "right" | "center" };

export const PRIMARY_NAV: NavEntry[] = [
  { type: "link", label: "Home", href: "/" },
  {
    type: "group",
    label: "Company",
    align: "left",
    items: [
      {
        label: "About Us",
        href: "/about",
        description: "Corporate background, vision, mission, and governance",
      },
      {
        label: "GI Recognition (GI-696)",
        href: "/mithila-makhana-gi-recognition",
        description: "Official Authorized User recognition · Certificate AU/48155/GI/696/76",
        badge: "Official",
      },
      {
        label: "Our Origin",
        href: "/origin",
        description: "Mithila heritage, Purnia terroir & GI tag ecosystem",
        badge: "Terroir",
      },
      {
        label: "Farmer Network",
        href: "/farmer-network",
        description: "Sourcing partnerships, ethical procurement & harvesting",
      },
    ],
  },
  {
    type: "group",
    label: "Products",
    align: "center",
    items: [
      {
        label: "Our Products",
        href: "/products",
        description: "Complete portfolio: Raw, Graded, Roasted, Flavoured & Powder",
        badge: "Portfolio",
      },
      {
        label: "Makhana Grades",
        href: "/grades",
        description: "Standard suta grading (3 to 6+ Suta) and size metrics",
      },
      {
        label: "Shop Retail Packs",
        href: "/shop",
        description: "100g, 200g, 400g, 500g & 1 kg packs with Cash on Delivery",
        badge: "Online Store",
      },
    ],
  },
  {
    type: "group",
    label: "Quality & Facility",
    align: "center",
    items: [
      {
        label: "Manufacturing",
        href: "/manufacturing",
        description: "10-stage processing journey, sortex grading & facility",
      },
      {
        label: "Quality Assurance",
        href: "/quality-assurance",
        description: "Hygiene protocols, food safety, nutrition transparency & testing",
      },
      {
        label: "Certifications",
        href: "/certifications",
        description: "FSSAI, GST, IEC, APEDA & compliance framework",
      },
    ],
  },
  {
    type: "group",
    label: "Trade & B2B",
    align: "right",
    items: [
      {
        label: "Bulk Supply",
        href: "/bulk-supply",
        description: "Wholesale 8 kg PP bags, 8 commercial tiers & instant RFQ",
        badge: "Domestic B2B",
      },
      {
        label: "Exports",
        href: "/exports",
        description: "Global supply, FCL/LCL logistics, sea freight & documentation",
        badge: "International",
      },
    ],
  },
  { type: "link", label: "Contact", href: "/contact" },
];

export function DesktopNav() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main navigation">
      {PRIMARY_NAV.map((entry) => {
        if (entry.type === "link") {
          const active = pathname === entry.href;
          return (
            <Link
              key={entry.href}
              href={entry.href}
              className={`relative px-3 py-2 text-[13px] font-medium tracking-[0.04em] transition-colors rounded-lg hover:bg-beige-200/40 ${
                active ? "text-gold-800 font-semibold" : "text-forest-950/90 hover:text-gold-700"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {entry.label}
              {active && (
                <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-gold-500 rounded-full" aria-hidden="true" />
              )}
            </Link>
          );
        }

        const isGroupActive = entry.items.some(
          (i) => pathname === i.href || (i.href !== "/" && pathname.startsWith(i.href)),
        );
        const isOpen = activeDropdown === entry.label;

        // Position dropdown smartly to prevent overflow
        let dropdownPositionClass = "left-1/2 -translate-x-1/2";
        if (entry.align === "left") dropdownPositionClass = "left-0";
        if (entry.align === "right") dropdownPositionClass = "right-0 left-auto translate-x-0";

        return (
          <div
            key={entry.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(entry.label)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-2 text-[13px] font-medium tracking-[0.04em] transition-colors rounded-lg focus:outline-none hover:bg-beige-200/40 ${
                isGroupActive || isOpen ? "text-gold-800 font-semibold" : "text-forest-950/90 hover:text-gold-700"
              }`}
              aria-expanded={isOpen}
            >
              <span>{entry.label}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-gold-700" : "text-forest-700/70"
                }`}
              />
              {isGroupActive && (
                <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-gold-500 rounded-full" aria-hidden="true" />
              )}
            </button>

            {/* Dropdown Menu Card */}
            {isOpen && (
              <div className={`absolute top-full z-50 pt-1.5 ${dropdownPositionClass}`}>
                <div className="w-[300px] rounded-2xl border border-beige-300/90 bg-white/98 p-2 shadow-2xl backdrop-blur-md transition-all">
                  <div className="space-y-1">
                    {entry.items.map((item) => {
                      const isItemActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex flex-col rounded-xl p-2.5 transition-all ${
                            isItemActive
                              ? "bg-beige-100/80 text-forest-950 font-medium"
                              : "text-ink-800 hover:bg-ivory-100 hover:text-forest-950"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-serif text-[14px] font-semibold text-forest-950 group-hover:text-gold-800">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="rounded-full bg-gold-100 border border-gold-500/20 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-gold-900">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="mt-0.5 text-[11.5px] leading-snug text-ink-500 group-hover:text-ink-700 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function HeaderSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  return (
    <form
      role="search"
      action="/shop"
      onSubmit={(e) => {
        e.preventDefault();
        const value = q.trim();
        router.push(value ? `/shop?q=${encodeURIComponent(value)}` : "/shop");
      }}
      className="hidden 2xl:flex items-center"
    >
      <label htmlFor="header-search" className="sr-only">
        Search makhana
      </label>
      <div className="flex h-9 items-center rounded-full border border-beige-300 bg-white/90 px-3 transition-colors focus-within:border-forest-600 focus-within:bg-white shadow-xs">
        <Search className="h-3.5 w-3.5 text-ink-400 shrink-0 mr-2" />
        <input
          id="header-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          className="w-24 xl:w-28 bg-transparent text-[12.5px] text-ink-900 placeholder:text-ink-400 focus:outline-none"
        />
      </div>
    </form>
  );
}

export function MobileNavToggle({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>("Company");
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close when pathname changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-forest-900 hover:bg-beige-200/50 transition-colors lg:hidden focus:outline-none"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open navigation menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-forest-950/65 backdrop-blur-xs transition-opacity duration-300"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          {/* Slide-out Panel */}
          <div
            ref={panelRef}
            className="absolute right-0 top-0 flex h-full w-[88%] max-w-[360px] flex-col bg-ivory-50 shadow-2xl border-l border-beige-300 animate-in slide-in-from-right duration-300"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-beige-200 px-5 py-4 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <img
                  src="/brand/logo-mark.svg"
                  alt=""
                  width={34}
                  height={34}
                  className="h-8 w-8 shrink-0"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-[17px] font-bold tracking-[0.14em] text-forest-950 leading-none">
                    AVRELLE AGRO
                  </span>
                  <span className="text-[9.5px] uppercase tracking-[0.18em] text-gold-700 font-semibold mt-0.5">
                    Mithila Makhana · Purnia
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-beige-300 bg-white text-forest-900 hover:bg-beige-100 transition-colors shadow-xs"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Drawer Nav Body */}
            <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-1" aria-label="Mobile navigation">
              {PRIMARY_NAV.map((entry) => {
                if (entry.type === "link") {
                  const active = pathname === entry.href;
                  return (
                    <div key={entry.href} className="border-b border-beige-200/60 last:border-0">
                      <Link
                        href={entry.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between py-3 px-1 font-serif text-[16px] transition-colors ${
                          active
                            ? "font-bold text-gold-800"
                            : "text-forest-950 hover:text-gold-700"
                        }`}
                      >
                        <span>{entry.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-gold-600" />
                      </Link>
                    </div>
                  );
                }

                const isExpanded = expandedGroup === entry.label;

                return (
                  <div key={entry.label} className="border-b border-beige-200/60 last:border-0 py-1">
                    <button
                      type="button"
                      onClick={() => setExpandedGroup(isExpanded ? null : entry.label)}
                      className="flex w-full items-center justify-between py-2.5 px-1 font-serif text-[16px] font-semibold text-forest-950 hover:text-gold-700 transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span className={isExpanded ? "text-gold-800" : ""}>{entry.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-forest-700 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-gold-700" : ""
                        }`}
                      />
                    </button>

                    {/* Sub-items with clean editorial left guideline */}
                    {isExpanded && (
                      <div className="pb-2 pt-1 pl-3.5 border-l-2 border-gold-500/40 ml-2 space-y-1.5 animate-in fade-in-0 duration-150">
                        {entry.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-2.5 py-2 text-ink-800 hover:bg-beige-100/80 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-serif text-[14px] font-medium text-forest-950">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="rounded-full bg-gold-100 border border-gold-500/20 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider text-gold-800">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-[11px] text-ink-500 leading-snug mt-0.5 line-clamp-1">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Bottom Actions Drawer Panel */}
            <div className="p-5 border-t border-beige-200 bg-white/90 backdrop-blur-xs space-y-2.5">
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="btn-gold block w-full text-center !py-2.5 !text-[12px] rounded-xl shadow-xs"
              >
                Shop Retail Packs (100g – 1 kg)
              </Link>
              <Link
                href="/bulk-supply"
                onClick={() => setOpen(false)}
                className="btn-outline block w-full text-center !py-2.5 !text-[12px] rounded-xl"
              >
                B2B Bulk Supply &amp; RFQ
              </Link>
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold block w-full text-center !py-2.5 !text-[12px] rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Corporate Desk
              </a>
              <p className="text-[10px] text-center text-ink-400 pt-1 font-mono">
                AVRELLE AGRO PVT LTD · Purnia, Bihar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
