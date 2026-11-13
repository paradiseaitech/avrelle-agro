import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnquiry, listAllGradesAdmin } from "@/lib/admin-data";
import { BUYER_TYPES, PACKAGING_PREFERENCES } from "@/lib/validation";
import { formatDateTime } from "@/lib/utils";
import { EnquiryStatusBadge } from "@/components/admin/status-badge";
import { EnquiryManageForm } from "@/components/admin/enquiry-manage-form";

export const metadata: Metadata = { title: "Enquiry Detail" };

export default async function AdminEnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [enquiry, grades] = await Promise.all([getEnquiry(id), listAllGradesAdmin()]);
  if (!enquiry) notFound();

  const gradeNames = new Map(grades.map((g) => [g.slug, g.name]));
  const buyerLabel = BUYER_TYPES.find((b) => b.value === enquiry.buyerType)?.label ?? enquiry.buyerType;
  const packagingLabel =
    PACKAGING_PREFERENCES.find((p) => p.value === enquiry.packagingPreference)?.label ??
    enquiry.packagingPreference ??
    "Not specified";

  const waNumber = enquiry.mobile.replace(/\D/g, "");
  const waMessage = encodeURIComponent(
    `Hello ${enquiry.contactPerson}, this is AVRELLE AGRO regarding your bulk enquiry ${enquiry.reference} for ${enquiry.quantityKg} kg of ${enquiry.grades
      .map((g) => gradeNames.get(g) ?? g)
      .join(", ")}.`,
  );

  const rows: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Business", value: enquiry.businessName },
    { label: "Contact person", value: enquiry.contactPerson },
    {
      label: "Mobile",
      value: (
        <a href={`tel:${waNumber}`} className="text-forest-800 hover:text-gold-700">
          {enquiry.mobile}
        </a>
      ),
    },
    {
      label: "Email",
      value: enquiry.email ? (
        <a href={`mailto:${enquiry.email}`} className="break-all text-forest-800 hover:text-gold-700">
          {enquiry.email}
        </a>
      ) : (
        "Not provided"
      ),
    },
    { label: "Buyer type", value: buyerLabel },
    {
      label: "Grades required",
      value: enquiry.grades.map((g) => gradeNames.get(g) ?? g).join(", ") || "Not specified",
    },
    { label: "Quantity", value: `${enquiry.quantityKg.toLocaleString("en-IN")} kg` },
    { label: "Packaging", value: packagingLabel },
    { label: "Delivery location", value: `${enquiry.deliveryCity}, ${enquiry.deliveryState}` },
    { label: "Received", value: formatDateTime(enquiry.createdAt) },
  ];

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/admin" className="hover:text-forest-700">Dashboard</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/admin/enquiries" className="hover:text-forest-700">Bulk Enquiries</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-forest-800">{enquiry.reference}</li>
        </ol>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow">Bulk enquiry</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900">{enquiry.reference}</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            {enquiry.businessName} · received {formatDateTime(enquiry.createdAt)}
          </p>
        </div>
        <EnquiryStatusBadge status={enquiry.status} />
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <div className="space-y-6">
          <section className="border border-beige-200 bg-white">
            <h2 className="border-b border-beige-200 px-5 py-4 font-serif text-[19px] text-forest-900">
              Enquiry details
            </h2>
            <dl className="divide-y divide-beige-200">
              {rows.map((row) => (
                <div key={row.label} className="grid gap-1 px-5 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">
                    {row.label}
                  </dt>
                  <dd className="text-[13.5px] text-ink-800">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="border border-beige-200 bg-white p-5">
            <h2 className="font-serif text-[19px] text-forest-900">Requirements</h2>
            <p className="mt-3 whitespace-pre-line text-[13.5px] leading-relaxed text-ink-700">
              {enquiry.requirements || "No additional requirements were provided."}
            </p>
          </section>

          <section className="border border-beige-200 bg-white p-5">
            <h2 className="font-serif text-[19px] text-forest-900">Respond</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
              Quotation rates must be prepared separately — never reuse retail catalogue prices for
              wholesale.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {waNumber.length >= 10 && (
                <a
                  href={`https://wa.me/${waNumber.length === 10 ? `91${waNumber}` : waNumber}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-sm"
                >
                  WhatsApp Customer
                </a>
              )}
              {enquiry.email && (
                <a
                  href={`mailto:${enquiry.email}?subject=${encodeURIComponent(
                    `Quotation for bulk makhana enquiry ${enquiry.reference}`,
                  )}`}
                  className="btn-outline btn-sm"
                >
                  Email Customer
                </a>
              )}
              <a href={`tel:${waNumber}`} className="btn-outline btn-sm">
                Call
              </a>
            </div>
          </section>
        </div>

        <section className="border border-beige-200 bg-white p-5">
          <h2 className="mb-4 font-serif text-[19px] text-forest-900">Manage</h2>
          <EnquiryManageForm
            id={enquiry.id}
            status={enquiry.status}
            adminNotes={enquiry.adminNotes}
          />
        </section>
      </div>
    </div>
  );
}
