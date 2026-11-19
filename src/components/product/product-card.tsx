"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductListItem } from "@/lib/db-data";
import { formatINR } from "@/lib/utils";
import { AddToCartButton } from "@/components/product/add-to-cart-button";

export function SamplePriceChip() {
  return (
    <span
      className="inline-flex items-center border border-warning-700/25 bg-warning-100 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-warning-700"
      title="Sample data — retail prices are pending verification and can be updated in the admin dashboard."
    >
      Sample price
    </span>
  );
}

export function ProductCard({ product }: { product: ProductListItem }) {
  // Default to 500g (most popular) or first available
  const defaultVariant =
    product.variants.find((v) => v.weightG === 500 || /500/i.test(v.label)) ??
    product.variants[0];

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    defaultVariant?.id,
  );

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    defaultVariant ??
    product.variants[0];

  const soldOut = !selectedVariant || selectedVariant.stock <= 0;
  const currentImage = selectedVariant?.image ?? product.image;
  const currentPrice = selectedVariant ? formatINR(selectedVariant.pricePaise) : "Price on request";

  const isGIEligible =
    !["powder", "flour", "flavoured", "flavored", "mix"].some((k) =>
      product.name.toLowerCase().includes(k),
    ) && product.name.toLowerCase().includes("makhana");

  return (
    <article className="group card-luxe flex flex-col overflow-hidden transition-shadow hover:shadow-luxe">
      {/* Product Image Link */}
      <Link
        href={`/product/${product.slug}?variant=${selectedVariant?.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-ivory-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        {currentImage && (
          <img
            key={currentImage}
            src={currentImage}
            alt={`${product.name} — ${selectedVariant?.label ?? "pack"}`}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-all duration-300 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute left-3 top-3 bg-forest-900/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-300 shadow-xs">
          {selectedVariant ? selectedVariant.label : "Pure Makhana"}
        </span>
        {isGIEligible && (
          <span className="absolute bottom-2 left-3 rounded bg-forest-950/90 px-2 py-0.5 text-[9px] font-semibold text-gold-300 border border-gold-500/40 shadow-xs">
            GI-696 Authorized User
          </span>
        )}
        {soldOut && (
          <span className="absolute right-3 top-3 bg-ivory-50/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-danger-700 shadow-xs">
            Sold out
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-[17px] leading-snug text-forest-900">
          <Link
            href={`/product/${product.slug}?variant=${selectedVariant?.id}`}
            className="transition-colors hover:text-gold-700"
          >
            {product.name}
          </Link>
        </h3>

        {/* Variant selector: 100g, 200g, 400g, 500g, 1kg */}
        <div className="mt-3">
          <p className="text-[11px] font-medium text-ink-500 uppercase tracking-wider mb-1.5">
            Select Pack Size:
          </p>
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="radiogroup"
            aria-label="Select pack size"
          >
            {product.variants.map((v) => {
              const isSelected = v.id === selectedVariant?.id;
              const isSoldOut = v.stock <= 0;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariantId(v.id);
                  }}
                  disabled={isSoldOut}
                  aria-pressed={isSelected}
                  className={`relative cursor-pointer rounded border px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                    isSelected
                      ? "border-forest-900 bg-forest-900 text-ivory-100 shadow-xs ring-1 ring-gold-400"
                      : "border-beige-300 bg-ivory-50 text-ink-700 hover:border-gold-500 hover:bg-gold-50"
                  } ${isSoldOut ? "cursor-not-allowed opacity-40 line-through" : ""}`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price for selected variant */}
        <div className="mt-4 flex items-center gap-2">
          <p className="font-serif text-[20px] text-forest-800" aria-live="polite">
            {currentPrice}
          </p>
          {selectedVariant && (
            <span className="text-[11.5px] text-ink-500">for {selectedVariant.label}</span>
          )}
          {product.usesSamplePrices && <SamplePriceChip />}
        </div>

        <p className="mt-1 text-[12px] font-medium uppercase tracking-wider text-ink-500">
          {soldOut ? (
            <span className="text-danger-600">Currently unavailable</span>
          ) : selectedVariant && selectedVariant.stock <= 5 ? (
            <span className="text-warning-700">Only {selectedVariant.stock} left</span>
          ) : (
            <span className="text-success-700">In stock</span>
          )}
        </p>

        {/* Actions: balanced 2-column grid pinned to bottom of card */}
        <div className="mt-auto pt-4 grid grid-cols-2 gap-2 w-full">
          <Link
            href={`/product/${product.slug}?variant=${selectedVariant?.id}`}
            className="btn-outline btn-sm !px-1.5 !py-2.5 text-center flex items-center justify-center text-[11px] font-semibold tracking-wider whitespace-nowrap rounded"
            aria-label={`View details for ${product.name}`}
          >
            View Details
          </Link>
          {selectedVariant && !soldOut ? (
            <AddToCartButton
              size="sm"
              className="w-full !px-1.5 !py-2.5 text-center flex items-center justify-center text-[11px] font-semibold tracking-wider whitespace-nowrap rounded"
              item={{
                variantId: selectedVariant.id,
                productId: product.id,
                productSlug: product.slug,
                productName: product.name,
                gradeName: selectedVariant.label,
                variantLabel: selectedVariant.label,
                unitPricePaise: selectedVariant.pricePaise,
                image: currentImage,
              }}
            />
          ) : (
            <button
              disabled
              className="btn-primary btn-sm w-full !px-1.5 !py-2.5 text-center flex items-center justify-center text-[11px] font-semibold tracking-wider opacity-40 cursor-not-allowed whitespace-nowrap rounded"
            >
              Sold Out
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
