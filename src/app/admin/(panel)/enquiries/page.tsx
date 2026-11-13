import type { Metadata } from "next";
import Link from "next/link";
import { listAllGradesAdmin, listEnquiries } from "@/lib/admin-data";
import { formatDateTime } from "@/lib/utils";
import { EnquiryStatusBadge } from "@/components/admin/status-badge";
import { enquiryStatuses } from "@/db/schema";

export const metadata: Metadata = { title: "Bulk Enquiries" };

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = enquiryStatuses.includes(params.status as never) ? params.status : undefined;

  const [enquiries, grades] = await Promise.all([listEnquiries(status), listAllGradesAdmin()]);
  const gradeNames = new Map(grades.map((g) => [g.slug, g.name]));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Wholesale</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900">Bulk Enquiries</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"} shown. These are separate
            from retail orders.
          </p>
        </div>
        <Link href="/admin" className="btn-outline btn-sm">Dashboard</Link>
      </header>

      <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
        <Link
          href="/admin/enquiries"
          className={`border px-3.5 py-1.5 text-[12px] font-medium ${
            !status
              ? "border-forest-800 bg-forest-800 text-ivory-100"
              : "border-beige-300 bg-white text-ink-700 hover:border-forest-600"
          }`}
        >
          All
        </Link>
        {enquiryStatuses.map((s) => (
          <Link
            key={s}
            href={`/admin/enquiries?status=${s}`}
            className={`border px-3.5 py-1.5 text-[12px] font-medium capitalize ${
              status === s
                ? "border-forest-800 bg-forest-800 text-ivory-100"
                : "border-beige-300 bg-white text-ink-700 hover:border-forest-600"
            }`}
          >
            {s}
          </Link>
        ))}
      </nav>

      <div className="border border-beige-200 bg-white">
        {enquiries.length === 0 ? (
          <p className="px-5 py-10 text-center text-[13.5px] text-ink-500">
            No bulk enquiries match this filter.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-beige-200 text-[10.5px] uppercase tracking-wider text-ink-500">
                  <th className="px-5 py-3 font-semibold">Reference</th>
                  <th className="px-3 py-3 font-semibold">Business</th>
                  <th className="px-3 py-3 font-semibold">Grades</th>
                  <th className="px-3 py-3 text-right font-semibold">Quantity</th>
                  <th className="px-3 py-3 font-semibold">Delivery</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200">
                {enquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-ivory-50">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/enquiries/${e.id}`}
                        className="font-medium text-forest-800 hover:text-gold-700"
                      >
                        {e.reference}
                      </Link>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="block text-ink-800">{e.businessName}</span>
                      <span className="text-[11.5px] text-ink-500">{e.contactPerson} · {e.mobile}</span>
                    </td>
                    <td className="px-3 py-3.5 text-[12px] text-ink-600">
                      {e.grades.map((g) => gradeNames.get(g) ?? g).join(", ")}
                    </td>
                    <td className="px-3 py-3.5 text-right text-ink-800">
                      {e.quantityKg.toLocaleString("en-IN")} kg
                    </td>
                    <td className="px-3 py-3.5 text-[12.5px] text-ink-600">
                      {e.deliveryCity}
                      <span className="block text-[11.5px] text-ink-400">{e.deliveryState}</span>
                    </td>
                    <td className="px-3 py-3.5"><EnquiryStatusBadge status={e.status} /></td>
                    <td className="px-5 py-3.5 text-[12px] text-ink-500">
                      {formatDateTime(e.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
