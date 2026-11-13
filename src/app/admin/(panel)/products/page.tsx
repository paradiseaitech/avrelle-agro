import type { Metadata } from "next";
import Link from "next/link";
import { listAdminProducts } from "@/lib/admin-data";
import { formatINRCompact } from "@/lib/utils";

export const metadata: Metadata = { title: "Products" };

const STATUS_STYLES: Record<string, string> = {
  published: "border-emerald-600/30 bg-emerald-50 text-emerald-800",
  draft: "border-amber-500/30 bg-amber-50 text-amber-800",
  archived: "border-ink-400/30 bg-ivory-100 text-ink-600",
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  const [{ deleted }, products] = await Promise.all([searchParams, listAdminProducts()]);
  const sampleCount = products.filter((p) => p.usesSamplePrices).length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Catalogue</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900">Products</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            {products.length} product{products.length === 1 ? "" : "s"}
            {sampleCount > 0 ? ` · ${sampleCount} using sample prices` : ""}.
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary btn-sm">Add Product</Link>
      </header>

      {deleted === "1" && (
        <p role="status" className="border border-beige-200 bg-white px-4 py-3 text-[13px] text-ink-700">
          Product deleted.
        </p>
      )}

      {sampleCount > 0 && (
        <p className="border border-gold-500/40 bg-gold-100/50 px-4 py-3 text-[12.5px] leading-relaxed text-gold-800">
          Some products still use sample retail prices. Replace them with verified prices and uncheck
          “Prices are sample / provisional” before launch.
        </p>
      )}

      <div className="border border-beige-200 bg-white">
        {products.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-[13.5px] text-ink-500">No products yet.</p>
            <Link href="/admin/products/new" className="btn-primary btn-sm mt-4 inline-flex">
              Create the first product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-beige-200 text-[10.5px] uppercase tracking-wider text-ink-500">
                  <th className="px-5 py-3 font-semibold">Product</th>
                  <th className="px-3 py-3 font-semibold">Grade</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 text-center font-semibold">Variants</th>
                  <th className="px-3 py-3 text-right font-semibold">Price from</th>
                  <th className="px-3 py-3 text-right font-semibold">Stock</th>
                  <th className="px-5 py-3 font-semibold">Flags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200">
                {products.map((p) => {
                  const active = p.variants.filter((v) => v.active);
                  const stock = active.reduce((n, v) => n + v.stock, 0);
                  const minPrice = active.length
                    ? Math.min(...active.map((v) => v.pricePaise))
                    : null;
                  return (
                    <tr key={p.id} className="hover:bg-ivory-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-beige-200 bg-ivory-100">
                            <img
                              src={p.images[0] ?? "/brand/pack-mockup.svg"}
                              alt=""
                              className="h-10 w-10 object-contain"
                            />
                          </span>
                          <span className="min-w-0">
                            <Link
                              href={`/admin/products/${p.id}`}
                              className="block truncate font-medium text-forest-800 hover:text-gold-700"
                            >
                              {p.name}
                            </Link>
                            <span className="block truncate text-[11px] text-ink-400">/{p.slug}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[12.5px] text-ink-600">
                        {p.grade?.name ?? "—"}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            STATUS_STYLES[p.status] ?? STATUS_STYLES.draft
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center text-ink-700">{active.length}</td>
                      <td className="px-3 py-3 text-right text-ink-800">
                        {minPrice === null ? "—" : formatINRCompact(minPrice)}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <span className={stock === 0 ? "font-semibold text-danger-600" : "text-ink-800"}>
                          {stock}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="flex flex-wrap gap-1.5">
                          {p.featured && (
                            <span className="border border-gold-500/40 bg-gold-100/60 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-gold-800">
                              Featured
                            </span>
                          )}
                          {!p.retailAvailable && (
                            <span className="border border-beige-300 bg-ivory-100 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-ink-600">
                              Not retail
                            </span>
                          )}
                          {p.usesSamplePrices && (
                            <span className="border border-amber-500/30 bg-amber-50 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-amber-800">
                              Sample price
                            </span>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
