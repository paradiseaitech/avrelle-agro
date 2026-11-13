import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";
import { listPincodeRules } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import {
  AnnouncementForm,
  BusinessForm,
  HeroForm,
  HomeContentForm,
  PasswordChangeForm,
  PincodeForm,
  ShippingForm,
} from "@/components/admin/settings-forms";
import { DeletePincodeForm } from "@/components/admin/danger-forms";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const [settings, pincodes, admin] = await Promise.all([
    getSettings(),
    listPincodeRules(),
    requireAdmin(),
  ]);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Configuration</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900">Site Settings</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Changes are applied to the storefront immediately after saving.
          </p>
        </div>
        <Link href="/admin" className="btn-outline btn-sm">Dashboard</Link>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="border border-beige-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-[21px] text-forest-900">Announcement bar</h2>
          <div className="mt-4">
            <AnnouncementForm value={settings.announcement} />
          </div>
        </section>

        <section className="border border-beige-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-[21px] text-forest-900">Hero</h2>
          <div className="mt-4">
            <HeroForm value={settings.hero} />
          </div>
        </section>

        <section className="border border-beige-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-[21px] text-forest-900">Brand story</h2>
          <div className="mt-4">
            <HomeContentForm value={settings.homeContent} />
          </div>
        </section>

        <section className="border border-beige-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-[21px] text-forest-900">Shipping &amp; delivery</h2>
          <div className="mt-4">
            <ShippingForm value={settings.shipping} />
          </div>
        </section>

        <section className="border border-beige-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-[21px] text-forest-900">Business details</h2>
          <div className="mt-4">
            <BusinessForm value={settings.business} />
          </div>
        </section>

        <section className="border border-beige-200 bg-white p-5 sm:p-6">
          <h2 className="font-serif text-[21px] text-forest-900">Account</h2>
          <p className="mt-1 mb-4 text-[12.5px] text-ink-500">
            Signed in as <span className="font-medium text-forest-800">{admin.email}</span> ({admin.role}).
          </p>
          <PasswordChangeForm />
        </section>
      </div>

      <section className="border border-beige-200 bg-white p-5 sm:p-6">
        <h2 className="font-serif text-[21px] text-forest-900">PIN code rules</h2>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
          Rules override the defaults for a specific PIN code. PIN codes without a rule use the
          default shipping charge and delivery estimate above.
        </p>

        {pincodes.length > 0 ? (
          <ul className="mt-5 divide-y divide-beige-200 border-y border-beige-200">
            {pincodes.map((rule) => (
              <li key={rule.pincode} className="py-4">
                <details className="group">
                  <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[14px] font-semibold text-forest-900">
                        {rule.pincode}
                      </span>
                      <span className="text-[11.5px] text-ink-500">
                        {rule.serviceable ? "Serviceable" : "Not serviceable"}
                        {rule.shippingPaise != null
                          ? ` · ₹${rule.shippingPaise / 100} shipping`
                          : " · default shipping"}
                        {rule.estDaysMin != null && rule.estDaysMax != null
                          ? ` · ${rule.estDaysMin}–${rule.estDaysMax} days`
                          : ""}
                        {rule.codAvailable ? "" : " · COD off"}
                      </span>
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="text-[11.5px] font-medium text-forest-700 group-open:hidden">Edit</span>
                      <span className="hidden text-[11.5px] font-medium text-forest-700 group-open:inline">Close</span>
                      <DeletePincodeForm pincode={rule.pincode} />
                    </span>
                  </summary>
                  <div className="mt-4 border-t border-beige-200 pt-4">
                    <PincodeForm
                      prefix={`pin-${rule.pincode}`}
                      rule={{
                        pincode: rule.pincode,
                        serviceable: rule.serviceable,
                        shippingPaise: rule.shippingPaise,
                        estDaysMin: rule.estDaysMin,
                        estDaysMax: rule.estDaysMax,
                        codAvailable: rule.codAvailable,
                      }}
                    />
                  </div>
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 border border-dashed border-beige-300 bg-ivory-50 px-4 py-5 text-center text-[13px] text-ink-500">
            No PIN-specific rules yet. All valid PIN codes use the default shipping settings.
          </p>
        )}

        <div className="mt-6 border-t border-beige-200 pt-5">
          <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-forest-800">
            Add or update a PIN code
          </h3>
          <PincodeForm prefix="new-pin" />
        </div>
      </section>
    </div>
  );
}
