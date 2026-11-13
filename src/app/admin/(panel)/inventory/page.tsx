import type { Metadata } from "next";
import Link from "next/link";
import { listAdminProducts, listStockAdjustments } from "@/lib/admin-data";
import { StockAdjustmentModal } from "@/components/admin/stock-adjustment-form";
import { AlertTriangle, XCircle, CheckCircle2, History, Layers } from "lucide-react";

export const metadata: Metadata = { title: "Inventory & Stock Management" };

export default async function AdminInventoryPage() {
  const [products, movements] = await Promise.all([
    listAdminProducts(),
    listStockAdjustments(100),
  ]);

  // Flatten variants with parent product info
  const allVariants = products.flatMap((p) =>
    p.variants.map((v) => ({
      ...v,
      productName: p.name,
      productSlug: p.slug,
      productId: p.id,
      productStatus: p.status,
    })),
  );

  const lowStockVariants = allVariants.filter(
    (v) => v.active && v.stock > 0 && v.stock <= v.lowStockThreshold,
  );
  const outOfStockVariants = allVariants.filter((v) => v.active && v.stock <= 0);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Warehouse &amp; Logistics</p>
          <h1 className="mt-1 font-serif text-[30px] text-forest-900 sm:text-[34px]">
            Inventory &amp; Stock Management
          </h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Real-time stock quantities, low-stock threshold triggers, and immutable stock movement audit logs.
          </p>
        </div>
        <Link href="/admin/products" className="btn-outline btn-sm">
          Manage Catalogue
        </Link>
      </header>

      {/* Stock Health Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border border-beige-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase text-ink-600 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-forest-700" /> Total Active Variants
            </span>
            <span className="font-serif text-[24px] text-forest-950">
              {allVariants.filter((v) => v.active).length}
            </span>
          </div>
          <p className="mt-1 text-[11.5px] text-ink-400">Available across all retail sizes.</p>
        </div>

        <div className="border border-amber-200 bg-amber-50/40 p-5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-600" /> Low Stock Warning
            </span>
            <span className="font-serif text-[24px] text-amber-950">
              {lowStockVariants.length}
            </span>
          </div>
          <p className="mt-1 text-[11.5px] text-amber-800">
            Variants at or under threshold needing restocking.
          </p>
        </div>

        <div className="border border-danger-200 bg-danger-50/40 p-5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase text-danger-900 flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-danger-600" /> Out of Stock
            </span>
            <span className="font-serif text-[24px] text-danger-950">
              {outOfStockVariants.length}
            </span>
          </div>
          <p className="mt-1 text-[11.5px] text-danger-800">
            Blocked from customer checkout to prevent overselling.
          </p>
        </div>
      </div>

      {/* Current Variants Table */}
      <section className="border border-beige-200 bg-white">
        <div className="border-b border-beige-200 px-5 py-4 flex items-center justify-between">
          <h2 className="font-serif text-[19px] text-forest-900">Catalogue Stock Levels</h2>
          <span className="text-[12px] text-ink-500">{allVariants.length} total variants</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-beige-200 text-[10.5px] uppercase tracking-wider text-ink-500">
                <th className="px-5 py-3 font-semibold">Product &amp; Variant</th>
                <th className="px-3 py-3 font-semibold">SKU</th>
                <th className="px-3 py-3 font-semibold">Current Stock</th>
                <th className="px-3 py-3 font-semibold">Low-Stock Alert At</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {allVariants.map((v) => {
                const isOutOfStock = v.stock <= 0;
                const isLow = !isOutOfStock && v.stock <= v.lowStockThreshold;

                return (
                  <tr key={v.id} className="hover:bg-ivory-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-forest-950">{v.productName}</p>
                      <p className="text-[11.5px] text-ink-500">
                        {v.label} {v.weightG ? `(${v.weightG}g)` : ""}
                      </p>
                    </td>
                    <td className="px-3 py-3.5 font-mono text-[12px] text-ink-600">
                      {v.sku || "—"}
                    </td>
                    <td className="px-3 py-3.5 font-serif text-[15px] font-bold text-forest-950">
                      {v.stock} units
                    </td>
                    <td className="px-3 py-3.5 text-ink-600">
                      ≤ {v.lowStockThreshold} units
                    </td>
                    <td className="px-3 py-3.5">
                      {!v.active ? (
                        <span className="rounded bg-beige-200 px-2 py-0.5 text-[11px] font-medium text-ink-600">
                          Inactive
                        </span>
                      ) : isOutOfStock ? (
                        <span className="inline-flex items-center gap-1 rounded bg-danger-100 px-2 py-0.5 text-[11px] font-bold text-danger-800">
                          <XCircle className="h-3 w-3" /> Out of stock
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                          <AlertTriangle className="h-3 w-3" /> Low stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                          <CheckCircle2 className="h-3 w-3" /> In stock
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <StockAdjustmentModal
                        variant={v}
                        productName={v.productName}
                        productId={v.productId}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Stock Movement Audit Log */}
      <section className="border border-beige-200 bg-white">
        <div className="border-b border-beige-200 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-gold-600" />
            <h2 className="font-serif text-[19px] text-forest-900">Stock Movement Audit History</h2>
          </div>
          <span className="text-[12px] text-ink-500">Last 100 adjustments</span>
        </div>

        {movements.length === 0 ? (
          <p className="px-5 py-8 text-[13.5px] text-ink-500">
            No stock adjustments recorded yet. Movements are automatically recorded upon order placement, cancellation, and manual administrative updates.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-beige-200 text-[10.5px] uppercase tracking-wider text-ink-500">
                  <th className="px-5 py-2.5 font-semibold">Date &amp; Time</th>
                  <th className="px-3 py-2.5 font-semibold">Product &amp; Variant</th>
                  <th className="px-3 py-2.5 font-semibold">Change</th>
                  <th className="px-3 py-2.5 font-semibold">Levels</th>
                  <th className="px-3 py-2.5 font-semibold">Reason</th>
                  <th className="px-3 py-2.5 font-semibold">Ref / Notes</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Initiator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-100">
                {movements.map((m) => (
                  <tr key={m.id} className="hover:bg-ivory-50/60">
                    <td className="px-5 py-3 text-ink-500 text-[12px]">
                      {new Date(m.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-medium text-forest-950">{m.productName || "Product"}</p>
                      <p className="text-[11.5px] text-ink-500">{m.variantLabel}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`font-mono font-bold ${
                          m.changeQty > 0
                            ? "text-emerald-700"
                            : m.changeQty < 0
                            ? "text-danger-700"
                            : "text-ink-600"
                        }`}
                      >
                        {m.changeQty > 0 ? `+${m.changeQty}` : m.changeQty}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[12px] text-ink-600">
                      {m.previousQty} &rarr; <span className="font-bold text-ink-900">{m.newQty}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded bg-ivory-100 px-2 py-0.5 text-[11px] font-medium text-forest-900 uppercase">
                        {m.reason.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[12px] text-ink-600">
                      {m.reference && <span className="font-mono font-medium">{m.reference} </span>}
                      {m.notes && <span className="text-ink-500">{m.notes}</span>}
                    </td>
                    <td className="px-5 py-3 text-right text-[11.5px] text-ink-500 truncate max-w-[140px]">
                      {m.adjustedBy || "System"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
