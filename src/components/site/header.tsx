import Link from "next/link";
import { Suspense } from "react";
import { getSettings } from "@/lib/db-data";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { CartLink } from "@/components/site/cart-link";
import { UserAccountLink } from "@/components/site/user-account-link";
import { DesktopNav, HeaderSearch, MobileNavToggle } from "@/components/site/nav";
import { Phone, ShoppingBag } from "lucide-react";

export async function SiteHeader() {
  const { business } = await getSettings();

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      <AnnouncementBar />
      <div className="border-b border-beige-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 transition-all">
        <div className="section-shell flex h-[64px] sm:h-[74px] items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Mobile Nav Toggle & Brand Lockup */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <MobileNavToggle whatsapp={business.whatsapp} />
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none min-w-0" 
              aria-label="AVRELLE AGRO PVT LTD home"
            >
              <img
                src="/brand/logo-mark.svg"
                alt=""
                width={36}
                height={36}
                className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 object-contain transition-transform group-hover:scale-105"
                aria-hidden="true"
              />
              <span className="flex flex-col leading-none min-w-0">
                <span className="font-serif text-[15px] xs:text-[17px] sm:text-[19px] lg:text-[20px] font-bold tracking-[0.08em] xs:tracking-[0.12em] text-charcoal-900 truncate">
                  AVRELLE AGRO
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-gold-700 mt-1 hidden sm:inline-block">
                  Mithila Makhana · Purnia
                </span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation with Smart Dropdowns */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-2">
            <DesktopNav />
          </div>

          {/* Right: Actions (Search, Shop Button, Phone, Account, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Suspense fallback={<div className="hidden 2xl:block h-9 w-28" />}>
              <HeaderSearch />
            </Suspense>

            {/* Quick Shop CTA Pill (Desktop XL+) */}
            <Link
              href="/shop"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wider text-white shadow-xs hover:bg-gold-600 active:scale-98 transition-all"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Shop Retail</span>
            </Link>

            {/* Phone link on 2XL screens */}
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className="hidden 2xl:flex items-center gap-1.5 px-2 text-[12.5px] font-medium text-forest-900/80 hover:text-gold-700 transition-colors"
              aria-label={`Call ${business.phone}`}
            >
              <Phone className="h-3.5 w-3.5 text-gold-700" />
              <span>{business.phone}</span>
            </a>

            {/* Account Icon Link */}
            <Suspense fallback={<div className="h-10 w-10" />}>
              <UserAccountLink />
            </Suspense>

            {/* Cart Link with Count */}
            <CartLink />
          </div>

        </div>
      </div>
    </header>
  );
}
