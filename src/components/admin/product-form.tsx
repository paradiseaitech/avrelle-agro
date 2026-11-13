"use client";

import { useActionState } from "react";
import { saveProductAction, type ActionResult } from "@/lib/actions/admin-catalogue";
import { ImageField } from "@/components/admin/image-field";

export interface ProductFormValues {
  id?: string;
  name: string;
  slug: string;
  gradeId: string | null;
  category?: string;
  makhanaGrade?: string | null;
  tagline: string | null;
  description: string | null;
  storageInstructions: string | null;
  ingredients: string | null;
  images: string[];
  status: string;
  featured: boolean;
  retailAvailable: boolean;
  usesSamplePrices: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

const initial: ActionResult = {};

export function ProductForm({
  product,
  grades,
}: {
  product?: ProductFormValues;
  grades: Array<{ id: string; name: string }>;
}) {
  const [state, action, pending] = useActionState(saveProductAction, initial);
  const isEdit = Boolean(product?.id);

  return (
    <form action={action} className="space-y-6">
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      <section className="border border-beige-200 bg-white p-5 sm:p-6">
        <h2 className="font-serif text-[19px] text-forest-900">Basics</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="p-name" className="field-label">Product name *</label>
            <input
              id="p-name"
              name="name"
              required
              defaultValue={product?.name ?? ""}
              className="field"
              placeholder="6+ Suta Phool Makhana"
            />
          </div>
          <div>
            <label htmlFor="p-slug" className="field-label">URL slug</label>
            <input
              id="p-slug"
              name="slug"
              defaultValue={product?.slug ?? ""}
              className="field"
              placeholder="6-suta-phool-makhana"
            />
            <p className="mt-1 text-[11px] text-ink-500">
              Leave blank to generate from the name. Changing it changes the product URL.
            </p>
          </div>
          <div>
            <label htmlFor="p-category" className="field-label">Category *</label>
            <input
              id="p-category"
              name="category"
              required
              defaultValue={product?.category ?? "Makhana"}
              className="field"
              placeholder="Makhana"
            />
          </div>
          <div>
            <label htmlFor="p-makhana-grade" className="field-label">Makhana Grade Specification</label>
            <input
              id="p-makhana-grade"
              name="makhanaGrade"
              defaultValue={product?.makhanaGrade ?? ""}
              className="field"
              placeholder="e.g. 6+ Suta / 19mm+ Jumbo"
            />
          </div>
          <div>
            <label htmlFor="p-grade" className="field-label">Catalogue Grade Reference</label>
            <select
              id="p-grade"
              name="gradeId"
              defaultValue={product?.gradeId ?? ""}
              className="field"
            >
              <option value="">No linked grade</option>
              {grades.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="p-status" className="field-label">Status</label>
            <select
              id="p-status"
              name="status"
              defaultValue={product?.status ?? "draft"}
              className="field"
            >
              <option value="draft">Draft (hidden)</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="p-tagline" className="field-label">Tagline</label>
            <input
              id="p-tagline"
              name="tagline"
              defaultValue={product?.tagline ?? ""}
              className="field"
              placeholder="One line shown on product cards"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="p-description" className="field-label">Description</label>
            <textarea
              id="p-description"
              name="description"
              rows={4}
              defaultValue={product?.description ?? ""}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="p-ingredients" className="field-label">Ingredients</label>
            <input
              id="p-ingredients"
              name="ingredients"
              defaultValue={product?.ingredients ?? ""}
              className="field"
              placeholder="Phool makhana (fox nuts)"
            />
          </div>
          <div>
            <label htmlFor="p-storage" className="field-label">Storage instructions</label>
            <input
              id="p-storage"
              name="storageInstructions"
              defaultValue={product?.storageInstructions ?? ""}
              className="field"
              placeholder="Store in a cool, dry place…"
            />
          </div>
          <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2 pt-2 border-t border-beige-100">
            <div>
              <label htmlFor="p-seo-title" className="field-label">SEO Title</label>
              <input
                id="p-seo-title"
                name="seoTitle"
                defaultValue={product?.seoTitle ?? ""}
                className="field"
                placeholder="Custom browser title tag"
              />
            </div>
            <div>
              <label htmlFor="p-seo-desc" className="field-label">SEO Meta Description</label>
              <input
                id="p-seo-desc"
                name="seoDescription"
                defaultValue={product?.seoDescription ?? ""}
                className="field"
                placeholder="Search engine meta description"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border border-beige-200 bg-white p-5 sm:p-6">
        <h2 className="font-serif text-[19px] text-forest-900">Images</h2>
        <div className="mt-4">
          <ImageField name="images" initial={product?.images ?? []} />
        </div>
      </section>

      <section className="border border-beige-200 bg-white p-5 sm:p-6">
        <h2 className="font-serif text-[19px] text-forest-900">Visibility &amp; pricing source</h2>
        <div className="mt-4 space-y-3">
          <label className="flex items-start gap-3 text-[13.5px] text-ink-800">
            <input type="checkbox" name="retailAvailable" defaultChecked={product?.retailAvailable ?? true} className="mt-0.5" />
            <span>
              Retail available
              <span className="mt-0.5 block text-[11.5px] text-ink-500">
                Allows this product and its variants to be purchased in the shop.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-[13.5px] text-ink-800">
            <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="mt-0.5" />
            <span>
              Featured on the homepage
              <span className="mt-0.5 block text-[11.5px] text-ink-500">
                Featured in-stock products appear first in the homepage selection.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-[13.5px] text-ink-800">
            <input type="checkbox" name="usesSamplePrices" defaultChecked={product?.usesSamplePrices ?? true} className="mt-0.5" />
            <span>
              Prices are sample / provisional
              <span className="mt-0.5 block text-[11.5px] text-ink-500">
                Keep checked until verified retail prices are entered. The storefront shows a preview
                notice while any product is sample-flagged.
              </span>
            </span>
          </label>
        </div>
      </section>

      {state.error && (
        <p role="alert" className="border border-danger-600/30 bg-danger-100 px-4 py-3 text-[13px] leading-relaxed text-danger-600">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p role="status" className="border border-emerald-600/30 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800">
          Saved. Storefront pages have been refreshed.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
