"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatINR } from "@/lib/utils";
import { useCartContext } from "@/components/cart/cart-context";
import { Check, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, Plus, Minus } from "lucide-react";
import type { ProductListItem, ProductVariantItem } from "@/lib/db-data";

interface PackDefinition {
  weightG: number;
  label: string;
  badge: string;
  isPopular?: boolean;
  tagline: string;
  description: string;
  pricePaise: number;
  compareAtPricePaise: number;
  image: string;
  defaultVariantId: string;
  highlights: string[];
}

const PACK_DEFINITIONS: PackDefinition[] = [
  {
    weightG: 100,
    label: "100 g Pack",
    badge: "Pocket & Trial",
    tagline: "Grab-and-go healthy snacking",
    description: "Compact trial pack for your desk, travel bag, or daily work munching.",
    pricePaise: 17900,
    compareAtPricePaise: 22900,
    image: "/brand/100g.png",
    defaultVariantId: "fdbfb80b-a161-4fcb-b96d-d29ebf4f713e",
    highlights: ["Single-serve freshness", "Fits bags & lunchboxes", "Airtight sealed"],
  },
  {
    weightG: 200,
    label: "200 g Pack",
    badge: "Daily Munch",
    tagline: "Weekly wellness snack portion",
    description: "Ideal quantity for active fitness enthusiasts seeking protein and low glycemic index.",
    pricePaise: 32900,
    compareAtPricePaise: 42900,
    image: "/brand/200g.png",
    defaultVariantId: "d27c5b48-4c41-413c-ac46-cbd659d6994a",
    highlights: ["High calcium & fiber", "Zero cholesterol", "Evenly roasted crunch"],
  },
  {
    weightG: 400,
    label: "400 g Pack",
    badge: "Family Choice",
    tagline: "Balanced size for sharing",
    description: "Generous value size for couples and small families for evening teas and wholesome snacks.",
    pricePaise: 59900,
    compareAtPricePaise: 77900,
    image: "/brand/400g.png",
    defaultVariantId: "7e825062-e639-4ba9-b1d7-5ccb255ac7d2",
    highlights: ["Resealable freshness lock", "23% savings on MRP", "Family favorite"],
  },
  {
    weightG: 500,
    label: "500 g Pack",
    badge: "Most Popular",
    isPopular: true,
    tagline: "Home pantry & fasting essential",
    description: "The classic kitchen pantry pack for curries, desserts, vrat recipes, and daily snacking.",
    pricePaise: 71900,
    compareAtPricePaise: 94900,
    image: "/brand/500g.png",
    defaultVariantId: "778c9099-0e4a-4a57-95c2-fb74717fb169",
    highlights: ["24% savings on MRP", "Vrat & festival pure", "Nitrogen-flushed pack"],
  },
  {
    weightG: 1000,
    label: "1 kg Mega Pack",
    badge: "Best Value · Mega Saver",
    tagline: "Maximum savings for regular consumers",
    description: "Our largest retail saver pack. Handpicked jumbo pops with best-in-class price per gram.",
    pricePaise: 137900,
    compareAtPricePaise: 179900,
    image: "/brand/1kg.png",
    defaultVariantId: "ddfef1b7-d52e-4dea-a377-83217c33843e",
    highlights: ["Maximum economy rate", "Lowest price per gram", "Long shelf life pouch"],
  },
];

export function PackSizeShowcase({
  products = [],
}: {
  products?: ProductListItem[];
}) {
  const router = useRouter();
  const { add } = useCartContext();
  const [quantities, setQuantities] = useState<Record<number, number>>({
    100: 1,
    200: 1,
    400: 1,
    500: 1,
    1000: 1,
  });
  const [addedPacks, setAddedPacks] = useState<Record<number, boolean>>({});

  // Find matching product & variant in database if available
  const primaryProduct = products[0];

  const getResolvedVariant = (pack: PackDefinition): {
    variantId: string;
    productId: string;
    productSlug: string;
    productName: string;
    gradeName: string;
    pricePaise: number;
    compareAtPricePaise: number;
    image: string;
  } => {
    let matchedVariant: ProductVariantItem | undefined;
    if (primaryProduct?.variants) {
      matchedVariant = primaryProduct.variants.find(
        (v) =>
          v.weightG === pack.weightG ||
          v.label.toLowerCase().includes(`${pack.weightG}g`) ||
          (pack.weightG === 1000 && /1\s*kg/i.test(v.label)),
      );
    }

    return {
      variantId: matchedVariant?.id ?? pack.defaultVariantId,
      productId: primaryProduct?.id ?? "c77214f4-c3c5-476c-8d42-a6672449f7e2",
      productSlug: primaryProduct?.slug ?? "phool-makhana-6-suta",
      productName: primaryProduct?.name ?? "AVRELLE Premium Phool Makhana",
      gradeName: pack.label,
      pricePaise: matchedVariant?.pricePaise ?? pack.pricePaise,
      compareAtPricePaise: matchedVariant?.compareAtPricePaise ?? pack.compareAtPricePaise,
      image: matchedVariant?.image ?? pack.image,
    };
  };

  const handleQuantityChange = (weightG: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[weightG] || 1;
      const updated = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [weightG]: updated };
    });
  };

  const handleAddToCart = (pack: PackDefinition) => {
    const resolved = getResolvedVariant(pack);
    const qty = quantities[pack.weightG] || 1;

    add(
      {
        variantId: resolved.variantId,
        productId: resolved.productId,
        productSlug: resolved.productSlug,
        productName: resolved.productName,
        gradeName: resolved.gradeName,
        variantLabel: pack.label,
        unitPricePaise: resolved.pricePaise,
        image: resolved.image,
      },
      qty,
    );

    setAddedPacks((prev) => ({ ...prev, [pack.weightG]: true }));
    setTimeout(() => {
      setAddedPacks((prev) => ({ ...prev, [pack.weightG]: false }));
    }, 2000);
  };

  const handleBuyNow = (pack: PackDefinition) => {
    handleAddToCart(pack);
    router.push("/checkout");
  };

  return (
    <section aria-labelledby="pack-size-heading" className="bg-ivory-50 py-16 sm:py-24 border-b border-beige-200">
      <div className="section-shell">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-50 px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-900 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-gold-700" />
            Retail Packs · Ready to Ship
          </div>
          <h2
            id="pack-size-heading"
            className="mt-4 font-serif text-[30px] font-bold text-charcoal-900 sm:text-[40px] leading-tight"
          >
            Choose Your Makhana Pack Size
          </h2>
          <span className="ornament-line mt-3 block mx-auto" aria-hidden="true" />
          <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-muted-grey">
            From single-serve snack pouches to family pantry packs. Every pack is freshly roasted,
            vacuum sealed, and shipped directly from Purnea, Bihar with <strong>Cash on Delivery</strong> available.
          </p>
        </div>

        {/* 5-Card Responsive Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {PACK_DEFINITIONS.map((pack) => {
            const resolved = getResolvedVariant(pack);
            const qty = quantities[pack.weightG] || 1;
            const isAdded = !!addedPacks[pack.weightG];
            const discountPct = Math.round(
              ((resolved.compareAtPricePaise - resolved.pricePaise) / resolved.compareAtPricePaise) * 100,
            );

            return (
              <div
                key={pack.weightG}
                className={`group relative flex flex-col rounded-2xl bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  pack.isPopular
                    ? "border-2 border-gold-500 shadow-md ring-4 ring-gold-400/10"
                    : "border border-beige-300 shadow-xs hover:border-gold-400"
                }`}
              >
                {/* Popular / Best Value Badge */}
                {pack.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    ★ {pack.badge}
                  </span>
                )}

                {!pack.isPopular && (
                  <span className="mb-2 self-start rounded-full bg-ivory-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-charcoal-800 border border-beige-200">
                    {pack.badge}
                  </span>
                )}

                {/* Packaging Image */}
                <div className="relative my-2 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-ivory-50 p-2 border border-beige-200">
                  <img
                    src={resolved.image}
                    alt={`AVRELLE Phool Makhana ${pack.label}`}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {discountPct > 0 && (
                    <span className="absolute right-2 top-2 rounded-md bg-gold-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      {discountPct}% OFF
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 rounded bg-charcoal-900/80 px-2 py-0.5 text-[10.5px] font-mono font-semibold text-white backdrop-blur-xs">
                    {pack.weightG >= 1000 ? "1 KG" : `${pack.weightG}g`}
                  </span>
                </div>

                {/* Pack Title & Tagline */}
                <div className="mt-2">
                  <h3 className="font-serif text-[18px] font-bold text-charcoal-900">
                    {pack.label}
                  </h3>
                  <p className="mt-1 text-[12px] font-medium text-muted-grey line-clamp-1">
                    {pack.tagline}
                  </p>
                </div>

                {/* Pricing Block */}
                <div className="mt-3 border-y border-beige-200 py-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-[22px] font-bold text-charcoal-900">
                      {formatINR(resolved.pricePaise)}
                    </span>
                    {resolved.compareAtPricePaise > resolved.pricePaise && (
                      <span className="text-[12px] text-muted-grey line-through">
                        {formatINR(resolved.compareAtPricePaise)}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[10.5px] text-muted-grey">
                    Inclusive of all taxes · COD available
                  </p>
                </div>

                {/* Quality Highlights */}
                <ul className="mt-3 space-y-1 text-[11.5px] text-muted-grey">
                  {pack.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 shrink-0 text-gold-600" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Quantity and Actions */}
                <div className="mt-auto pt-4 space-y-2">
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between rounded-lg border border-beige-200 bg-ivory-50 px-2.5 py-1">
                    <span className="text-[11px] font-medium text-muted-grey">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(pack.weightG, -1)}
                        className="rounded p-1 text-charcoal-800 hover:bg-beige-200 transition-colors cursor-pointer"
                        aria-label={`Decrease quantity for ${pack.label}`}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-[12px] font-bold font-mono text-charcoal-900">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(pack.weightG, 1)}
                        className="rounded p-1 text-charcoal-800 hover:bg-beige-200 transition-colors cursor-pointer"
                        aria-label={`Increase quantity for ${pack.label}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(pack)}
                    className={`w-full rounded-lg py-2 text-[12px] font-bold tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                      isAdded
                        ? "bg-charcoal-900 text-gold-300 shadow-inner"
                        : pack.isPopular
                        ? "btn-gold"
                        : "btn-primary"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-gold-400" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add {qty > 1 ? `(${qty})` : ""} to Cart
                      </>
                    )}
                  </button>

                  {/* Buy Now link */}
                  <button
                    type="button"
                    onClick={() => handleBuyNow(pack)}
                    className="w-full text-center text-[11px] font-semibold text-charcoal-900 underline underline-offset-2 hover:text-gold-700 transition-colors py-0.5 cursor-pointer"
                  >
                    Buy Now with Instant Checkout →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Trust Strip */}
        <div className="mt-12 rounded-2xl border border-beige-300 bg-white p-5 sm:p-6 shadow-xs">
          <div className="grid gap-4 sm:grid-cols-3 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-beige-200">
            <div className="flex items-center gap-3.5 justify-center sm:justify-start sm:px-4">
              <div className="rounded-full bg-gold-50 p-2.5 text-gold-700 border border-gold-200">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-[15px] font-bold text-charcoal-900">
                  Cash on Delivery &amp; Fast Dispatch
                </h4>
                <p className="text-[12px] text-muted-grey">
                  Reliable delivery across all serviceable Indian PIN codes.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start sm:px-4 pt-3 sm:pt-0">
              <div className="rounded-full bg-gold-50 p-2.5 text-gold-700 border border-gold-200">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-[15px] font-bold text-charcoal-900">
                  100% Purnea Authentic
                </h4>
                <p className="text-[12px] text-muted-grey">
                  Naturally harvested &amp; processed in the makhana capital of India.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start sm:px-4 pt-3 sm:pt-0">
              <div className="rounded-full bg-sage-50 p-2.5 text-sage-700 border border-sage-200">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-[15px] font-bold text-charcoal-900">
                  Need Commercial Volume?
                </h4>
                <Link
                  href="/bulk-orders"
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-charcoal-900 hover:text-gold-700 underline"
                >
                  View 8-Tier Wholesale Rate Card (₹350–₹1,275/kg)
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
