"use client";

import Link from "next/link";
import { useCartContext } from "@/components/cart/cart-context";

export function CartLink() {
  const { count } = useCartContext();
  return (
    <Link
      href="/cart"
      className="relative inline-flex h-10 w-10 items-center justify-center text-forest-800 transition-colors hover:text-gold-700"
      aria-label={`Shopping cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" />
        <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
      </svg>
      {count > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold leading-none text-forest-950"
          aria-hidden="true"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
