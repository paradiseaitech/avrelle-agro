"use client";

import { useMemo, useState } from "react";
import type { ProductDetail } from "@/lib/db-data";
import { formatINR } from "@/lib/utils";
import { useCartContext } from "@/components/cart/cart-context";
import { SamplePriceChip } from "@/components/product/product-card";

export function PurchasePanel({ product }: { product: ProductDetail }) {
  const { add } = useCartContext();
  const firstInStock = product.variants.find((v) => v.stock > 0) ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstInStock?.id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? product.variants[0],
    [product.variants, variantId],
  );

  if (!variant) return null;
  const soldOut = variant.stock <= 0;
  const maxQty = Math.min(variant.stock, 20);
  const lineTotal = variant.pricePaise * quantity;

  return (
    <div>
      <p className="text-eyebrow">100% Pure Makhana</p>
      <h1 className="mt-3 font-serif text-[30px] leading-tight text-forest-900 sm:text-[38px]">
        {product.name}
      </h1>
      {product.tagline && <p className="mt-2 text-[15px] italic text-ink-600">{product.tagline}</p>}

      <div className="mt-5 flex items-center gap-3">
        <p className="font-serif text-[28px] text-forest-800" aria-live="polite">
          {formatINR(variant.pricePaise)}
        </p>
        <span className="text-[13px] text-ink-500">incl. of all taxes</span>
        {product.usesSamplePrices && <SamplePriceChip />}
      </div>

      {/* Variant selection */}
      <fieldset className="mt-7">
        <legend className="field-label">Pack size</legend>
        <div className="flex flex-wrap gap-2.5">
          {product.variants.map((v) => {
            const selected = v.id === variant.id;
            const vSoldOut = v.stock <= 0;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setVariantId(v.id);
                  setQuantity(1);
                }}
                disabled={vSoldOut}
                aria-pressed={selected}
                className={`relative border px-4 py-2.5 text-left transition-colors ${
                  selected
                    ? "border-forest-800 bg-forest-800 text-ivory-100"
                    : "border-beige-300 bg-white text-ink-800 hover:border-forest-600"
                } ${vSoldOut ? "cursor-not-allowed opacity-45" : ""}`}
              >
                <span className="block text-[13.5px] font-semibold">{v.label}</span>
                <span className={`block text-[12px] ${selected ? "text-gold-300" : "text-ink-500"}`}>
                  {formatINR(v.pricePaise)}
                </span>
                {vSoldOut && (
                  <span className="absolute -top-2 right-2 bg-ivory-100 px-1.5 text-[9.5px] font-bold uppercase tracking-wider text-danger-600">
                    Sold out
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Stock status */}
      <p className="mt-4 text-[13px] font-medium">
        {soldOut ? (
          <span className="text-danger-600">This pack is currently unavailable.</span>
        ) : variant.stock <= 5 ? (
          <span className="text-warning-700">Only {variant.stock} left in stock.</span>
        ) : (
          <span className="text-success-700">In stock · dispatches within 2–3 working days</span>
        )}
      </p>

      {/* Quantity + add to cart */}
      <div className="mt-5 flex flex-wrap items-stretch gap-3">
        <div className="flex items-center border border-beige-300 bg-white">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || soldOut}
            className="px-4 py-3 text-ink-700 transition-colors hover:text-forest-800 disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <label htmlFor="pdp-qty" className="sr-only">Quantity</label>
          <input
            id="pdp-qty"
            type="number"
            min={1}
            max={maxQty}
            value={quantity}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (Number.isFinite(v)) setQuantity(Math.min(Math.max(1, Math.floor(v)), maxQty));
            }}
            disabled={soldOut}
            className="w-12 border-x border-beige-200 bg-transparent py-3 text-center text-[14px] font-semibold text-ink-900 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
            disabled={soldOut || quantity >= maxQty}
            className="px-4 py-3 text-ink-700 transition-colors hover:text-forest-800 disabled:opacity-40"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          disabled={soldOut}
          onClick={() => {
            add(
              {
                variantId: variant.id,
                productId: product.id,
                productSlug: product.slug,
                productName: product.name,
                gradeName: product.gradeName,
                variantLabel: variant.label,
                unitPricePaise: variant.pricePaise,
                image: product.image,
              },
              quantity,
            );
            setAdded(true);
            setTimeout(() => setAdded(false), 2400);
          }}
          className="btn-primary flex-1 min-w-[200px]"
        >
          {added ? "Added to Cart ✓" : soldOut ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {added ? `${product.name} ${variant.label} added to cart` : ""}
      </span>

      <p className="mt-3 text-[13px] text-ink-600">
        Subtotal: <span className="font-semibold text-forest-800">{formatINR(lineTotal)}</span>
        {" · "}Cash on Delivery available at checkout
      </p>

      {/* Details accordion-ish list */}
      <dl className="mt-8 divide-y divide-beige-200 border-y border-beige-200 text-[14px]">
        {product.ingredients && (
          <div className="flex gap-4 py-3.5">
            <dt className="w-32 shrink-0 text-[12px] font-semibold uppercase tracking-wider text-ink-500">
              Ingredients
            </dt>
            <dd className="text-ink-800">{product.ingredients}</dd>
          </div>
        )}
        {product.storageInstructions && (
          <div className="flex gap-4 py-3.5">
            <dt className="w-32 shrink-0 text-[12px] font-semibold uppercase tracking-wider text-ink-500">
              Storage
            </dt>
            <dd className="text-ink-800">{product.storageInstructions}</dd>
          </div>
        )}
        {product.gradeName && (
          <div className="flex gap-4 py-3.5">
            <dt className="w-32 shrink-0 text-[12px] font-semibold uppercase tracking-wider text-ink-500">
              Grade
            </dt>
            <dd className="text-ink-800">
              {product.gradeName}
              {variant.sku ? ` · SKU ${variant.sku}` : ""}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
