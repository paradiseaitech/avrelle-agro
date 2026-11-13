"use client";

import { useActionState } from "react";
import {
  updateEnquiryAction,
  type EnquiryActionResult,
} from "@/lib/actions/admin-enquiries";
import { enquiryStatuses } from "@/db/schema";

const initial: EnquiryActionResult = {};

export function EnquiryManageForm({
  id,
  status,
  adminNotes,
}: {
  id: string;
  status: string;
  adminNotes: string | null;
}) {
  const [state, action, pending] = useActionState(updateEnquiryAction, initial);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="id" value={id} />
      <div>
        <label htmlFor="enquiry-status" className="field-label">Enquiry status</label>
        <select id="enquiry-status" name="status" defaultValue={status} className="field" required>
          {enquiryStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="enquiry-notes" className="field-label">Internal notes</label>
        <textarea
          id="enquiry-notes"
          name="adminNotes"
          rows={6}
          defaultValue={adminNotes ?? ""}
          maxLength={4000}
          placeholder="Quotation sent, rates agreed, follow-up date…"
          className="field"
        />
      </div>
      {state.error && (
        <p role="alert" className="text-[12.5px] leading-relaxed text-danger-600">{state.error}</p>
      )}
      {state.ok && (
        <p role="status" className="text-[12.5px] font-medium text-emerald-700">Enquiry updated.</p>
      )}
      <button type="submit" disabled={pending} className="btn-primary btn-sm w-full">
        {pending ? "Saving…" : "Save Enquiry"}
      </button>
      <p className="text-[11.5px] leading-relaxed text-ink-500">
        Notes are internal only and are never shown to the customer.
      </p>
    </form>
  );
}
