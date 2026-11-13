import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminProduct, listAllGradesAdmin } from "@/lib/admin-data";
import { ProductForm } from "@/components/admin/product-form";
import { AddVariantForm, VariantEditor } from "@/components/admin/variant-editor";
import { DeleteProductForm } from "@/components/admin/danger-forms";

export const metadata: Metadata = { title: "Edit Product" };

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const [product, grades] = await Promise.all([getAdminProduct(id), listAllGradesAdmin()]);
  if (!product) notFound();

  const variants = [...product.variants].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/admin" className="hover:text-forest-700">Dashboard</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/admin/products" className="hover:text-forest-700">Products</Link></li>
          <li aria-hidden="true">/</li>
          <li className="truncate font-medium text-forest-800">{product.name}</li>
        </ol>
      </nav>

      {created === "1" && (
        <p role="status" className="border border-emerald-600/30 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800">
          Product created. Add at least one pack size below so it can be sold.
        </p>
      )}

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Edit product</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900">{product.name}</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            /{product.slug} · {variants.length} variant{variants.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.status === "published" && (
            <a
              href={`/product/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline btn-sm"
            >
              View on Store
            </a>
          )}
          <Link href="/admin/products" className="btn-outline btn-sm">All Products</Link>
        </div>
      </header>

      <ProductForm
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          gradeId: product.gradeId,
          tagline: product.tagline,
          description: product.description,
          storageInstructions: product.storageInstructions,
          ingredients: product.ingredients,
          images: product.images,
          status: product.status,
          featured: product.featured,
          retailAvailable: product.retailAvailable,
          usesSamplePrices: product.usesSamplePrices,
        }}
        grades={grades.map((g) => ({ id: g.id, name: g.name }))}
      />

      <section className="border border-beige-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-[21px] text-forest-900">Pack sizes &amp; stock</h2>
            <p className="mt-1 text-[12.5px] text-ink-500">
              Prices are authoritative at checkout. Stock is decremented atomically on each order.
            </p>
          </div>
        </div>

        {variants.length === 0 ? (
          <p className="mt-4 border border-dashed border-beige-300 bg-ivory-50 px-4 py-6 text-center text-[13px] text-ink-500">
            No variants yet. Add the first pack size below.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {variants.map((v) => (
              <VariantEditor
                key={v.id}
                productId={product.id}
                variant={{
                  id: v.id,
                  label: v.label,
                  weightG: v.weightG,
                  pricePaise: v.pricePaise,
                  compareAtPricePaise: v.compareAtPricePaise,
                  stock: v.stock,
                  sku: v.sku,
                  active: v.active,
                  sortOrder: v.sortOrder,
                }}
              />
            ))}
          </ul>
        )}

        <div className="mt-5">
          <AddVariantForm productId={product.id} />
        </div>
      </section>

      <section className="border border-danger-600/25 bg-white p-5 sm:p-6">
        <h2 className="font-serif text-[19px] text-forest-900">Danger zone</h2>
        <p className="mt-1 mb-4 text-[12.5px] leading-relaxed text-ink-500">
          Deleting removes the product and its variants from the catalogue. Historical orders keep
          their item snapshots. To hide a product temporarily, set its status to Draft instead.
        </p>
        <DeleteProductForm id={product.id} name={product.name} />
      </section>
    </div>
  );
}
