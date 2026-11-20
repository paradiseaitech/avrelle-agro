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
  MessageCircle,
  User,
  Phone
} from "lucide-react";
import { useCartContext } from "@/components/cart/cart-context";

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

export const ALL_MOBILE_SECTIONS = [
  { num: "01", label: "Home", href: "/", description: "Homepage & company overview" },
  { num: "02", label: "About Us", href: "/about", description: "Corporate background & governance" },
  { num: "03", label: "Our Origin", href: "/origin", badge: "Terroir", description: "Kosi belt & Purnia wetlands" },
  { num: "04", label: "Our Products", href: "/products", badge: "Portfolio", description: "Raw, Graded, Roasted & Flavoured" },
  { num: "05", label: "Manufacturing", href: "/manufacturing", description: "10-stage processing journey & facility" },
  { num: "06", label: "Quality Assurance", href: "/quality-assurance", description: "5-stage hygiene & testing protocol" },
  { num: "07", label: "Certifications", href: "/certifications", description: "FSSAI, GST, IEC & APEDA" },
  { num: "08", label: "Farmer Network", href: "/farmer-network", description: "7-district FPC sourcing partnerships" },
  { num: "09", label: "Bulk Supply", href: "/bulk-supply", badge: "Wholesale", description: "Commercial 8 kg PP bags & RFQ" },
  { num: "10", label: "Exports", href: "/exports", badge: "Global", description: "International sea/air freight" },
  { num: "11", label: "Contact Us", href: "/contact", description: "Purnia corporate desk & helpline" },
  { num: "12", label: "Shop Retail Packs", href: "/shop", badge: "Store", description: "100g – 1 kg packs with COD" },
  { num: "GI", label: "GI Recognition (GI-696)", href: "/mithila-makhana-gi-recognition", badge: "Official", description: "Authorized User Certificate AU/48155/GI/696/76" },
  { num: "★", label: "Makhana Grades", href: "/grades", badge: "Suta Scale", description: "3 Suta to 6+ Jumbo Suta metrics" },
];

export function MobileNavToggle({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { count: cartCount } = useCartContext();

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
            className="absolute right-0 top-0 flex h-[100dvh] max-h-[100dvh] w-[88%] max-w-[340px] xs:max-w-[360px] flex-col bg-ivory-50 shadow-2xl border-l border-beige-300 animate-in slide-in-from-right duration-300"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-beige-200 px-4 py-3.5 sm:px-5 sm:py-4 bg-white/80 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <img
                  src="/brand/logo-mark.svg"
                  alt=""
                  width={34}
                  height={34}
                  className="h-7 w-7 sm:h-8 sm:w-8 shrink-0"
                  aria-hidden="true"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-serif text-[15px] sm:text-[17px] font-bold tracking-[0.12em] sm:tracking-[0.14em] text-forest-950 leading-none truncate">
                    AVRELLE AGRO
                  </span>
                  <span className="text-[9px] sm:text-[9.5px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-gold-700 font-semibold mt-0.5 truncate">
                    Mithila Makhana · Purnia
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-beige-300 bg-white text-forest-900 hover:bg-beige-100 transition-colors shadow-xs shrink-0 ml-2"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Search Bar */}
            <div className="border-b border-beige-200/80 bg-white/60 px-4 py-2.5 shrink-0">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  const val = searchQuery.trim();
                  setOpen(false);
                  router.push(val ? `/shop?q=${encodeURIComponent(val)}` : "/shop");
                }}
                className="flex items-center"
              >
                <div className="flex w-full h-9 items-center rounded-lg border border-beige-300 bg-white px-2.5 focus-within:border-gold-500 shadow-xs">
                  <Search className="h-3.5 w-3.5 text-ink-400 shrink-0 mr-2" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search makhana products…"
                    className="w-full bg-transparent text-[12.5px] text-ink-900 placeholder:text-ink-400 focus:outline-none"
                  />
                </div>
              </form>
            </div>

            {/* Navigation Header */}
            <div className="flex items-center justify-between px-4 pt-2.5 pb-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400 shrink-0">
              <span>All 12 Corporate Sections</span>
              <span className="font-mono text-gold-800 text-[10px]">Complete Index</span>
            </div>

            {/* Drawer Nav Body: 100% Direct, Scrollable, Complete List of All Sections */}
            <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-1.5 space-y-1" aria-label="Mobile navigation">
              {ALL_MOBILE_SECTIONS.map((section) => {
                const active = pathname === section.href || (section.href !== "/" && pathname.startsWith(section.href));
                return (
                  <Link
                    key={section.href}
                    href={section.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between rounded-xl px-2.5 py-2 transition-all ${
                      active
                        ? "bg-forest-900 text-ivory-100 shadow-xs"
                        : "text-forest-950 hover:bg-beige-100/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10.5px] font-mono font-bold ${
                        active 
                          ? "bg-gold-500 text-forest-950" 
                          : "bg-beige-200/70 text-forest-900"
                      }`}>
                        {section.num}
                      </span>
                      <div className="flex flex-col min-w-0 leading-tight">
                        <span className={`font-serif text-[14.5px] font-semibold truncate ${
                          active ? "text-ivory-50" : "text-forest-950 group-hover:text-gold-800"
                        }`}>
                          {section.label}
                        </span>
                        {section.description && (
                          <span className={`text-[10.5px] truncate font-sans ${
                            active ? "text-ivory-200/80" : "text-ink-400"
                          }`}>
                            {section.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {section.badge && (
                        <span className={`rounded-full px-1.5 py-0.2 text-[8.5px] font-bold uppercase tracking-wider ${
                          active
                            ? "bg-gold-500/20 text-gold-300 border border-gold-400/40"
                            : "bg-gold-100 text-gold-900 border border-gold-500/20"
                        }`}>
                          {section.badge}
                        </span>
                      )}
                      <ArrowRight className={`h-3.5 w-3.5 ${active ? "text-gold-300" : "text-ink-400 group-hover:text-gold-700"}`} />
                    </div>
                  </Link>
                );
              })}

              {/* Account & Cart Direct Links */}
              <div className="mt-3 pt-2.5 border-t border-beige-300 space-y-1">
                <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-gold-800 mb-1">
                  Customer &amp; Cart Access
                </div>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-2.5 py-2 text-ink-800 hover:bg-beige-100/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5 font-serif text-[14px] font-medium text-forest-950">
                    <User className="h-4 w-4 text-gold-700" />
                    <span>My Account &amp; Orders</span>
                  </div>
                  <span className="text-[11px] text-gold-800 font-sans font-medium">Sign In &rarr;</span>
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-2.5 py-2 text-ink-800 hover:bg-beige-100/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5 font-serif text-[14px] font-medium text-forest-950">
                    <ShoppingBag className="h-4 w-4 text-gold-700" />
                    <span>Shopping Cart</span>
                  </div>
                  {cartCount > 0 ? (
                    <span className="rounded-full bg-gold-500 text-forest-950 px-2 py-0.5 text-[10px] font-bold">
                      {cartCount} item{cartCount === 1 ? "" : "s"}
                    </span>
                  ) : (
                    <span className="text-[11px] text-ink-400 font-sans">0 items</span>
                  )}
                </Link>
              </div>
            </nav>

            {/* Bottom Actions Drawer Panel */}
            <div className="p-3.5 sm:p-4 border-t border-beige-200 bg-white/95 backdrop-blur-xs space-y-2 shrink-0">
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
                className="btn-outline-gold block w-full text-center !py-2 !text-[11.5px] rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp Corporate Desk
              </a>
              <p className="text-[9.5px] text-center text-ink-400 pt-0.5 font-mono">
                AVRELLE AGRO PVT LTD · Purnia, Bihar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
