"use client";

import Link from "next/link";
import { useCartContext } from "@/components/cart/cart-context";
import { formatINR } from "@/lib/utils";

export function CartView() {
  const { items, setQuantity, remove, clear, subtotalPaise, count } = useCartContext();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-2xl border border-beige-200 bg-white px-6 py-20 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gold-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" />
          <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
        </svg>
        <h2 className="mt-5 font-serif text-[24px] text-forest-900">Your cart is empty</h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink-600">
          Explore our graded makhana — from everyday 3 Suta to premium 6+ Suta fox nuts.
        </p>
        <Link href="/shop" className="btn-primary mt-7">
          Shop Makhana
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <div>
        <ul className="divide-y divide-beige-200 border-y border-beige-200">
          {items.map((item) => (
            <li key={item.variantId} className="flex gap-4 py-5 sm:gap-6">
              <Link
                href={`/product/${item.productSlug}`}
                className="h-24 w-20 shrink-0 overflow-hidden border border-beige-200 bg-ivory-100 sm:h-28 sm:w-24"
                tabIndex={-1}
                aria-hidden="true"
              >
                {item.image && (
                  <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                )}
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-[16px] leading-snug text-forest-900">
                      <Link href={`/product/${item.productSlug}`} className="hover:text-gold-700">
                        {item.productName}
                      </Link>
                    </h2>
                    <p className="mt-0.5 text-[12.5px] text-ink-500">
                      {item.gradeName ? `${item.gradeName} · ` : ""}
                      {item.variantLabel}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-ink-500">
                      {formatINR(item.unitPricePaise)} each
                    </p>
                  </div>
                  <p className="shrink-0 font-serif text-[16px] text-forest-800">
                    {formatINR(item.unitPricePaise * item.quantity)}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-beige-300 bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.variantId, item.quantity - 1)}
                      className="px-3 py-1.5 text-ink-700 hover:text-forest-800"
                      aria-label={`Decrease quantity of ${item.productName} ${item.variantLabel}`}
                    >
                      −
                    </button>
                    <span
                      className="w-9 text-center text-[13.5px] font-semibold text-ink-900"
                      aria-label={`Quantity ${item.quantity}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                      disabled={item.quantity >= 20}
                      className="px-3 py-1.5 text-ink-700 hover:text-forest-800 disabled:opacity-40"
                      aria-label={`Increase quantity of ${item.productName} ${item.variantLabel}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.variantId)}
                    className="text-[12px] font-medium uppercase tracking-wider text-ink-500 underline decoration-beige-300 underline-offset-4 transition-colors hover:text-danger-600"
                    aria-label={`Remove ${item.productName} ${item.variantLabel} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/shop" className="text-[13px] font-medium text-forest-700 underline decoration-gold-500 underline-offset-4 hover:text-gold-700">
            ← Continue shopping
          </Link>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear all items from your cart?")) clear();
            }}
            className="text-[12px] font-medium uppercase tracking-wider text-ink-400 hover:text-danger-600"
          >
            Clear cart
          </button>
        </div>
      </div>

      {/* Summary */}
      <aside className="h-fit border border-beige-200 bg-white p-6" aria-label="Order summary">
        <h2 className="font-serif text-[19px] text-forest-900">Order Summary</h2>
        <dl className="mt-5 space-y-3 text-[14px]">
          <div className="flex justify-between">
            <dt className="text-ink-600">Subtotal ({count} item{count === 1 ? "" : "s"})</dt>
            <dd className="font-semibold text-ink-900">{formatINR(subtotalPaise)}</dd>
          </div>
          <div className="flex justify-between text-ink-600">
            <dt>Shipping</dt>
            <dd className="text-[13px]">Calculated at checkout</dd>
          </div>
        </dl>
        <div className="mt-5 border-t border-beige-200 pt-4">
          <div className="flex justify-between">
            <span className="text-[14px] font-semibold text-forest-900">Estimated total</span>
            <span className="font-serif text-[19px] text-forest-800">{formatINR(subtotalPaise)}</span>
          </div>
        </div>
        <Link href="/checkout" className="btn-primary mt-6 w-full">
          Proceed to Checkout
        </Link>
        <p className="mt-3 text-center text-[12px] leading-relaxed text-ink-500">
          Cash on Delivery available for serviceable PIN codes. Payment is due to the courier at delivery.
        </p>
      </aside>
    </div>
  );
}
