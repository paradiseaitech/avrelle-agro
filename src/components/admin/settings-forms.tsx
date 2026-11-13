"use client";

import { useActionState } from "react";
import {
  saveAnnouncementAction,
  saveBusinessAction,
  saveHeroAction,
  saveHomeContentAction,
  savePincodeAction,
  saveShippingAction,
  type SettingsResult,
} from "@/lib/actions/admin-settings";
import { changePasswordAction, type PasswordState } from "@/lib/actions/admin-auth";
import {
  DEFAULT_ANNOUNCEMENT,
  DEFAULT_HERO,
  DEFAULT_HOME_CONTENT,
  DEFAULT_SHIPPING,
  type AnnouncementSettings,
  type BusinessSettings,
  type HeroSettings,
  type HomeContentSettings,
  type ShippingSettings,
} from "@/lib/site";

const initial: SettingsResult = {};
const initialPassword: PasswordState = {};

function Feedback({ state }: { state: SettingsResult }) {
  if (state.error) {
    return (
      <p role="alert" className="border border-danger-600/30 bg-danger-100 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-danger-600">
        {state.error}
      </p>
    );
  }
  if (state.ok) {
    return (
      <p role="status" className="border border-emerald-600/30 bg-emerald-50 px-3.5 py-2.5 text-[12.5px] text-emerald-800">
        Settings saved and storefront refreshed.
      </p>
    );
  }
  return null;
}

function money(paise: number): string {
  return String(paise / 100);
}

/* -------------------------------------------------------------- announcement */

export function AnnouncementForm({ value }: { value: AnnouncementSettings }) {
  const [state, action, pending] = useActionState(saveAnnouncementAction, initial);

  return (
    <form action={action} className="space-y-4">
      <label className="flex items-center gap-2 text-[13px] text-ink-800">
        <input type="checkbox" name="enabled" defaultChecked={value.enabled} />
        Show announcement bar
      </label>
      <div>
        <label htmlFor="ann-text" className="field-label">Announcement text</label>
        <input
          id="ann-text"
          name="text"
          defaultValue={value.text || DEFAULT_ANNOUNCEMENT.text}
          maxLength={180}
          className="field"
          required
        />
      </div>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className="btn-primary btn-sm">
        {pending ? "Saving…" : "Save Announcement"}
      </button>
    </form>
  );
}

/* --------------------------------------------------------------------- hero */

export function HeroForm({ value }: { value: HeroSettings }) {
  const [state, action, pending] = useActionState(saveHeroAction, initial);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="hero-headline" className="field-label">Headline</label>
        <input
          id="hero-headline"
          name="headline"
          defaultValue={value.headline || DEFAULT_HERO.headline}
          maxLength={160}
          className="field"
          required
        />
      </div>
      <div>
        <label htmlFor="hero-sub" className="field-label">Subheadline</label>
        <textarea
          id="hero-sub"
          name="subheadline"
          rows={2}
          defaultValue={value.subheadline || DEFAULT_HERO.subheadline}
          maxLength={320}
          className="field"
          required
        />
      </div>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className="btn-primary btn-sm">
        {pending ? "Saving…" : "Save Hero"}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------- home content */

export function HomeContentForm({ value }: { value: HomeContentSettings }) {
  const [state, action, pending] = useActionState(saveHomeContentAction, initial);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="story-heading" className="field-label">Brand story heading</label>
        <input
          id="story-heading"
          name="storyHeading"
          defaultValue={value.storyHeading || DEFAULT_HOME_CONTENT.storyHeading}
          maxLength={160}
          className="field"
          required
        />
      </div>
      <div>
        <label htmlFor="story-body" className="field-label">Brand story body</label>
        <textarea
          id="story-body"
          name="storyBody"
          rows={5}
          defaultValue={value.storyBody || DEFAULT_HOME_CONTENT.storyBody}
          maxLength={2000}
          className="field"
          required
        />
      </div>
      <label className="flex items-start gap-2 text-[13px] text-ink-800">
        <input type="checkbox" name="showSampleNotice" defaultChecked={value.showSampleNotice} className="mt-0.5" />
        <span>
          Show the “preview catalogue / sample prices” notice
          <span className="mt-0.5 block text-[11.5px] text-ink-500">
            Turn off only after all retail prices are verified and sample flags are removed from
            products.
          </span>
        </span>
      </label>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className="btn-primary btn-sm">
        {pending ? "Saving…" : "Save Content"}
      </button>
    </form>
  );
}

/* ----------------------------------------------------------------- shipping */

export function ShippingForm({ value }: { value: ShippingSettings }) {
  const [state, action, pending] = useActionState(saveShippingAction, initial);

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="ship-default" className="field-label">Default shipping (₹)</label>
          <input id="ship-default" name="defaultRupees" inputMode="decimal" defaultValue={money(value.defaultPaise)} className="field" required />
        </div>
        <div>
          <label htmlFor="ship-free" className="field-label">Free above (₹)</label>
          <input id="ship-free" name="freeAboveRupees" inputMode="decimal" defaultValue={money(value.freeShippingAbovePaise)} className="field" required />
          <p className="mt-1 text-[11px] text-ink-500">0 disables free shipping.</p>
        </div>
        <div>
          <label htmlFor="ship-cod" className="field-label">COD fee (₹)</label>
          <input id="ship-cod" name="codFeeRupees" inputMode="decimal" defaultValue={money(value.codFeePaise)} className="field" required />
        </div>
        <div>
          <label htmlFor="ship-min" className="field-label">Min delivery days</label>
          <input id="ship-min" name="estDaysMin" inputMode="numeric" defaultValue={value.estDaysMin} className="field" required />
        </div>
        <div>
          <label htmlFor="ship-max" className="field-label">Max delivery days</label>
          <input id="ship-max" name="estDaysMax" inputMode="numeric" defaultValue={value.estDaysMax} className="field" required />
        </div>
        <label className="flex items-end gap-2 pb-2.5 text-[13px] text-ink-800">
          <input type="checkbox" name="serviceable" defaultChecked={value.serviceable} />
          Retail delivery enabled
        </label>
      </div>
      <p className="text-[11.5px] text-ink-500">
        Defaults: {money(DEFAULT_SHIPPING.defaultPaise)} shipping, free above{" "}
        {money(DEFAULT_SHIPPING.freeShippingAbovePaise)}, {DEFAULT_SHIPPING.estDaysMin}–
        {DEFAULT_SHIPPING.estDaysMax} days.
      </p>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className="btn-primary btn-sm">
        {pending ? "Saving…" : "Save Shipping"}
      </button>
    </form>
  );
}

/* ----------------------------------------------------------------- business */

export function BusinessForm({ value }: { value: BusinessSettings }) {
  const [state, action, pending] = useActionState(saveBusinessAction, initial);

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { name: "displayName", label: "Display name", value: value.displayName, required: true },
          { name: "tagline", label: "Tagline", value: value.tagline, required: true },
          { name: "addressLine", label: "Address / locality", value: value.addressLine, required: true },
          { name: "city", label: "City", value: value.city, required: true },
          { name: "state", label: "State", value: value.state, required: true },
          { name: "phone", label: "Phone (shown)", value: value.phone, required: true },
          { name: "email", label: "Email (shown)", value: value.email, required: true },
          { name: "whatsapp", label: "WhatsApp number", value: value.whatsapp, required: true },
        ].map((f) => (
          <div key={f.name}>
            <label htmlFor={`biz-${f.name}`} className="field-label">{f.label}</label>
            <input
              id={`biz-${f.name}`}
              name={f.name}
              defaultValue={f.value}
              className="field"
              required={f.required}
            />
          </div>
        ))}
      </div>
      <p className="border border-beige-200 bg-ivory-100 px-3.5 py-2.5 text-[11.5px] leading-relaxed text-ink-600">
        GST details are intentionally not editable here. They must not be published until the GST
        registration is independently verified.
      </p>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className="btn-primary btn-sm">
        {pending ? "Saving…" : "Save Business Details"}
      </button>
    </form>
  );
}

/* --------------------------------------------------------------- PIN codes */

export interface PincodeValues {
  pincode: string;
  serviceable: boolean;
  shippingPaise: number | null;
  estDaysMin: number | null;
  estDaysMax: number | null;
  codAvailable: boolean;
}

export function PincodeForm({
  rule,
  prefix,
}: {
  rule?: PincodeValues;
  prefix: string;
}) {
  const [state, action, pending] = useActionState(savePincodeAction, initial);
  const exists = Boolean(rule);

  return (
    <form action={action} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label htmlFor={`${prefix}-pin`} className="field-label">PIN code *</label>
          <input
            id={`${prefix}-pin`}
            name="pincode"
            defaultValue={rule?.pincode ?? ""}
            readOnly={exists}
            placeholder="854301"
            className={`field ${exists ? "bg-ivory-100 text-ink-500" : ""}`}
            required
          />
        </div>
        <div>
          <label htmlFor={`${prefix}-ship`} className="field-label">Shipping (₹)</label>
          <input
            id={`${prefix}-ship`}
            name="shippingRupees"
            inputMode="decimal"
            defaultValue={rule?.shippingPaise != null ? money(rule.shippingPaise) : ""}
            placeholder="Default"
            className="field"
          />
        </div>
        <div>
          <label htmlFor={`${prefix}-min`} className="field-label">Min days</label>
          <input id={`${prefix}-min`} name="estDaysMin" inputMode="numeric" defaultValue={rule?.estDaysMin ?? ""} placeholder="Default" className="field" />
        </div>
        <div>
          <label htmlFor={`${prefix}-max`} className="field-label">Max days</label>
          <input id={`${prefix}-max`} name="estDaysMax" inputMode="numeric" defaultValue={rule?.estDaysMax ?? ""} placeholder="Default" className="field" />
        </div>
        <div className="flex flex-col justify-end gap-1.5 pb-1">
          <label className="flex items-center gap-2 text-[12px] text-ink-800">
            <input type="checkbox" name="serviceable" defaultChecked={rule?.serviceable ?? true} />
            Serviceable
          </label>
          <label className="flex items-center gap-2 text-[12px] text-ink-800">
            <input type="checkbox" name="codAvailable" defaultChecked={rule?.codAvailable ?? true} />
            COD available
          </label>
        </div>
      </div>
      {state.error && <p role="alert" className="text-[12px] text-danger-600">{state.error}</p>}
      {state.ok && <p role="status" className="text-[12px] font-medium text-emerald-700">PIN rule saved.</p>}
      <button type="submit" disabled={pending} className="btn-outline btn-sm">
        {pending ? "Saving…" : exists ? "Save Rule" : "Add PIN Rule"}
      </button>
    </form>
  );
}

/* ----------------------------------------------------------------- password */

export function PasswordChangeForm() {
  const [state, action, pending] = useActionState(changePasswordAction, initialPassword);

  return (
    <form action={action} className="space-y-3">
      <div>
        <label htmlFor="pw-current" className="field-label">Current password</label>
        <input id="pw-current" name="currentPassword" type="password" autoComplete="current-password" className="field" required />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="pw-new" className="field-label">New password</label>
          <input id="pw-new" name="newPassword" type="password" autoComplete="new-password" minLength={10} className="field" required />
        </div>
        <div>
          <label htmlFor="pw-confirm" className="field-label">Confirm new password</label>
          <input id="pw-confirm" name="confirmPassword" type="password" autoComplete="new-password" minLength={10} className="field" required />
        </div>
      </div>
      <p className="text-[11.5px] text-ink-500">Minimum 10 characters. Use a unique password.</p>
      {state.error && <p role="alert" className="text-[12px] text-danger-600">{state.error}</p>}
      {state.ok && (
        <div className="rounded border border-emerald-300 bg-emerald-50 p-3 text-[12.5px] text-emerald-800">
          <p className="font-semibold">Password updated successfully!</p>
          <p className="mt-1">Your new permanent password is active.</p>
          <a href="/admin" className="btn-primary mt-2.5 inline-block text-[12px] py-1.5 px-4 text-center">
            Proceed to Dashboard &rarr;
          </a>
        </div>
      )}
      {!state.ok && (
        <button type="submit" disabled={pending} className="btn-primary btn-sm">
          {pending ? "Updating…" : "Update Password"}
        </button>
      )}
    </form>
  );
}
