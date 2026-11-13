"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCartContext } from "@/components/cart/cart-context";
import { placeOrder } from "@/lib/actions/orders";
import type { ShippingSettings } from "@/lib/site";
import { formatINR } from "@/lib/utils";

interface PincodeStatus {
  serviceable: boolean;
  shippingPaise: number | null;
  estDaysMin: number | null;
  estDaysMax: number | null;
  codAvailable: boolean;
  message: string;
}

type FieldErrors = Partial<Record<string, string>>;

const STATE_OPTIONS = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

import type { CustomerIdentity } from "@/lib/customer-auth";
import type { CustomerAddress } from "@/db/schema";
import { Check, Plus } from "lucide-react";

export function CheckoutForm({
  shipping,
  customer,
  savedAddresses = [],
}: {
  shipping: ShippingSettings;
  customer?: CustomerIdentity;
  savedAddresses?: CustomerAddress[];
}) {
  const router = useRouter();
  const { items, subtotalPaise, clear, count } = useCartContext();

  const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
  const [selectedAddrId, setSelectedAddrId] = useState<string>(
    defaultAddr ? defaultAddr.id : "new",
  );

  // One idempotency key per checkout session — reused on retries so a
  // double-submit can never create two orders.
  const [idempotencyKey] = useState(() => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `idem-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  });

  const [form, setForm] = useState({
    customerName: defaultAddr?.name || customer?.name || "",
    phone: defaultAddr?.phone || customer?.phone || "",
    email: customer?.email || "",
    addressLine1: defaultAddr?.addressLine1 || "",
    addressLine2: defaultAddr?.addressLine2 || "",
    landmark: defaultAddr?.landmark || "",
    city: defaultAddr?.city || "",
    state: defaultAddr?.state || "",
    pincode: defaultAddr?.pincode || "",
    deliveryInstructions: "",
  });
  const [pinLookup, setPinLookup] = useState<(PincodeStatus & { pincode: string }) | null>(null);
  const [pinLookupFailedFor, setPinLookupFailedFor] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const onSelectSavedAddress = (addr: CustomerAddress) => {
    setSelectedAddrId(addr.id);
    setForm((f) => ({
      ...f,
      customerName: addr.name,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || "",
      landmark: addr.landmark || "",
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    }));
  };

  const set = (name: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [name]: e.target.value }));

  // PIN-code serviceability lookup. The result is tagged with the PIN it was
  // fetched for, so editing the field immediately invalidates stale results
  // without setting state synchronously inside the effect.
  const normalizedPin = form.pincode.trim();
  const pinFormatValid = /^[1-9]\d{5}$/.test(normalizedPin);
  const pinStatus = pinFormatValid && pinLookup?.pincode === normalizedPin ? pinLookup : null;
  const pinChecking = pinFormatValid && !pinStatus && pinLookupFailedFor !== normalizedPin;

  useEffect(() => {
    const pin = form.pincode.trim();
    if (!/^[1-9]\d{5}$/.test(pin)) return;
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/pincode?pincode=${pin}`, { signal: ctrl.signal });
        const data = (await res.json()) as PincodeStatus;
        if (!ctrl.signal.aborted) {
          setPinLookup({ ...data, pincode: pin });
          setPinLookupFailedFor(null);
        }
      } catch {
        /* aborted or network error — server re-validates at submit anyway */
        if (!ctrl.signal.aborted) setPinLookupFailedFor(pin);
      }
    }, 450);
    return () => {
      ctrl.abort();
      clearTimeout(t);
    };
  }, [form.pincode]);

  const shippingPaise = useMemo(() => {
    if (pinStatus?.serviceable && pinStatus.shippingPaise != null) return pinStatus.shippingPaise;
    return shipping.defaultPaise;
  }, [pinStatus, shipping.defaultPaise]);

  const freeShipping =
    shipping.freeShippingAbovePaise > 0 && subtotalPaise >= shipping.freeShippingAbovePaise;
  const effectiveShipping = freeShipping ? 0 : shippingPaise;
  const totalPaise = subtotalPaise + effectiveShipping + shipping.codFeePaise;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setFieldErrors({});
    setSubmitting(true);

    const result = await placeOrder({
      idempotencyKey,
      ...form,
      email: form.email.trim() || undefined,
      addressLine2: form.addressLine2.trim() || undefined,
      landmark: form.landmark.trim() || undefined,
      deliveryInstructions: form.deliveryInstructions.trim() || undefined,
      items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
    });

    if (result.ok) {
      clear();
      router.push(`/order-confirmation/${result.reference}`);
      return;
    }
    setError(result.error);
    setSubmitting(false);
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-xl border border-beige-200 bg-white px-6 py-16 text-center">
        <h2 className="font-serif text-[24px] text-forest-900">Nothing to check out</h2>
        <p className="mt-3 text-[14px] text-ink-600">Your cart is empty.</p>
        <button type="button" onClick={() => router.push("/shop")} className="btn-primary mt-6">
          Shop Makhana
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-10">
        {/* Contact */}
        <fieldset>
          <legend className="font-serif text-[21px] text-forest-900">Contact details</legend>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="co-name" className="field-label">Full name *</label>
              <input id="co-name" name="customerName" required autoComplete="name" className="field" value={form.customerName} onChange={set("customerName")} />
              {fieldErrors.customerName && <p className="mt-1 text-[12px] text-danger-600">{fieldErrors.customerName}</p>}
            </div>
            <div>
              <label htmlFor="co-phone" className="field-label">Mobile number *</label>
              <input id="co-phone" name="phone" required inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" className="field" value={form.phone} onChange={set("phone")} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="co-email" className="field-label">Email (optional)</label>
              <input id="co-email" name="email" type="email" autoComplete="email" className="field" value={form.email} onChange={set("email")} />
            </div>
          </div>
        </fieldset>

        {/* Address */}
        <fieldset>
          <div className="flex items-center justify-between">
            <legend className="font-serif text-[21px] text-forest-900">Delivery address</legend>
          </div>

          {savedAddresses.length > 0 && (
            <div className="mt-4 mb-6 space-y-3">
              <p className="text-[12.5px] font-medium text-ink-600">Choose a saved delivery address:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {savedAddresses.map((addr) => {
                  const isSelected = selectedAddrId === addr.id;
                  return (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => onSelectSavedAddress(addr)}
                      className={`text-left rounded border p-3.5 transition-all cursor-pointer ${
                        isSelected
                          ? "border-forest-700 bg-forest-50/30 ring-1 ring-forest-700 shadow-sm"
                          : "border-beige-200 bg-white hover:border-beige-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[13.5px] text-forest-950">{addr.name}</span>
                        {addr.isDefault && (
                          <span className="rounded bg-forest-100 px-1.5 py-0.5 text-[10px] font-medium text-forest-800">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[12px] text-ink-600 line-clamp-2">
                        {addr.addressLine1}, {addr.city} — {addr.pincode}
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-ink-500">Phone: {addr.phone}</p>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedAddrId("new");
                    setForm((f) => ({
                      ...f,
                      addressLine1: "",
                      addressLine2: "",
                      landmark: "",
                      city: "",
                      state: "",
                      pincode: "",
                    }));
                  }}
                  className={`text-left rounded border p-3.5 transition-all flex flex-col justify-center items-center text-center cursor-pointer ${
                    selectedAddrId === "new"
                      ? "border-forest-700 bg-forest-50/30 ring-1 ring-forest-700"
                      : "border-dashed border-beige-300 bg-white hover:border-forest-600"
                  }`}
                >
                  <Plus className="h-5 w-5 text-gold-600 mb-1" />
                  <span className="font-medium text-[13px] text-forest-900">
                    Use a different delivery address
                  </span>
                </button>
              </div>
            </div>
          )}

          <div className="mt-5 grid gap-4">
            <div>
              <label htmlFor="co-a1" className="field-label">House / Flat number, building *</label>
              <input id="co-a1" name="addressLine1" required autoComplete="address-line1" className="field" value={form.addressLine1} onChange={set("addressLine1")} />
            </div>
            <div>
              <label htmlFor="co-a2" className="field-label">Street, area, locality</label>
              <input id="co-a2" name="addressLine2" autoComplete="address-line2" className="field" value={form.addressLine2} onChange={set("addressLine2")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="co-landmark" className="field-label">Landmark (optional)</label>
                <input id="co-landmark" name="landmark" className="field" value={form.landmark} onChange={set("landmark")} />
              </div>
              <div>
                <label htmlFor="co-city" className="field-label">City / town *</label>
                <input id="co-city" name="city" required autoComplete="address-level2" className="field" value={form.city} onChange={set("city")} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="co-state" className="field-label">State *</label>
                <select id="co-state" name="state" required autoComplete="address-level1" className="field" value={form.state} onChange={set("state")}>
                  <option value="">Select state</option>
                  {STATE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="co-pin" className="field-label">PIN code *</label>
                <input id="co-pin" name="pincode" required inputMode="numeric" maxLength={6} autoComplete="postal-code" className="field" value={form.pincode} onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))} />
                <div className="mt-1.5 min-h-[18px] text-[12px]" role="status" aria-live="polite">
                  {pinChecking && <span className="text-ink-500">Checking serviceability…</span>}
                  {!pinChecking && pinStatus && (
                    <span className={pinStatus.serviceable ? "text-success-700" : "text-danger-600"}>
                      {pinStatus.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="co-instructions" className="field-label">Delivery instructions (optional)</label>
              <textarea id="co-instructions" name="deliveryInstructions" rows={2} className="field" value={form.deliveryInstructions} onChange={set("deliveryInstructions")} />
            </div>
          </div>
        </fieldset>

        {/* Payment */}
        <fieldset>
          <legend className="font-serif text-[21px] text-forest-900">Payment method</legend>
          <div className="mt-5 border border-forest-800/40 bg-forest-50 p-5">
            <label className="flex items-start gap-3">
              <input type="radio" checked readOnly className="mt-1 accent-[#16382A]" aria-label="Cash on Delivery selected" />
              <span>
                <span className="block text-[14.5px] font-semibold text-forest-900">
                  Cash on Delivery (COD)
                </span>
                <span className="mt-1 block text-[13px] leading-relaxed text-ink-600">
                  Payment is due in cash to the courier when your order is delivered. No advance
                  payment is required online.
                  {shipping.codFeePaise > 0 && ` A COD handling fee of ${formatINR(shipping.codFeePaise)} applies.`}
                </span>
              </span>
            </label>
          </div>
          <p className="mt-3 text-[12.5px] text-ink-500">
            Online payment options may be introduced later; Cash on Delivery is the only enabled
            method today.
          </p>
        </fieldset>
      </div>

      {/* Summary */}
      <aside className="h-fit border border-beige-200 bg-white p-6 lg:sticky lg:top-32" aria-label="Order summary">
        <h2 className="font-serif text-[19px] text-forest-900">Your Order</h2>
        <ul className="mt-4 divide-y divide-beige-200">
          {items.map((i) => (
            <li key={i.variantId} className="flex justify-between gap-3 py-2.5 text-[13.5px]">
              <span className="text-ink-800">
                {i.productName}
                <span className="block text-[12px] text-ink-500">
                  {i.variantLabel} · Qty {i.quantity}
                </span>
              </span>
              <span className="shrink-0 font-medium text-ink-900">
                {formatINR(i.unitPricePaise * i.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 border-t border-beige-200 pt-4 text-[13.5px]">
          <div className="flex justify-between">
            <dt className="text-ink-600">Subtotal ({count} item{count === 1 ? "" : "s"})</dt>
            <dd className="font-medium text-ink-900">{formatINR(subtotalPaise)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-600">Shipping{freeShipping ? " (free above threshold)" : ""}</dt>
            <dd className="font-medium text-ink-900">
              {effectiveShipping === 0 ? "FREE" : formatINR(effectiveShipping)}
            </dd>
          </div>
          {shipping.codFeePaise > 0 && (
            <div className="flex justify-between">
              <dt className="text-ink-600">COD handling fee</dt>
              <dd className="font-medium text-ink-900">{formatINR(shipping.codFeePaise)}</dd>
            </div>
          )}
        </dl>

        <div className="mt-4 flex justify-between border-t border-beige-200 pt-4">
          <span className="text-[14px] font-semibold text-forest-900">Total payable</span>
          <span className="font-serif text-[21px] text-forest-800">{formatINR(totalPaise)}</span>
        </div>

        {pinStatus && !pinStatus.serviceable && (
          <p className="mt-3 border border-danger-600/30 bg-danger-100 p-3 text-[12.5px] leading-relaxed text-danger-600">
            {pinStatus.message}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-4 border border-danger-600/30 bg-danger-100 p-3 text-[13px] leading-relaxed text-danger-600">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting || (pinStatus != null && !pinStatus.serviceable)} className="btn-primary mt-5 w-full">
          {submitting ? "Placing order…" : `Place Order · ${formatINR(totalPaise)}`}
        </button>
        <p className="mt-3 text-center text-[12px] leading-relaxed text-ink-500">
          By placing this order you confirm the delivery details above. Payment is due on delivery.
        </p>
      </aside>
    </form>
  );
}
