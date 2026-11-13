import Link from "next/link";
import { Suspense } from "react";
import { getSettings } from "@/lib/db-data";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { CartLink } from "@/components/site/cart-link";
import { UserAccountLink } from "@/components/site/user-account-link";
import { DesktopNav, HeaderSearch, MobileNavToggle } from "@/components/site/nav";

export async function SiteHeader() {
  const { business } = await getSettings();

  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />
      <div className="border-b border-beige-200 bg-ivory-50/95 backdrop-blur supports-[backdrop-filter]:bg-ivory-50/85">
        <div className="section-shell flex h-[72px] items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-3">
            <MobileNavToggle whatsapp={business.whatsapp} />
            <Link href="/" className="flex items-center gap-3" aria-label="Super Makhana home">
              {/* Logo mark remains unchanged */}
              <img
                src="/brand/logo-mark.svg"
                alt=""
                width={44}
                height={44}
                className="h-10 w-10 sm:h-11 sm:w-11"
                aria-hidden="true"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-serif text-[19px] font-bold tracking-[0.14em] text-forest-900 sm:text-[22px]">
                  SUPER MAKHANA
                </span>
              </span>
            </Link>
          </div>

          <DesktopNav />

          <div className="flex items-center gap-1 sm:gap-2">
            <Suspense fallback={<div className="hidden h-9 w-56 xl:block" />}>
              <HeaderSearch />
            </Suspense>
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 px-2 text-[13px] font-medium text-forest-800 transition-colors hover:text-gold-700 xl:flex"
              aria-label={`Call ${business.phone}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path
                  d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
                  strokeLinejoin="round"
                />
              </svg>
              {business.phone}
            </a>
            <Suspense fallback={<div className="h-10 w-10" />}>
              <UserAccountLink />
            </Suspense>
            <CartLink />
          </div>
        </div>
      </div>
    </header>
  );
}
