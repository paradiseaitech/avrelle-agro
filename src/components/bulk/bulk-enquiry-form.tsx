"use client";

import { useMemo, useState } from "react";
import { submitBulkEnquiry } from "@/lib/actions/enquiries";
import { BUYER_TYPES, PACKAGING_PREFERENCES } from "@/lib/validation";
import { BULK_QUOTATION_DETAILS, OFFICIAL_BULK_RATES } from "@/lib/bulk-rates";
import type { Grade } from "@/db/schema";
import { Calculator, Check, FileText } from "lucide-react";

type FieldErrors = Record<string, string>;

export function BulkEnquiryForm({
  grades,
  whatsapp,
  initialGrade,
}: {
  grades: Grade[];
  whatsapp: string;
  initialGrade?: string;
}) {
  const wa = useMemo(() => whatsapp.replace(/\D/g, ""), [whatsapp]);
  const [form, setForm] = useState({
    businessName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    buyerType: "",
    quantityKg: "80",
    packagingPreference: "white-pp-8kg",
    deliveryCity: "",
    deliveryState: "",
    requirements: "",
  });
  const [selectedGrades, setSelectedGrades] = useState<string[]>(
    initialGrade ? [initialGrade] : ["6-plus-hp"],
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [reference, setReference] = useState<string | null>(null);

  const set =
    (name: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [name]: e.target.value }));

  function toggleGrade(slug: string) {
    setSelectedGrades((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setFieldErrors({});
    setBusy(true);

    const result = await submitBulkEnquiry({
      businessName: form.businessName,
      contactPerson: form.contactPerson,
      mobile: form.mobile,
      email: form.email.trim() || undefined,
      buyerType: form.buyerType,
      grades: selectedGrades,
      quantityKg: Number(form.quantityKg),
      packagingPreference: form.packagingPreference,
      deliveryCity: form.deliveryCity,
      deliveryState: form.deliveryState,
      requirements: form.requirements.trim() || undefined,
    });

    if (result.ok) {
      setReference(result.reference);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setError(result.error);
    setBusy(false);
  }

  const qtyKg = Number(form.quantityKg) || 0;
  const bagCount = Math.max(1, Math.ceil(qtyKg / BULK_QUOTATION_DETAILS.bagWeightKg));
  const selectedRateItems = OFFICIAL_BULK_RATES.filter((r) => selectedGrades.includes(r.slug));
  const avgRate = selectedRateItems.length
    ? Math.round(selectedRateItems.reduce((acc, curr) => acc + curr.ratePerKg, 0) / selectedRateItems.length)
    : 0;
  const estimatedBase = qtyKg * avgRate;
  const estimatedGst = Math.round(estimatedBase * (BULK_QUOTATION_DETAILS.gstRatePercent / 100));
  const estimatedTotal = estimatedBase + estimatedGst;

  if (reference) {
    const itemNames = selectedGrades
      .map((s) => {
        const found = OFFICIAL_BULK_RATES.find((r) => r.slug === s);
        return found ? `${found.name} (₹${found.ratePerKg}/kg)` : s;
      })
      .join(", ");

    const waMessage = [
      `Hello AVRELLE AGRO, I have submitted a wholesale enquiry.`,
      `Reference: ${reference}`,
      `Business: ${form.businessName}`,
      `Grade/Item(s): ${itemNames}`,
      `Quantity: ${form.quantityKg} kg (~${bagCount} bags of 8 kg net)`,
      `Packaging: ${form.packagingPreference === "white-pp-8kg" ? "8 kg White PP Bag (100μ liner)" : form.packagingPreference}`,
      `Delivery: ${form.deliveryCity}, ${form.deliveryState}`,
    ].join("\n");

    return (
      <div
        className="mx-auto max-w-2xl border border-forest-800/25 bg-forest-50 p-8 text-center sm:p-10 rounded-xl"
        role="status"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success-100 text-success-700">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-4 font-serif text-[26px] text-forest-900">Enquiry Received</h2>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
          Thank you. Our wholesale sales team will review your requirement against Quotation Ref:{" "}
          <strong>{BULK_QUOTATION_DETAILS.quotationNo}</strong> and respond promptly.
        </p>
        <p className="mt-5 inline-block border border-gold-500/50 bg-gold-100/60 px-5 py-2.5 rounded">
          <span className="block text-[10px] font-semibold uppercase tracking-luxe text-gold-700">
            Enquiry Reference
          </span>
          <span className="mt-1 block font-serif text-[22px] tracking-[0.12em] text-forest-900 font-bold">
            {reference}
          </span>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${wa}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Send Details on WhatsApp
          </a>
          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setReference(null);
              setForm({
                businessName: "",
                contactPerson: "",
                mobile: "",
                email: "",
                buyerType: "",
                quantityKg: "80",
                packagingPreference: "white-pp-8kg",
                deliveryCity: "",
                deliveryState: "",
                requirements: "",
              });
              setSelectedGrades(["6-plus-hp"]);
            }}
          >
            Submit Another Enquiry
          </button>
        </div>
        <p className="mt-4 text-[12.5px] text-ink-500">
          Keep this reference for follow-up. You can also contact us directly at {BULK_QUOTATION_DETAILS.phone} or {BULK_QUOTATION_DETAILS.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <fieldset>
        <legend className="font-serif text-[21px] text-forest-900">Business Details</legend>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="be-biz" className="field-label">Business name *</label>
            <input id="be-biz" required autoComplete="organization" placeholder="e.g. Shyam Traders Pvt Ltd" className="field" value={form.businessName} onChange={set("businessName")} />
          </div>
          <div>
            <label htmlFor="be-person" className="field-label">Contact person *</label>
            <input id="be-person" required autoComplete="name" placeholder="Full name" className="field" value={form.contactPerson} onChange={set("contactPerson")} />
          </div>
          <div>
            <label htmlFor="be-mobile" className="field-label">Mobile number *</label>
            <input id="be-mobile" required inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" className="field" value={form.mobile} onChange={set("mobile")} />
          </div>
          <div>
            <label htmlFor="be-email" className="field-label">Email address (optional)</label>
            <input id="be-email" type="email" autoComplete="email" placeholder="For written quotation" className="field" value={form.email} onChange={set("email")} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="be-buyer" className="field-label">Buyer category *</label>
            <select id="be-buyer" required className="field" value={form.buyerType} onChange={set("buyerType")}>
              <option value="">Select buyer type</option>
              {BUYER_TYPES.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-serif text-[21px] text-forest-900">Wholesale Product &amp; Volume Selection</legend>
        <p className="mt-2 text-[13.5px] text-ink-600">
          Select one or more items from our official Rate Card *
        </p>

        {/* 8 Official Rate items from Rate.jpeg */}
        <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2" role="group" aria-label="Wholesale items required">
          {OFFICIAL_BULK_RATES.map((item) => {
            const selected = selectedGrades.includes(item.slug);
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => toggleGrade(item.slug)}
                aria-pressed={selected}
                className={`flex items-center justify-between rounded-lg border p-3 text-left transition-all ${
                  selected
                    ? "border-forest-800 bg-forest-900 text-ivory-100 shadow-sm ring-1 ring-gold-400"
                    : "border-beige-300 bg-white text-ink-800 hover:border-gold-500 hover:bg-gold-50/40"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-[14px] font-bold">
                      {item.sNo}. {item.name}
                    </span>
                  </div>
                  <p className={`text-[11.5px] line-clamp-1 ${selected ? "text-ivory-100/80" : "text-ink-500"}`}>
                    {item.composition}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className={`block font-serif text-[15px] font-bold ${selected ? "text-gold-300" : "text-forest-900"}`}>
                    ₹{item.ratePerKg}/kg
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider ${selected ? "text-gold-400" : "text-ink-400"}`}>
                    {selected ? "Selected ✓" : "Click to select"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {fieldErrors.grades && <p className="mt-1.5 text-[12px] text-danger-600">{fieldErrors.grades}</p>}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="be-qty" className="field-label">Quantity required (in kg) *</label>
            <div className="relative">
              <input
                id="be-qty"
                required
                inputMode="numeric"
                placeholder="e.g. 80, 500, 1000"
                className="field pr-12 font-medium text-forest-950"
                value={form.quantityKg}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quantityKg: e.target.value.replace(/\D/g, "").slice(0, 6) }))
                }
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12.5px] font-semibold text-ink-500">
                kg
              </span>
            </div>
            <p className="mt-1 text-[11.5px] text-ink-500">
              Equivalent to: <strong className="text-forest-900">~{bagCount} bags</strong> ({BULK_QUOTATION_DETAILS.bagWeightKg} kg net each)
            </p>
          </div>

          <div>
            <label htmlFor="be-pack" className="field-label">Packaging preference *</label>
            <select id="be-pack" required className="field" value={form.packagingPreference} onChange={set("packagingPreference")}>
              {PACKAGING_PREFERENCES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="be-city" className="field-label">Destination city *</label>
            <input id="be-city" required autoComplete="address-level2" placeholder="e.g. Delhi, Mumbai, Patna" className="field" value={form.deliveryCity} onChange={set("deliveryCity")} />
          </div>

          <div>
            <label htmlFor="be-state" className="field-label">Destination state *</label>
            <input id="be-state" required autoComplete="address-level1" placeholder="e.g. Delhi, Maharashtra, Bihar" className="field" value={form.deliveryState} onChange={set("deliveryState")} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="be-req" className="field-label">Additional notes or custom terms</label>
            <textarea id="be-req" rows={3} className="field" placeholder="Target delivery date, payment terms, or custom packaging specifications…" value={form.requirements} onChange={set("requirements")} />
          </div>
        </div>

        {/* Live Wholesale Cost & Packaging Estimator */}
        {qtyKg > 0 && selectedRateItems.length > 0 && (
          <div className="mt-6 rounded-xl border border-gold-500/40 bg-gold-50/50 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-forest-900">
              <Calculator className="h-4 w-4 text-gold-700" />
              <h4 className="font-serif text-[15px] font-bold text-forest-950">
                Live Wholesale Estimate (Indicative based on Rate Card)
              </h4>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gold-500/20 pt-3 text-[13px] sm:grid-cols-4">
              <div>
                <span className="text-[11px] text-ink-500 uppercase tracking-wider block">Quantity</span>
                <span className="font-bold text-forest-950">{qtyKg} kg</span>
                <span className="block text-[11px] text-ink-500">({bagCount} × 8kg Bags)</span>
              </div>
              <div>
                <span className="text-[11px] text-ink-500 uppercase tracking-wider block">Rate Range</span>
                <span className="font-bold text-forest-950">~₹{avgRate}/kg</span>
                <span className="block text-[11px] text-ink-500">avg selected</span>
              </div>
              <div>
                <span className="text-[11px] text-ink-500 uppercase tracking-wider block">GST (5%)</span>
                <span className="font-bold text-forest-950">₹{estimatedGst.toLocaleString("en-IN")}</span>
                <span className="block text-[11px] text-ink-500">as applicable</span>
              </div>
              <div>
                <span className="text-[11px] text-ink-500 uppercase tracking-wider block">Est. Ex-Purnea</span>
                <span className="font-serif text-[17px] font-bold text-forest-900">₹{estimatedTotal.toLocaleString("en-IN")}</span>
                <span className="block text-[11px] text-ink-500">+ freight at actuals</span>
              </div>
            </div>
            <p className="mt-2.5 text-[11px] italic text-ink-500">
              * Official quotation with final commercial invoice will be confirmed in writing. 100% advance payment prior to dispatch.
            </p>
          </div>
        )}
      </fieldset>

      {error && (
        <p role="alert" className="border border-danger-600/30 bg-danger-100 p-4 text-[13.5px] leading-relaxed text-danger-600 rounded">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy} className="btn-primary">
          {busy ? "Submitting Quotation Request…" : "Submit Wholesale Quotation Request"}
        </button>
        <p className="max-w-md text-[12.5px] leading-relaxed text-ink-500">
          Submitting this enquiry generates an official reference number and dispatches your requirement directly to our wholesale sales desk in Purnea.
        </p>
      </div>
    </form>
  );
}

