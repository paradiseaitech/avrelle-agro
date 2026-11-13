"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop Makhana" },
  { href: "/grades", label: "Makhana Grades" },
  { href: "/bulk-orders", label: "Bulk Orders" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
      {NAV_LINKS.map((l) => {
        const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`relative py-1 text-[12.5px] font-medium uppercase tracking-[0.14em] transition-colors ${
              active ? "text-gold-700" : "text-forest-800 hover:text-gold-700"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {l.label}
            {active && (
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-gold-500" aria-hidden="true" />
            )}
          </Link>
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
      className="hidden items-center xl:flex"
    >
      <label htmlFor="header-search" className="sr-only">
        Search makhana
      </label>
      <div className="flex h-9 items-center border border-beige-300 bg-white/70 transition-colors focus-within:border-forest-600">
        <svg
          className="mx-2.5 h-3.5 w-3.5 shrink-0 text-ink-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          id="header-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search makhana…"
          className="w-36 bg-transparent pr-2 text-[13px] text-ink-900 placeholder:text-ink-400 focus:outline-none"
        />
      </div>
    </form>
  );
}

export function MobileNavToggle({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the drawer for keyboard users.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center text-forest-800 lg:hidden"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open navigation menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            type="button"
            className="absolute inset-0 bg-forest-950/50 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-ivory-50 shadow-luxe-lg"
          >
            <div className="flex items-center justify-between border-b border-beige-200 px-5 py-4">
              <span className="font-serif text-lg font-bold tracking-[0.14em] text-forest-900">
                SUPER MAKHANA
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center text-forest-800"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-beige-200/70 py-3.5 font-serif text-[17px] text-forest-900 transition-colors hover:text-gold-700"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <Link href="/cart" onClick={() => setOpen(false)} className="btn-outline block w-full text-center">
                  View Cart
                </Link>
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold block w-full text-center"
                >
                  WhatsApp Us
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
