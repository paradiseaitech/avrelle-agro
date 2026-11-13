import Link from "next/link";
import type { Grade } from "@/db/schema";

const USE_BY_GRADE: Record<string, string> = {
  "6-suta": "Premium gifting, festive packs, premium retail shelves",
  "5-suta": "Premium everyday roasting, brand retail packs",
  "4-suta": "Makhana kheer, roasted snacks, general cooking",
  "3-suta": "Cooking, mithai, spiced snack mixes, economical use",
  thurr: "Flour, processing, speciality applications",
};

export function GradeComparison({ grades }: { grades: Grade[] }) {
  return (
    <section aria-labelledby="comparison-heading" className="bg-ivory-50">
      <div className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="text-eyebrow">Understanding Grades</p>
          <h2 id="comparison-heading" className="mt-3 font-serif text-[30px] text-forest-900 sm:text-[38px]">
            Find the Right Makhana Grade
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600">
            In the traditional suta scale, one suta is roughly one-eighth of an inch. Larger suta
            grades mean larger, rarer fox nuts. Explore the real photography and size scale below
            to find the ideal grade for your kitchen or retail shelf.
          </p>
        </div>

        {/* Consistent-scale visual comparison */}
        <ol className="mt-12 grid grid-cols-2 items-end gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {grades.map((g) => (
            <li
              key={g.id}
              id={g.slug === "thurr" ? "thurr" : undefined}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-32 w-32 items-end justify-center sm:h-36 sm:w-36">
                <img
                  src={g.image ?? "/brand/logo-mark.svg"}
                  alt={`${g.name} makhana shown at relative scale`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-4 font-serif text-[18px] text-forest-900">{g.name}</h3>
              {g.sizeMinMm != null && g.sizeMaxMm != null && (
                <p className="mt-1 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-gold-700">
                  ~{g.sizeMinMm}–{g.sizeMaxMm} mm
                </p>
              )}
              <p className="mt-2 max-w-[200px] text-[12.5px] leading-relaxed text-ink-600">
                {g.summary}
              </p>
            </li>
          ))}
        </ol>

        {/* Real photographic scale comparison chart */}
        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-gold-500/30 bg-white p-4 shadow-luxe sm:p-6">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-beige-200 pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-700">Visual Scale Guide</p>
              <h3 className="font-serif text-[18px] text-forest-900 sm:text-[20px]">Real Size Comparison</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-50 px-3 py-1 text-[11px] font-medium text-gold-800">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              1 Suta ≈ ⅛ inch (~3.175 mm)
            </span>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-beige-200 bg-ivory-50">
            <img
              src="/brand/grades/size.jpeg"
              alt="Makhana size comparison chart: 6+ Suta (19-24mm), 5 Suta (15.7-19mm), 4 Suta (12.5-15.5mm), 3 Suta (9-12.3mm)"
              width={738}
              height={476}
              loading="lazy"
              className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          <p className="mt-3 text-center text-[12.5px] text-ink-500">
            Nut size comparison photographed across standard commercial grades from 6+ Suta down to cooking grades.
          </p>
        </div>

        {/* Plain-language reference table */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden border border-beige-200">
          <table className="w-full border-collapse bg-white text-left text-[13.5px]">
            <caption className="sr-only">Makhana grades, indicative sizes and typical uses</caption>
            <thead>
              <tr className="bg-forest-800 text-ivory-100">
                <th scope="col" className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Grade</th>
                <th scope="col" className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Approx. size</th>
                <th scope="col" className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Typically used for</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={g.id} className={i % 2 ? "bg-ivory-100/60" : "bg-white"}>
                  <th scope="row" className="px-4 py-3 font-serif text-[15px] font-semibold text-forest-900">
                    {g.name}
                  </th>
                  <td className="px-4 py-3 text-ink-700">
                    {g.sizeMinMm != null && g.sizeMaxMm != null
                      ? `${g.sizeMinMm}–${g.sizeMaxMm} mm`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{USE_BY_GRADE[g.slug] ?? g.summary ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[12.5px] leading-relaxed text-ink-500">
          These size ranges are indicative reference values taken from supplied grading material.
          Actual dimensions can vary between batches; contact us for current stock specifications.
        </p>

        <div className="mt-8 text-center">
          <Link href="/grades" className="btn-outline">
            Explore Grades in Detail
          </Link>
        </div>
      </div>
    </section>
  );
}
