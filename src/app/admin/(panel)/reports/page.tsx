import type { Metadata } from "next";
import { Download, FileSpreadsheet, Calendar, ShieldCheck, Info } from "lucide-react";

export const metadata: Metadata = { title: "Business Reports & Exports — AVRELLE Administration" };

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-eyebrow">Financial &amp; Operational Exports</p>
        <h1 className="mt-1 font-serif text-[30px] text-forest-900 sm:text-[34px]">
          Business Reports &amp; Exports
        </h1>
        <p className="mt-1 text-[13px] text-ink-500">
          Generate audit-ready CSV exports for orders, sales reconciliation, warehouse inventory, and the product catalogue.
        </p>
      </header>

      {/* Security note on formula injection protection */}
      <div className="rounded border border-forest-800/20 bg-forest-50/40 p-4 text-[13px] text-forest-950 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-forest-800 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-forest-900">Spreadsheet Security &amp; Formula Injection Protection</p>
          <p className="mt-0.5 text-ink-600">
            All exports are sanitised against CSV Formula Injection. Sensitive credentials, passwords, and session tokens are strictly excluded from report datasets.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Orders Report Card */}
        <div className="rounded border border-beige-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileSpreadsheet className="h-5 w-5 text-gold-600" />
              <h2 className="font-serif text-[20px] text-forest-900">Orders Report</h2>
            </div>
            <p className="text-[13px] leading-relaxed text-ink-600 mb-4">
              Comprehensive line-item order register including public reference, order date, customer contact details, delivery address, ordered items, pricing, discounts, shipping, and fulfilment milestones.
            </p>

            <form action="/api/admin/reports" method="GET" className="space-y-3 pt-2">
              <input type="hidden" name="type" value="orders" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label text-[11.5px]">From Date</label>
                  <input type="date" name="from" className="field text-[12px]" />
                </div>
                <div>
                  <label className="field-label text-[11.5px]">To Date</label>
                  <input type="date" name="to" className="field text-[12px]" />
                </div>
              </div>

              <div>
                <label className="field-label text-[11.5px]">Fulfilment Status</label>
                <select name="status" className="field text-[12px]">
                  <option value="">All Statuses</option>
                  <option value="pending">Pending Confirmation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="packed">Packed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary w-full mt-2 flex items-center justify-center gap-2 text-[13px]"
              >
                <Download className="h-4 w-4" /> Download Orders CSV
              </button>
            </form>
          </div>
        </div>

        {/* Sales Report Card */}
        <div className="rounded border border-beige-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileSpreadsheet className="h-5 w-5 text-gold-600" />
              <h2 className="font-serif text-[20px] text-forest-900">Sales Summary Report</h2>
            </div>
            <p className="text-[13px] leading-relaxed text-ink-600 mb-4">
              Financial reconciliation sheet distinguishing gross order value, delivered order value, verified collected COD revenue, outstanding transit COD, and shipping charge totals.
            </p>

            <form action="/api/admin/reports" method="GET" className="space-y-3 pt-2">
              <input type="hidden" name="type" value="sales" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label text-[11.5px]">From Date</label>
                  <input type="date" name="from" className="field text-[12px]" />
                </div>
                <div>
                  <label className="field-label text-[11.5px]">To Date</label>
                  <input type="date" name="to" className="field text-[12px]" />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full mt-8 flex items-center justify-center gap-2 text-[13px]"
              >
                <Download className="h-4 w-4" /> Download Sales Summary CSV
              </button>
            </form>
          </div>
        </div>

        {/* Inventory Report Card */}
        <div className="rounded border border-beige-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileSpreadsheet className="h-5 w-5 text-gold-600" />
              <h2 className="font-serif text-[20px] text-forest-900">Warehouse Inventory Report</h2>
            </div>
            <p className="text-[13px] leading-relaxed text-ink-600 mb-4">
              Real-time snapshot of current stock levels by product, makhana grade, and variant pack size (250g, 500g, 1kg), including low-stock thresholds and replenishment status flags.
            </p>

            <form action="/api/admin/reports" method="GET" className="pt-4">
              <input type="hidden" name="type" value="inventory" />
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 text-[13px]"
              >
                <Download className="h-4 w-4" /> Download Inventory CSV
              </button>
            </form>
          </div>
        </div>

        {/* Products Report Card */}
        <div className="rounded border border-beige-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileSpreadsheet className="h-5 w-5 text-gold-600" />
              <h2 className="font-serif text-[20px] text-forest-900">Product Catalogue Report</h2>
            </div>
            <p className="text-[13px] leading-relaxed text-ink-600 mb-4">
              Master product catalogue export including slugs, grades, retail publication status, featured flags, variant pricing ranges, total available quantities, and SEO metadata.
            </p>

            <form action="/api/admin/reports" method="GET" className="pt-4">
              <input type="hidden" name="type" value="products" />
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 text-[13px]"
              >
                <Download className="h-4 w-4" /> Download Products Catalogue CSV
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Accounting Methodology Note */}
      <div className="rounded border border-beige-200 bg-white p-5 text-[12.5px] leading-relaxed text-ink-600">
        <h3 className="font-serif text-[15px] font-bold text-forest-950 mb-1 flex items-center gap-1.5">
          <Info className="h-4 w-4 text-gold-600" /> Accounting &amp; Revenue Reconciliation Principles
        </h3>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Gross Order Value:</strong> Represents total booked retail value for all non-cancelled orders.</li>
          <li><strong>Collected Revenue:</strong> Authoritatively restricted to orders with status <em>PAID</em> (where cash has been confirmed as received from courier partners).</li>
          <li><strong>Outstanding COD:</strong> Uncollected cash for in-transit orders. This is never booked into collected revenue until delivery and cash handover are recorded.</li>
          <li><strong>Cancelled Orders:</strong> Fully excluded from sales revenue calculations. Reserved inventory is automatically restored.</li>
        </ul>
      </div>
    </div>
  );
}
