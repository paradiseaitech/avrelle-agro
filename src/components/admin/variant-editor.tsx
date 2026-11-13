"use client";

import { useActionState } from "react";
import {
  addVariantAction,
  deleteVariantAction,
  updateVariantAction,
  type ActionResult,
} from "@/lib/actions/admin-catalogue";

const initial: ActionResult = {};

interface VariantValues {
  id: string;
  label: string;
  weightG: number | null;
  pricePaise: number;
  compareAtPricePaise: number | null;
  stock: number;
  lowStockThreshold?: number;
  sku: string | null;
  active: boolean;
  sortOrder: number;
}

function rupees(paise: number | null): string {
  if (paise === null) return "";
  return String(paise / 100);
}

export function VariantEditor({
  productId,
  variant,
}: {
  productId: string;
  variant: VariantValues;
}) {
  const [state, action, pending] = useActionState(updateVariantAction, initial);

  return (
    <li className="border border-beige-200 bg-ivory-50 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-forest-900">{variant.label}</p>
        <span
          className={`border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
            variant.active
              ? "border-emerald-600/30 bg-emerald-50 text-emerald-800"
              : "border-ink-400/30 bg-white text-ink-500"
          }`}
        >
          {variant.active ? "Active" : "Inactive"}
        </span>
      </div>

      <form action={action}>
        <input type="hidden" name="id" value={variant.id} />
        <input type="hidden" name="productId" value={productId} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="field-label" htmlFor={`v-label-${variant.id}`}>Label *</label>
            <input id={`v-label-${variant.id}`} name="label" defaultValue={variant.label} className="field" required />
          </div>
          <div>
            <label className="field-label" htmlFor={`v-weight-${variant.id}`}>Weight (g)</label>
            <input id={`v-weight-${variant.id}`} name="weightG" inputMode="numeric" defaultValue={variant.weightG ?? ""} className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor={`v-sku-${variant.id}`}>SKU</label>
            <input id={`v-sku-${variant.id}`} name="sku" defaultValue={variant.sku ?? ""} className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor={`v-price-${variant.id}`}>Price (₹) *</label>
            <input id={`v-price-${variant.id}`} name="priceRupees" inputMode="decimal" defaultValue={rupees(variant.pricePaise)} className="field" required />
          </div>
          <div>
            <label className="field-label" htmlFor={`v-compare-${variant.id}`}>Compare-at (₹)</label>
            <input id={`v-compare-${variant.id}`} name="compareAtRupees" inputMode="decimal" defaultValue={rupees(variant.compareAtPricePaise)} className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor={`v-stock-${variant.id}`}>Stock *</label>
            <input id={`v-stock-${variant.id}`} name="stock" inputMode="numeric" defaultValue={variant.stock} className="field" required />
          </div>
          <div>
            <label className="field-label" htmlFor={`v-threshold-${variant.id}`}>Low-stock alert at</label>
            <input id={`v-threshold-${variant.id}`} name="lowStockThreshold" inputMode="numeric" defaultValue={variant.lowStockThreshold ?? 10} className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor={`v-sort-${variant.id}`}>Sort order</label>
            <input id={`v-sort-${variant.id}`} name="sortOrder" inputMode="numeric" defaultValue={variant.sortOrder} className="field" />
          </div>
          <label className="flex items-end gap-2 pb-2.5 text-[13px] text-ink-800 sm:col-span-2">
            <input type="checkbox" name="active" defaultChecked={variant.active} />
            Active for sale
          </label>
        </div>

        {state.error && (
          <p role="alert" className="mt-2 text-[12px] text-danger-600">{state.error}</p>
        )}
        {state.ok && (
          <p role="status" className="mt-2 text-[12px] font-medium text-emerald-700">Variant saved.</p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={pending} className="btn-primary btn-sm">
            {pending ? "Saving…" : "Save Variant"}
          </button>
        </div>
      </form>

      <form
        action={deleteVariantAction}
        className="mt-2"
        onSubmit={(e) => {
          if (!window.confirm(`Delete the “${variant.label}” variant? This cannot be undone.`)) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={variant.id} />
        <input type="hidden" name="productId" value={productId} />
        <button type="submit" className="text-[11.5px] font-medium text-danger-600 hover:underline">
          Delete variant
        </button>
      </form>
    </li>
  );
}

export function AddVariantForm({ productId }: { productId: string }) {
  const [state, action, pending] = useActionState(addVariantAction, initial);

  return (
    <form action={action} className="border border-dashed border-forest-800/30 bg-white p-4">
      <input type="hidden" name="productId" value={productId} />
      <p className="text-[13px] font-semibold text-forest-900">Add a pack size / variant</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="new-v-label" className="field-label">Label *</label>
          <input id="new-v-label" name="label" required placeholder="250 g" className="field" />
        </div>
        <div>
          <label htmlFor="new-v-weight" className="field-label">Weight (g)</label>
          <input id="new-v-weight" name="weightG" inputMode="numeric" placeholder="250" className="field" />
        </div>
        <div>
          <label htmlFor="new-v-sku" className="field-label">SKU</label>
          <input id="new-v-sku" name="sku" placeholder="AV-6S-250" className="field" />
        </div>
        <div>
          <label htmlFor="new-v-price" className="field-label">Price (₹) *</label>
          <input id="new-v-price" name="priceRupees" inputMode="decimal" required placeholder="499" className="field" />
        </div>
        <div>
          <label htmlFor="new-v-compare" className="field-label">Compare-at (₹)</label>
          <input id="new-v-compare" name="compareAtRupees" inputMode="decimal" placeholder="599" className="field" />
        </div>
        <div>
          <label htmlFor="new-v-stock" className="field-label">Stock *</label>
          <input id="new-v-stock" name="stock" inputMode="numeric" defaultValue={0} required className="field" />
        </div>
        <div>
          <label htmlFor="new-v-threshold" className="field-label">Low stock alert at</label>
          <input id="new-v-threshold" name="lowStockThreshold" inputMode="numeric" defaultValue={10} className="field" />
        </div>
        <div>
          <label htmlFor="new-v-sort" className="field-label">Sort order</label>
          <input id="new-v-sort" name="sortOrder" inputMode="numeric" defaultValue={0} className="field" />
        </div>
        <label className="flex items-end gap-2 pb-2.5 text-[13px] text-ink-800">
          <input type="checkbox" name="active" defaultChecked />
          Active for sale
        </label>
      </div>

      {state.error && (
        <p role="alert" className="mt-2 text-[12px] text-danger-600">{state.error}</p>
      )}
      {state.ok && (
        <p role="status" className="mt-2 text-[12px] font-medium text-emerald-700">
          Variant added.
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-outline btn-sm mt-3">
        {pending ? "Adding…" : "Add Variant"}
      </button>
    </form>
  );
}
