"use client";

import { useActionState, useEffect, useState } from "react";
import { updateVariantAction } from "@/lib/actions/admin-catalogue";
import { Edit3, CheckCircle } from "lucide-react";

export function StockAdjustmentModal({
  variant,
  productName,
  productId,
}: {
  variant: {
    id: string;
    label: string;
    stock: number;
    lowStockThreshold: number;
    sku: string | null;
    pricePaise: number;
    compareAtPricePaise: number | null;
    weightG: number | null;
    active: boolean;
  };
  productName: string;
  productId: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(updateVariantAction, {});
  const [stock, setStock] = useState(variant.stock);

  useEffect(() => {
    if (state?.ok) {
      setOpen(false);
    }
  }, [state?.ok]);

  const priceRupees = (variant.pricePaise / 100).toFixed(2);
  const compareRupees = variant.compareAtPricePaise
    ? (variant.compareAtPricePaise / 100).toFixed(2)
    : "";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-[12px] font-medium text-forest-700 hover:text-gold-700 underline"
      >
        <Edit3 className="h-3.5 w-3.5" /> Adjust Stock
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-sm border border-gold-500/30 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-beige-200 pb-3 mb-4">
              <div>
                <h3 className="font-serif text-[18px] text-forest-950">
                  Adjust Inventory
                </h3>
                <p className="text-[12px] text-ink-500">
                  {productName} — {variant.label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-ink-400 hover:text-ink-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form action={action} className="space-y-4 text-left">
              <input type="hidden" name="id" value={variant.id} />
              <input type="hidden" name="productId" value={productId} />
              <input type="hidden" name="label" value={variant.label} />
              <input type="hidden" name="priceRupees" value={priceRupees} />
              <input type="hidden" name="compareAtRupees" value={compareRupees} />
              <input type="hidden" name="weightG" value={variant.weightG ?? ""} />
              <input type="hidden" name="sku" value={variant.sku ?? ""} />
              <input type="hidden" name="active" value={variant.active ? "on" : ""} />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Current Stock</label>
                  <input
                    type="text"
                    disabled
                    value={variant.stock}
                    className="field bg-ivory-100 text-ink-600"
                  />
                </div>
                <div>
                  <label className="field-label">New Stock Quantity *</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="field font-bold text-forest-900"
                  />
                </div>
              </div>

              <div>
                <label className="field-label">Low Stock Threshold *</label>
                <input
                  name="lowStockThreshold"
                  type="number"
                  min="0"
                  required
                  defaultValue={variant.lowStockThreshold}
                  className="field"
                />
                <p className="text-[11px] text-ink-400 mt-1">
                  Alert badge appears when stock falls below this quantity.
                </p>
              </div>

              <div>
                <label className="field-label">Adjustment Reason *</label>
                <select name="reason" className="field" required defaultValue="manual_correction">
                  <option value="purchase_received">Purchase / Harvest Received</option>
                  <option value="manual_correction">Manual Count Correction</option>
                  <option value="damaged_goods">Damaged / Write-off</option>
                  <option value="order_cancelled">Cancellation Restock</option>
                  <option value="other">Other Administrative Adjustment</option>
                </select>
              </div>

              <div>
                <label className="field-label">Notes (optional)</label>
                <input
                  name="notes"
                  placeholder="e.g. Batch #2026-P04 count reconciliation"
                  className="field"
                />
              </div>

              {state?.error && (
                <p className="text-[12px] text-danger-600">{state.error}</p>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-beige-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="btn-primary btn-sm"
                >
                  {pending ? "Saving…" : "Save Inventory"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
