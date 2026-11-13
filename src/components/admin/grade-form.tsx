"use client";

import { useActionState } from "react";
import { saveGradeAction, type ActionResult } from "@/lib/actions/admin-catalogue";

const initial: ActionResult = {};

export interface GradeFormValues {
  id?: string;
  slug: string;
  name: string;
  sizeMinMm: number | null;
  sizeMaxMm: number | null;
  summary: string | null;
  description: string | null;
  image: string | null;
  sortOrder: number;
  published: boolean;
}

export function GradeForm({ grade }: { grade?: GradeFormValues }) {
  const [state, action, pending] = useActionState(saveGradeAction, initial);
  const id = grade?.id;

  return (
    <form action={action} className="space-y-4">
      {id && <input type="hidden" name="id" value={id} />}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="field-label" htmlFor={`g-name-${id ?? "new"}`}>Name *</label>
          <input
            id={`g-name-${id ?? "new"}`}
            name="name"
            required
            defaultValue={grade?.name ?? ""}
            placeholder="6+ Suta"
            className="field"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`g-slug-${id ?? "new"}`}>Slug</label>
          <input
            id={`g-slug-${id ?? "new"}`}
            name="slug"
            defaultValue={grade?.slug ?? ""}
            placeholder="6-suta"
            className="field"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`g-sort-${id ?? "new"}`}>Sort order</label>
          <input
            id={`g-sort-${id ?? "new"}`}
            name="sortOrder"
            inputMode="numeric"
            defaultValue={grade?.sortOrder ?? 0}
            className="field"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`g-min-${id ?? "new"}`}>Size min (mm)</label>
          <input
            id={`g-min-${id ?? "new"}`}
            name="sizeMinMm"
            inputMode="numeric"
            defaultValue={grade?.sizeMinMm ?? ""}
            className="field"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`g-max-${id ?? "new"}`}>Size max (mm)</label>
          <input
            id={`g-max-${id ?? "new"}`}
            name="sizeMaxMm"
            inputMode="numeric"
            defaultValue={grade?.sizeMaxMm ?? ""}
            className="field"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`g-image-${id ?? "new"}`}>Image URL</label>
          <input
            id={`g-image-${id ?? "new"}`}
            name="image"
            defaultValue={grade?.image ?? ""}
            placeholder="/brand/grades/6-suta.svg"
            className="field"
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={`g-summary-${id ?? "new"}`}>Card summary</label>
        <input
          id={`g-summary-${id ?? "new"}`}
          name="summary"
          defaultValue={grade?.summary ?? ""}
          className="field"
        />
      </div>
      <div>
        <label className="field-label" htmlFor={`g-desc-${id ?? "new"}`}>Description</label>
        <textarea
          id={`g-desc-${id ?? "new"}`}
          name="description"
          rows={3}
          defaultValue={grade?.description ?? ""}
          className="field"
        />
      </div>

      <label className="flex items-center gap-2 text-[13px] text-ink-800">
        <input type="checkbox" name="published" defaultChecked={grade?.published ?? true} />
        Published on the storefront
      </label>

      {state.error && (
        <p role="alert" className="text-[12.5px] leading-relaxed text-danger-600">{state.error}</p>
      )}
      {state.ok && (
        <p role="status" className="text-[12.5px] font-medium text-emerald-700">Grade saved.</p>
      )}

      <button type="submit" disabled={pending} className="btn-primary btn-sm">
        {pending ? "Saving…" : id ? "Save Grade" : "Create Grade"}
      </button>
    </form>
  );
}
