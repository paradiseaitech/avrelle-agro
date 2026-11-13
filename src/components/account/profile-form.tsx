"use client";

import { useActionState } from "react";
import { updateCustomerProfileAction } from "@/lib/actions/customer-auth";

export function ProfileForm({
  initialName,
  initialPhone,
  email,
}: {
  initialName: string;
  initialPhone: string | null;
  email: string;
}) {
  const [state, action, pending] = useActionState(updateCustomerProfileAction, {});

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="profile-name" className="field-label">
            Full name <span className="text-danger-600">*</span>
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            defaultValue={initialName}
            required
            className="field"
          />
        </div>

        <div>
          <label htmlFor="profile-phone" className="field-label">
            Mobile number
          </label>
          <input
            id="profile-phone"
            name="phone"
            type="tel"
            defaultValue={initialPhone ?? ""}
            placeholder="10-digit mobile"
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="profile-email" className="field-label">
          Email address
        </label>
        <input
          id="profile-email"
          type="email"
          value={email}
          disabled
          className="field bg-ivory-100 text-ink-500 cursor-not-allowed"
        />
        <p className="mt-1 text-[11.5px] text-ink-400">
          Email address is your unique account identifier and cannot be changed directly.
        </p>
      </div>

      {state.error && (
        <div role="alert" className="text-[12.5px] text-danger-600">
          {state.error}
        </div>
      )}

      {state.ok && (
        <div role="status" className="text-[12.5px] font-medium text-emerald-700">
          Profile details updated successfully.
        </div>
      )}

      <button type="submit" disabled={pending} className="btn-primary btn-sm">
        {pending ? "Saving changes…" : "Save Profile Details"}
      </button>
    </form>
  );
}
