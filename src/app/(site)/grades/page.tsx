import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedGrades } from "@/lib/db-data";
import { GradeComparison } from "@/components/home/grade-comparison";

export const metadata: Metadata = {
  title: "Makhana Grades — Understanding the Suta Grading System",
  description:
    "Understand makhana (fox nut) grades: 3 Suta, 4 Suta, 5 Suta, 6+ Suta and Thurr(i), with indicative size ranges and typical uses from AVRELLE AGRO, Purnea, Bihar.",
};

export default async function GradesPage() {
  const grades = await listPublishedGrades();

  return (
    <>
      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">Makhana Grades</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-serif text-[34px] text-forest-900 sm:text-[44px]">
            Makhana Grades Explained
          </h1>
          <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-ink-600">
            Makhana (fox nuts) are graded by size using the traditional suta scale, where one suta
            is roughly one-eighth of an inch. Grading matters: size affects presentation, roasting
            behaviour, and price. Below is how each grade compares and what it is typically used for.
          </p>
        </div>
      </div>

      <GradeComparison grades={grades} />

      <section className="border-t border-beige-200 bg-ivory-100" aria-labelledby="grade-detail-heading">
        <div className="section-shell py-14 sm:py-16">
          <h2 id="grade-detail-heading" className="font-serif text-[28px] text-forest-900">
            Grade by grade
          </h2>
          <div className="mt-8 space-y-6">
            {grades.map((g) => (
              <article
                key={g.id}
                id={g.slug}
                className="card-luxe grid gap-6 p-6 sm:grid-cols-[160px_1fr] sm:p-8"
              >
                <div className="flex items-center justify-center">
                  <img
                    src={g.image ?? "/brand/logo-mark.svg"}
                    alt={`${g.name} makhana`}
                    loading="lazy"
                    className="h-32 w-32 object-contain sm:h-36 sm:w-36"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-serif text-[22px] text-forest-900">
                      <Link href={`/grades/${g.slug}`} className="hover:text-gold-700">
                        {g.name}
                      </Link>
                    </h3>
                    {g.sizeMinMm != null && g.sizeMaxMm != null && (
                      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-700">
                        Indicative ~{g.sizeMinMm}–{g.sizeMaxMm} mm
                      </p>
                    )}
                  </div>
                  {g.description && (
                    <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-ink-700">
                      {g.description}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {g.slug !== "thurr" ? (
                      <Link href={`/shop?grade=${g.slug}`} className="btn-outline btn-sm">
                        Shop {g.name}
                      </Link>
                    ) : (
                      <Link href="/bulk-orders" className="btn-outline btn-sm">
                        Enquire about Thurr(i)
                      </Link>
                    )}
                    <Link href="/contact" className="btn-outline-gold btn-sm">
                      Ask a Question
                    </Link>
                    <Link href={`/grades/${g.slug}`} className="btn-outline-gold btn-sm">
                      Grade Guide
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[12.5px] leading-relaxed text-ink-500">
            Note: size ranges above are indicative reference values from supplied grading material.
            Actual dimensions may vary between batches; contact us for current stock specifications.
            Thurr(i) retail availability is confirmed on enquiry.
          </p>
        </div>
      </section>
    </>
  );
}
