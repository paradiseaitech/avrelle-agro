import Link from "next/link";
import type { ProductListItem } from "@/lib/db-data";
import { ProductCard } from "@/components/product/product-card";

export function FeaturedProducts({ products }: { products: ProductListItem[] }) {
  if (!products.length) return null;
  return (
    <section aria-labelledby="featured-heading" className="border-y border-beige-200 bg-beige-100/60">
      <div className="section-shell py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow">Featured</p>
            <h2 id="featured-heading" className="mt-3 font-serif text-[30px] text-forest-900 sm:text-[36px]">
              Selected Makhana Packs
            </h2>
          </div>
          <Link href="/shop" className="btn-outline btn-sm">
            View All
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
