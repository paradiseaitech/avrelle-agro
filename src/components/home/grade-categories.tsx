import Link from "next/link";
import type { Grade } from "@/db/schema";

export function GradeCategories({ grades }: { grades: Grade[] }) {
  return (
    <section aria-labelledby="categories-heading" className="bg-ivory-50">
      <div className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="text-eyebrow">Our Grades</p>
          <h2 id="categories-heading" className="mt-3 font-serif text-[30px] text-forest-900 sm:text-[38px]">
            Shop by Makhana Grade
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600">
            Makhana is graded by size using the traditional suta scale. Larger grades are rarer and
            typically priced higher; smaller grades are valued for everyday cooking.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {grades.map((g) => (
            <Link
              key={g.id}
              href={g.slug === "thurr" ? "/grades#thurr" : `/shop?grade=${g.slug}`}
              className="group card-luxe flex flex-col items-center p-5 text-center transition-shadow hover:shadow-luxe sm:p-6"
            >
              <div className="flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
                <img
                  src={g.image ?? "/brand/logo-mark.svg"}
                  alt={`${g.name} makhana`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-serif text-[16px] text-forest-900">{g.name}</h3>
              {g.sizeMinMm != null && g.sizeMaxMm != null && (
                <p className="mt-1 text-[11.5px] font-medium uppercase tracking-wider text-gold-700">
                  ~{g.sizeMinMm}–{g.sizeMaxMm} mm
                </p>
              )}
              <p className="mt-2 text-[12.5px] leading-snug text-ink-500 line-clamp-3">{g.summary}</p>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-[12.5px] text-ink-500">
          Size ranges are indicative reference values from supplied grading material.{" "}
          <Link href="/grades" className="text-forest-700 underline decoration-gold-500 underline-offset-4 hover:text-gold-700">
            Understand the grading system
          </Link>
        </p>
      </div>
    </section>
  );
}
