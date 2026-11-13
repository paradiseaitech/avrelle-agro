import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your AVRELLE AGRO makhana order before checkout.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="section-shell py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-forest-800">Cart</li>
        </ol>
      </nav>
      <h1 className="mb-8 font-serif text-[32px] text-forest-900 sm:text-[40px]">Your Cart</h1>
      <CartView />
    </div>
  );
}
