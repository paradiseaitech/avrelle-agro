"use client";

import { useState } from "react";
import { BULK_QUOTATION_DETAILS, OFFICIAL_BULK_RATES, type BulkRateItem } from "@/lib/bulk-rates";
import { Download, ExternalLink, FileText, CheckCircle2, ShieldCheck, Truck, Package, Clock, X } from "lucide-react";

export function BulkRateCard({
  onSelectGrade,
}: {
  onSelectGrade?: (slug: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/40 bg-white p-6 shadow-xl sm:p-8">
        {/* Decorative corner ornaments */}
        <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-gold-500/50" />
        <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-gold-500/50" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-gold-500/50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-gold-500/50" />

        {/* Header */}
        <div className="border-b border-beige-200 pb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-800">
            <FileText className="h-3.5 w-3.5 text-gold-600" />
            Official Wholesale Rate Quotation
          </div>
          <h2 className="mt-3 font-serif text-[26px] font-bold text-forest-950 sm:text-[32px]">
            {BULK_QUOTATION_DETAILS.subject}
          </h2>
          <p className="mt-1 text-[13px] text-ink-500">
            Quotation Ref: <strong className="font-mono text-forest-900">{BULK_QUOTATION_DETAILS.quotationNo}</strong> · Date: {BULK_QUOTATION_DETAILS.date}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn-outline-gold btn-sm inline-flex items-center gap-1.5"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Original Letterhead
            </button>
            <a
              href="/Rate.jpeg"
              download="AVRELLE_AGRO_Makhana_Bulk_Rate_Quotation.jpeg"
              className="btn-primary btn-sm inline-flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Download Quotation (JPEG)
            </a>
          </div>
        </div>

        {/* Rate Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-gold-500/40 bg-forest-900 text-[12px] font-semibold uppercase tracking-wider text-ivory-100">
                <th className="py-3 px-3.5 text-center w-14">S.No.</th>
                <th className="py-3 px-4">Item / Product Description</th>
                <th className="py-3 px-4 text-right">Wholesale Rate (INR)</th>
                <th className="py-3 px-3.5 text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-200 text-[13.5px]">
              {OFFICIAL_BULK_RATES.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <tr
                    key={item.slug}
                    className={`transition-colors hover:bg-gold-50/50 ${
                      item.highlight ? "bg-gold-100/30" : isEven ? "bg-white" : "bg-ivory-50/60"
                    }`}
                  >
                    <td className="py-3 px-3.5 text-center font-medium text-ink-500">
                      {item.sNo}.
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-[15.5px] font-semibold text-forest-950">
                          {item.name}
                        </span>
                        {item.highlight && (
                          <span className="rounded bg-gold-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-900">
                            Top Grade
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-ink-500">{item.composition}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-serif text-[18px] font-bold text-forest-900">
                        ₹{item.ratePerKg.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11.5px] text-ink-500"> / kg</span>
                    </td>
                    <td className="py-3 px-3.5 text-center">
                      <a
                        href="#enquiry-form"
                        onClick={() => onSelectGrade?.(item.slug)}
                        className="inline-flex items-center rounded border border-forest-800/30 bg-forest-50 px-2.5 py-1 text-[11px] font-medium text-forest-900 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-forest-950"
                      >
                        Enquire
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Commercial Terms Grid */}
        <div className="mt-8 rounded-xl border border-gold-500/30 bg-ivory-50 p-5">
          <h3 className="font-serif text-[16px] font-bold text-forest-950">
            Packing &amp; Commercial Terms (As Per Quotation)
          </h3>
          <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 text-[13px] text-ink-700">
            <div className="flex items-start gap-2.5">
              <Package className="h-4 w-4 shrink-0 text-gold-600 mt-0.5" />
              <div>
                <strong className="text-forest-900">Standard Packaging:</strong>
                <p className="text-[12px] text-ink-600">
                  White PP bag with 100 micron plastic inner liner — <strong>8 kg net</strong>, hygienically packed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-gold-600 mt-0.5" />
              <div>
                <strong className="text-forest-900">GST:</strong>
                <p className="text-[12px] text-ink-600">5% extra as applicable (GSTIN: {BULK_QUOTATION_DETAILS.gstin}).</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-600 mt-0.5" />
              <div>
                <strong className="text-forest-900">Payment Terms:</strong>
                <p className="text-[12px] text-ink-600">100% advance payment prior to dispatch.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-gold-600 mt-0.5" />
              <div>
                <strong className="text-forest-900">Dispatch &amp; Delivery:</strong>
                <p className="text-[12px] text-ink-600">7–10 business days from confirmed order &amp; payment.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Truck className="h-4 w-4 shrink-0 text-gold-600 mt-0.5" />
              <div>
                <strong className="text-forest-900">Transport:</strong>
                <p className="text-[12px] text-ink-600">Ex-Purnea, Bihar; freight and logistics to be borne by buyer.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <FileText className="h-4 w-4 shrink-0 text-gold-600 mt-0.5" />
              <div>
                <strong className="text-forest-900">Validity:</strong>
                <p className="text-[12px] text-ink-600">15 days from date of quotation issue ({BULK_QUOTATION_DETAILS.date}).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Authorized Signatory Footnote */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-beige-200 pt-3 text-[11.5px] text-ink-500">
          <p>
            Authorized Signatory: <strong>{BULK_QUOTATION_DETAILS.signatory}</strong> · {BULK_QUOTATION_DETAILS.companyName}
          </p>
          <p>
            Purnea, Bihar · Phone: <a href="tel:+917979782185" className="text-forest-800 underline">{BULK_QUOTATION_DETAILS.phone}</a>
          </p>
        </div>
      </div>

      {/* Modal to view Rate.jpeg letterhead */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/80 p-4 backdrop-blur-xs"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-beige-200 pb-2 mb-3">
              <h3 className="font-serif text-[18px] text-forest-900">
                Official Letterhead Quotation
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded p-1 text-ink-500 hover:bg-beige-100 hover:text-ink-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <img
              src="/Rate.jpeg"
              alt="Official AVRELLE AGRO Rate Quotation Letterhead"
              className="w-full rounded border border-beige-200 object-contain shadow-sm"
            />
            <div className="mt-3 flex justify-end gap-2">
              <a
                href="/Rate.jpeg"
                download="AVRELLE_AGRO_Makhana_Bulk_Rate_Quotation.jpeg"
                className="btn-primary btn-sm flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Download Original
              </a>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn-outline btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
