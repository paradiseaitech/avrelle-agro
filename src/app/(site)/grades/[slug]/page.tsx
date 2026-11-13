import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getGradeBySlug,
  listPublishedGrades,
  listPublishedProducts,
} from "@/lib/db-data";
import { ProductCard } from "@/components/product/product-card";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grade = await getGradeBySlug(slug);
  if (!grade) return { title: "Grade not found" };
  return {
    title: `${grade.name} Makhana — Grade Guide`,
    description:
      grade.summary ??
      `Understand ${grade.name} makhana: indicative size range, characteristics, and buying options from AVRELLE AGRO, Purnea, Bihar.`,
  };
}

export default async function GradeDetailPage({ params }: Props) {
  const { slug } = await params;
  const grade = await getGradeBySlug(slug);
  if (!grade) notFound();

  const [grades, products] = await Promise.all([
    listPublishedGrades(),
    listPublishedProducts({ gradeSlug: grade.slug }),
  ]);

  const others = grades.filter((g) => g.id !== grade.id);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Makhana Grades", item: "/grades" },
      { "@type": "ListItem", position: 3, name: grade.name, item: `/grades/${grade.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="border-b border-beige-200 bg-ivory-100">
        <div className="section-shell py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/grades" className="hover:text-forest-700">Makhana Grades</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-forest-800">{grade.name}</li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-8 sm:grid-cols-[200px_1fr]">
            <div className="flex justify-center">
              <img
                src={grade.image ?? "/brand/logo-mark.svg"}
                alt={`${grade.name} makhana`}
                className="h-44 w-44 object-contain sm:h-48 sm:w-48"
              />
            </div>
            <div>
              <p className="text-eyebrow">Makhana grade</p>
              <h1 className="mt-2 font-serif text-[34px] leading-tight text-forest-900 sm:text-[44px]">
                {grade.name} Makhana
              </h1>
              {grade.sizeMinMm != null && grade.sizeMaxMm != null && (
                <p className="mt-3 inline-block border border-gold-500/40 bg-gold-100/50 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-gold-800">
                  Indicative size ~{grade.sizeMinMm}–{grade.sizeMaxMm} mm
                </p>
              )}
              {grade.summary && (
                <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-700">
                  {grade.summary}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                {grade.slug === "thurr" ? (
                  <Link href="/bulk-orders" className="btn-primary">
                    Enquire About {grade.name}
                  </Link>
                ) : (
                  <Link href="/shop" className="btn-primary">
                    Shop Retail Packs
                  </Link>
                )}
                <Link href="/grades" className="btn-outline">Compare All Grades</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-serif text-[26px] text-forest-900 sm:text-[30px]">
            About {grade.name}
          </h2>
          <span className="ornament-line mt-4 block" aria-hidden="true" />
          <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-ink-700">
            {grade.description ??
              `${grade.name} is one of the standard makhana grades. Contact us for current stock specifications and availability.`}
          </p>
          <p className="mt-4 text-[12.5px] leading-relaxed text-ink-500">
            Size ranges are indicative reference values. Actual dimensions vary between batches, and
            availability is confirmed at the time of order or quotation.
          </p>

          {/* Visual Size Scale Reference Card */}
          <div className="mt-8 rounded-xl border border-beige-300 bg-beige-50/60 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-beige-200 pb-2.5 mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-900">
                Where {grade.name} Fits in the Scale
              </span>
              <Link href="/grades" className="text-[11px] font-medium text-gold-700 hover:underline">
                Compare All Grades →
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg border border-beige-200 bg-white">
              <img
                src="/brand/grades/size.jpeg"
                alt="Makhana size comparison scale showing 6+ Suta, 5 Suta, 4 Suta, 3 Suta"
                width={738}
                height={476}
                loading="lazy"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="mt-2.5 text-[12px] text-ink-500">
              Photographic scale reference showing nut diameter across standard commercial suta grades.
            </p>
          </div>
        </div>

        <aside className="border border-beige-200 bg-white p-6">
          <h2 className="font-serif text-[19px] text-forest-900">At a glance</h2>
          <dl className="mt-4 space-y-3 text-[13.5px]">
            <div className="flex justify-between gap-4 border-b border-beige-200 pb-2">
              <dt className="text-ink-500">Grade</dt>
              <dd className="font-medium text-forest-900">{grade.name}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-beige-200 pb-2">
              <dt className="text-ink-500">Indicative size</dt>
              <dd className="font-medium text-forest-900">
                {grade.sizeMinMm != null && grade.sizeMaxMm != null
                  ? `${grade.sizeMinMm}–${grade.sizeMaxMm} mm`
                  : "On request"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-beige-200 pb-2">
              <dt className="text-ink-500">Retail packs</dt>
              <dd className="font-medium text-forest-900">
                {products.length > 0 ? `${products.length} product${products.length === 1 ? "" : "s"}` : "On enquiry"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-500">Bulk supply</dt>
              <dd className="font-medium text-forest-900">Available on quotation</dd>
            </div>
          </dl>
          <Link href="/bulk-orders" className="btn-outline btn-sm mt-5 w-full">
            Request Bulk Quotation
          </Link>
        </aside>
      </section>

      {products.length > 0 && (
        <section className="border-y border-beige-200 bg-ivory-50" aria-labelledby="grade-products">
          <div className="section-shell py-12 sm:py-14">
            <h2 id="grade-products" className="font-serif text-[26px] text-forest-900">
              {grade.name} in the shop
            </h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-shell py-12">
        <h2 className="text-eyebrow">Explore other grades</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {others.map((g) => (
            <Link
              key={g.id}
              href={`/grades/${g.slug}`}
              className="border border-beige-300 bg-white px-4 py-2 text-[13px] font-medium text-ink-800 transition-colors hover:border-forest-600"
            >
              {g.name}
              {g.sizeMinMm != null && g.sizeMaxMm != null && (
                <span className="ml-2 text-[11px] text-ink-500">
                  ~{g.sizeMinMm}–{g.sizeMaxMm} mm
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
