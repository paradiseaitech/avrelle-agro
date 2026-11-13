import type { Metadata } from "next";
import Link from "next/link";
import { listAllGradesAdmin } from "@/lib/admin-data";
import { GradeForm } from "@/components/admin/grade-form";
import { DeleteGradeForm } from "@/components/admin/danger-forms";

export const metadata: Metadata = { title: "Grades" };

export default async function AdminGradesPage() {
  const grades = await listAllGradesAdmin();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Catalogue</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900">Makhana Grades</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Size ranges are indicative reference values. Keep them consistent with the published
            grade pages.
          </p>
        </div>
        <Link href="/admin" className="btn-outline btn-sm">Dashboard</Link>
      </header>

      <div className="space-y-4">
        {grades.map((g) => (
          <details key={g.id} className="group border border-beige-200 bg-white">
            <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-5 py-4">
              <span className="flex items-center gap-3">
                <img
                  src={g.image ?? "/brand/logo-mark.svg"}
                  alt=""
                  className="h-10 w-10 object-contain"
                />
                <span>
                  <span className="block font-serif text-[17px] text-forest-900">{g.name}</span>
                  <span className="text-[11.5px] text-ink-500">
                    /{g.slug}
                    {g.sizeMinMm !== null && g.sizeMaxMm !== null
                      ? ` · ~${g.sizeMinMm}–${g.sizeMaxMm} mm`
                      : ""}
                    {" · "}
                    sort {g.sortOrder}
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-3">
                <span
                  className={`border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    g.published
                      ? "border-emerald-600/30 bg-emerald-50 text-emerald-800"
                      : "border-ink-400/30 bg-ivory-100 text-ink-600"
                  }`}
                >
                  {g.published ? "Published" : "Hidden"}
                </span>
                <span className="text-[11.5px] font-medium text-forest-700 group-open:hidden">Edit</span>
                <span className="hidden text-[11.5px] font-medium text-forest-700 group-open:inline">Close</span>
              </span>
            </summary>
            <div className="border-t border-beige-200 px-5 py-5">
              <GradeForm
                grade={{
                  id: g.id,
                  slug: g.slug,
                  name: g.name,
                  sizeMinMm: g.sizeMinMm,
                  sizeMaxMm: g.sizeMaxMm,
                  summary: g.summary,
                  description: g.description,
                  image: g.image,
                  sortOrder: g.sortOrder,
                  published: g.published,
                }}
              />
              <div className="mt-4 border-t border-beige-200 pt-3">
                <DeleteGradeForm id={g.id} name={g.name} />
              </div>
            </div>
          </details>
        ))}
      </div>

      <section className="border border-beige-200 bg-white p-5 sm:p-6">
        <h2 className="font-serif text-[21px] text-forest-900">Add a grade</h2>
        <p className="mt-1 mb-5 text-[12.5px] text-ink-500">
          New grades appear on the storefront once published and ordered by sort order.
        </p>
        <GradeForm />
      </section>
    </div>
  );
}
