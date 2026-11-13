"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ProductDetail } from "@/lib/db-data";
import { formatINR } from "@/lib/utils";
import { useCartContext } from "@/components/cart/cart-context";
import { SamplePriceChip } from "@/components/product/product-card";

interface ProductShowcaseProps {
  product: ProductDetail;
  initialVariantId?: string;
}

export function ProductShowcase({ product, initialVariantId }: ProductShowcaseProps) {
  const { add } = useCartContext();

  // Find 500g (most popular) variant as default, or use initialVariantId, or fallback to first
  const defaultVariant = useMemo(() => {
    if (initialVariantId) {
      const match = product.variants.find((v) => v.id === initialVariantId);
      if (match) return match;
    }
    return (
      product.variants.find((v) => v.weightG === 500 || /500/i.test(v.label)) ??
      product.variants[0]
    );
  }, [product.variants, initialVariantId]);

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    defaultVariant?.id ?? product.variants[0]?.id ?? "",
  );

  const selectedVariant = useMemo(
    () =>
      product.variants.find((v) => v.id === selectedVariantId) ??
      defaultVariant ??
      product.variants[0],
    [product.variants, selectedVariantId, defaultVariant],
  );

  // Active large image in gallery (defaults to selected variant's packaging image)
  const [activeImage, setActiveImage] = useState<string>(
    selectedVariant?.image ?? product.images[0] ?? "",
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!selectedVariant) return null;

  const soldOut = selectedVariant.stock <= 0;
  const maxQty = Math.min(selectedVariant.stock, 20);
  const lineTotal = selectedVariant.pricePaise * quantity;

  // Handle switching variant
  function handleVariantChange(variantId: string) {
    setSelectedVariantId(variantId);
    setQuantity(1);
    const newVariant = product.variants.find((v) => v.id === variantId);
    if (newVariant?.image) {
      setActiveImage(newVariant.image);
    }
  }

  // Handle clicking a thumbnail
  function handleThumbnailClick(img: string) {
    setActiveImage(img);
    // If thumbnail matches a variant packaging, select that variant automatically
    const matchingVariant = product.variants.find((v) => v.image === img);
    if (matchingVariant) {
      setSelectedVariantId(matchingVariant.id);
      setQuantity(1);
    }
  }

  // Helper label for thumbnail images
  function getThumbnailLabel(img: string, idx: number): string {
    if (img.includes("100g")) return "100 g Pack";
    if (img.includes("200g")) return "200 g Pack";
    if (img.includes("250g")) return "250 g Pack";
    if (img.includes("400g")) return "400 g Pack";
    if (img.includes("500g")) return "500 g Pack";
    if (img.includes("1kg")) return "1 kg Pack";
    if (img.includes("size")) return "Scale Guide";
    if (img.includes("grades")) return "Raw Makhana";
    return `View ${idx + 1}`;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* LEFT COLUMN: Interactive Image Gallery */}
      <div>
        <div className="card-luxe relative overflow-hidden bg-gradient-to-b from-ivory-50 to-ivory-100 border border-beige-200">
          <img
            key={activeImage}
            src={activeImage}
            alt={`${product.name} — ${selectedVariant.label}`}
            className="aspect-[4/5] w-full object-contain p-6 transition-all duration-300"
            fetchPriority="high"
          />

          {/* Badges on Gallery Hero */}
          <div className="absolute left-4 top-4 flex flex-col gap-1.5">
            {activeImage.includes("100g") && (
              <span className="inline-block bg-gold-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-950 shadow-xs">
                100 g Pocket Pack
              </span>
            )}
            {activeImage.includes("200g") && (
              <span className="inline-block bg-gold-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-950 shadow-xs">
                200 g Daily Pack
              </span>
            )}
            {activeImage.includes("400g") && (
              <span className="inline-block bg-gold-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-950 shadow-xs">
                400 g Family Pack
              </span>
            )}
            {activeImage.includes("500g") && (
              <span className="inline-block bg-gold-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-950 shadow-xs">
                500 g Pantry Pack
              </span>
            )}
            {activeImage.includes("1kg") && (
              <span className="inline-block bg-gold-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-950 shadow-xs">
                1 kg Mega Saver Pack
              </span>
            )}
          </div>

          {soldOut && (
            <span className="absolute right-4 top-4 bg-ivory-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-danger-700 shadow-md">
              Sold out
            </span>
          )}
        </div>

        {/* Thumbnails Row */}
        {product.images.length > 1 && (
          <div className="mt-4">
            <p className="text-[11px] font-medium text-ink-500 uppercase tracking-wider mb-2">
              Packaging &amp; Grade Views:
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-2.5">
              {product.images.map((img, i) => {
                const isActive = activeImage === img;
                const label = getThumbnailLabel(img, i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleThumbnailClick(img)}
                    className={`group relative flex flex-col items-center rounded-lg border p-1 text-center transition-all cursor-pointer ${
                      isActive
                        ? "border-forest-900 bg-white ring-2 ring-gold-400 shadow-sm"
                        : "border-beige-200 bg-ivory-100 hover:border-gold-500 hover:bg-white"
                    }`}
                    title={label}
                  >
                    <div className="aspect-square w-full overflow-hidden rounded bg-ivory-50 flex items-center justify-center p-1">
                      <img
                        src={img}
                        alt={`${product.name} ${label}`}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                    <span
                      className={`mt-1 block truncate text-[9.5px] font-semibold ${
                        isActive ? "text-forest-900" : "text-ink-600"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-4 text-[12px] text-ink-500">
          Showing authentic Avrelle Agro nitrogen-flushed retail packs produced from GI-region fox nuts in Purnea, Bihar.
        </p>
      </div>

      {/* RIGHT COLUMN: Interactive Purchase Details */}
      <div className="lg:py-2">
        <p className="text-eyebrow">100% Naturally Harvested Phool Makhana</p>
        <h1 className="mt-3 font-serif text-[30px] leading-tight text-forest-900 sm:text-[38px]">
          {product.name}
        </h1>
        {product.tagline && <p className="mt-2 text-[15px] italic text-ink-600">{product.tagline}</p>}

        {/* Dynamic Price for selected variant */}
        <div className="mt-5 flex items-baseline gap-3">
          <p className="font-serif text-[32px] text-forest-800" aria-live="polite">
            {formatINR(selectedVariant.pricePaise)}
          </p>
          <span className="text-[13px] text-ink-500">
            incl. taxes for {selectedVariant.label}
          </span>
          {product.usesSamplePrices && <SamplePriceChip />}
        </div>

        {/* Variant selection */}
        <fieldset className="mt-7">
          <div className="flex items-center justify-between mb-2">
            <legend className="field-label !mb-0 font-semibold text-forest-950">
              Select Pack Size:
            </legend>
            <span className="text-[12px] font-medium text-gold-700">
              Selected: {selectedVariant.label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {product.variants.map((v) => {
              const selected = v.id === selectedVariant.id;
              const vSoldOut = v.stock <= 0;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleVariantChange(v.id)}
                  disabled={vSoldOut}
                  aria-pressed={selected}
                  className={`relative cursor-pointer rounded-lg border-2 p-3 text-left transition-all ${
                    selected
                      ? "border-forest-900 bg-forest-900 text-ivory-100 shadow-md ring-2 ring-gold-400"
                      : "border-beige-300 bg-white text-ink-800 hover:border-gold-500 hover:bg-gold-50/40"
                  } ${vSoldOut ? "cursor-not-allowed opacity-45 line-through" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="block text-[14px] font-bold">{v.label}</span>
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-gold-400" aria-hidden="true" />
                    )}
                  </div>
                  <span
                    className={`mt-1 block text-[13px] font-medium ${
                      selected ? "text-gold-300" : "text-forest-800"
                    }`}
                  >
                    {formatINR(v.pricePaise)}
                  </span>
                  {vSoldOut && (
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-danger-600">
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
            <span className="text-danger-600">This pack size is currently unavailable.</span>
          ) : selectedVariant.stock <= 5 ? (
            <span className="text-warning-700">Only {selectedVariant.stock} left in stock.</span>
          ) : (
            <span className="text-success-700">In stock · dispatches within 2–3 working days</span>
          )}
        </p>

        {/* Quantity + Add to Cart */}
        <div className="mt-5 flex flex-wrap items-stretch gap-3">
          <div className="flex items-center border border-beige-300 bg-white rounded">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1 || soldOut}
              className="px-4 py-3 text-ink-700 transition-colors hover:text-forest-800 disabled:opacity-40 cursor-pointer"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <label htmlFor="pdp-qty" className="sr-only">
              Quantity
            </label>
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
              className="px-4 py-3 text-ink-700 transition-colors hover:text-forest-800 disabled:opacity-40 cursor-pointer"
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
                  variantId: selectedVariant.id,
                  productId: product.id,
                  productSlug: product.slug,
                  productName: product.name,
                  gradeName: selectedVariant.label,
                  variantLabel: selectedVariant.label,
                  unitPricePaise: selectedVariant.pricePaise,
                  image: selectedVariant.image ?? activeImage,
                },
                quantity,
              );
              setAdded(true);
              setTimeout(() => setAdded(false), 2400);
            }}
            className="btn-primary flex-1 min-w-[200px] cursor-pointer"
          >
            {added ? "Added to Cart ✓" : soldOut ? "Sold Out" : `Add ${selectedVariant.label} to Cart`}
          </button>
        </div>

        <span className="sr-only" role="status" aria-live="polite">
          {added ? `${product.name} ${selectedVariant.label} added to cart` : ""}
        </span>

        <p className="mt-3 text-[13px] text-ink-600">
          Subtotal: <span className="font-semibold text-forest-800">{formatINR(lineTotal)}</span>
          {" · "}Cash on Delivery available across India
        </p>

        {/* Product Specifications */}
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
          <div className="flex gap-4 py-3.5">
            <dt className="w-32 shrink-0 text-[12px] font-semibold uppercase tracking-wider text-ink-500">
              Pack Size
            </dt>
            <dd className="text-ink-800">
              {selectedVariant.label}
              {selectedVariant.sku ? ` · SKU ${selectedVariant.sku}` : ""}
            </dd>
          </div>
          <div className="flex gap-4 py-3.5">
            <dt className="w-32 shrink-0 text-[12px] font-semibold uppercase tracking-wider text-ink-500">
              Origin
            </dt>
            <dd className="text-ink-800">Purnea, Bihar (India)</dd>
          </div>
        </dl>

        {product.description && (
          <div className="mt-8">
            <h2 className="font-serif text-[20px] text-forest-900">About this makhana</h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
              {product.description}
            </p>
          </div>
        )}

        <div className="mt-8 border border-beige-200 bg-ivory-100 p-5 rounded-lg">
          <h2 className="text-[13px] font-semibold uppercase tracking-wider text-forest-800">
            Bulk Wholesale Order?
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">
            Need commercial volume in 8kg White PP bags or custom export packaging? We provide direct mandi quotation from Purnea.
          </p>
          <Link href="/bulk-orders" className="btn-outline-gold btn-sm mt-4">
            Request Wholesale Quotation
          </Link>
        </div>

        <p className="mt-6 text-[12.5px] text-ink-500">
          PAN-India dispatch ·{" "}
          <Link
            href="/shipping-policy"
            className="text-forest-700 underline decoration-gold-500 underline-offset-4"
          >
            shipping details
          </Link>{" "}
          ·{" "}
          <Link
            href="/returns-policy"
            className="text-forest-700 underline decoration-gold-500 underline-offset-4"
          >
            returns policy
          </Link>
        </p>
      </div>
    </div>
  );
}
