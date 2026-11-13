import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getSettings, listRelatedProducts } from "@/lib/db-data";
import { ProductCard } from "@/components/product/product-card";
import { ProductShowcase } from "@/components/product/product-showcase";
import { SampleDataNotice } from "@/components/site/sample-data-notice";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ variant?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description:
      product.description?.slice(0, 155) ??
      `${product.name} — ${product.gradeName ?? "graded"} phool makhana from AVRELLE AGRO, Purnea, Bihar.`,
    openGraph: {
      title: product.name,
      description: product.tagline ?? undefined,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : undefined;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, settings] = await Promise.all([
    listRelatedProducts(product.gradeId, product.id),
    getSettings(),
  ]);
  const minPrice = product.minPricePaise;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? product.tagline ?? product.name,
    image: product.images,
    sku: product.variants[0]?.sku ?? undefined,
    brand: { "@type": "Brand", name: "AVRELLE AGRO" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      offerCount: product.variants.length,
      lowPrice: minPrice != null ? (minPrice / 100).toFixed(2) : undefined,
      highPrice:
        product.maxPricePaise != null ? (product.maxPricePaise / 100).toFixed(2) : undefined,
      availability: product.totalStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <SampleDataNotice />

      <div className="section-shell py-6">
        <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/shop" className="hover:text-forest-700">Shop</Link></li>
            <li aria-hidden="true">/</li>
            {product.gradeSlug ? (
              <>
                <li>
                  <Link href={`/shop?grade=${product.gradeSlug}`} className="hover:text-forest-700">
                    {product.gradeName}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
              </>
            ) : null}
            <li className="font-medium text-forest-800">{product.name}</li>
          </ol>
        </nav>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <section className="section-shell pb-14">
        <ProductShowcase product={product} initialVariantId={query?.variant} />
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-beige-200 bg-ivory-100">
          <div className="section-shell py-14">
            <h2 id="related-heading" className="font-serif text-[26px] text-forest-900">
              You may also like
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
