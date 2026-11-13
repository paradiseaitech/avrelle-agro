import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { listPublishedProducts, type ShopFilters } from "@/lib/db-data";
import { ProductCard } from "@/components/product/product-card";
import { SampleDataNotice } from "@/components/site/sample-data-notice";
import { ShopControls } from "@/components/shop/shop-controls";

export const metadata: Metadata = {
  title: "Shop Premium Makhana — 100g, 200g, 400g, 500g & 1 kg Packs",
  description:
    "Buy authentic phool makhana (fox nuts) directly from Purnea, Bihar in 100g, 200g, 400g, 500g, and 1 kg retail packs with Cash on Delivery across India.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; size?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const sortOptions = ["featured", "price-asc", "price-desc", "newest"] as const;
  type SortOption = (typeof sortOptions)[number];
  const sort: SortOption = sortOptions.includes(params.sort as SortOption)
    ? (params.sort as SortOption)
    : "featured";

  const packWeight = params.size ? parseInt(params.size, 10) : undefined;
  const filters: ShopFilters = {
    q: params.q?.trim() || undefined,
    packWeight: Number.isInteger(packWeight) ? packWeight : undefined,
    sort,
  };

  const products = await listPublishedProducts(filters);

  const sizeLabelMap: Record<string, string> = {
    "100": "100g Pocket Pack",
    "200": "200g Daily Pack",
    "400": "400g Family Pack",
    "500": "500g Pantry Pack",
    "1000": "1 kg Mega Pack",
  };
  const activeSizeLabel = params.size ? sizeLabelMap[params.size] : null;

  return (
    <>
      <SampleDataNotice />

      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-12">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-forest-700">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">Shop Makhana</li>
              {activeSizeLabel && (
                <>
                  <li aria-hidden="true">/</li>
                  <li className="font-medium text-forest-800">{activeSizeLabel}</li>
                </>
              )}
            </ol>
          </nav>
          <h1 className="mt-4 font-serif text-[32px] text-forest-900 sm:text-[40px]">
            {activeSizeLabel ? `${activeSizeLabel} Makhana` : "Shop Premium Makhana"}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
            Handpicked, 100% naturally harvested phool makhana (fox nuts) from Purnea, Bihar.
            Available in airtight, nitrogen-flushed <strong>100g, 200g, 400g, 500g, and 1 kg</strong> retail
            packs with <strong>Cash on Delivery</strong> available.
          </p>
        </div>
      </div>

      <div className="section-shell py-10 sm:py-14">
        <Suspense fallback={null}>
          <ShopControls activeSize={params.size} sort={filters.sort ?? "featured"} />
        </Suspense>

        {products.length === 0 ? (
          <div className="mt-14 border border-beige-200 bg-white px-6 py-16 text-center">
            <p className="font-serif text-[22px] text-forest-900">No products found</p>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink-600">
              {filters.q || filters.packWeight
                ? "Try a different search or pack size filter. For commercial bulk quantities, view our bulk rate card."
                : "The catalogue is being updated. Please check back soon or contact us."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/shop" className="btn-outline">
                Clear Filters
              </Link>
              <Link href="/bulk-orders" className="btn-primary">
                Bulk Enquiry
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-8 text-[13px] text-ink-500" role="status">
              {products.length} product{products.length === 1 ? "" : "s"}
              {filters.q ? ` for “${filters.q}”` : ""}
              {activeSizeLabel ? ` (${activeSizeLabel})` : ""}
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
