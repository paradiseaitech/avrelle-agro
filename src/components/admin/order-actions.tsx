"use client";

import { useActionState } from "react";
import {
  recordCodAction,
  updateOrderStatusAction,
  type OrderActionResult,
} from "@/lib/actions/admin-orders";
import { orderStatuses } from "@/db/schema";

const initial: OrderActionResult = {};

export function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [state, action, pending] = useActionState(updateOrderStatusAction, initial);

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="orderId" value={orderId} />
      <div>
        <label htmlFor="next-status" className="field-label">Update fulfilment status</label>
        <select
          id="next-status"
          name="status"
          defaultValue={currentStatus}
          className="field"
          required
        >
          {orderStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="status-note" className="field-label">Note (optional)</label>
        <input
          id="status-note"
          name="note"
          maxLength={300}
          placeholder="e.g. Handed to courier, AWB 1234"
          className="field"
        />
      </div>
      {state.error && (
        <p role="alert" className="text-[12.5px] leading-relaxed text-danger-600">{state.error}</p>
      )}
      {state.ok && (
        <p role="status" className="text-[12.5px] font-medium text-emerald-700">Status updated.</p>
      )}
      <button type="submit" disabled={pending} className="btn-primary btn-sm w-full">
        {pending ? "Saving…" : "Save Status"}
      </button>
      <p className="text-[11.5px] leading-relaxed text-ink-500">
        Cancelling an order returns its reserved stock to the catalogue.
      </p>
    </form>
  );
}

export function CodCollectionForm({
  orderId,
  amountLabel,
  disabled,
}: {
  orderId: string;
  amountLabel: string;
  disabled: boolean;
}) {
  const [state, action, pending] = useActionState(recordCodAction, initial);

  if (disabled) {
    return (
      <div className="space-y-3">
        {state.ok && (
          <p role="status" className="text-[12.5px] font-medium text-emerald-700">
            COD collection recorded.
          </p>
        )}
        <p className="text-[12.5px] leading-relaxed text-ink-500">
          COD collection cannot be recorded for this order.
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="space-y-3"
      onSubmit={(e) => {
        if (!window.confirm(`Confirm that ${amountLabel} was collected in cash for this order?`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="orderId" value={orderId} />
      {state.error && (
        <p role="alert" className="text-[12.5px] leading-relaxed text-danger-600">{state.error}</p>
      )}
      {state.ok && (
        <p role="status" className="text-[12.5px] font-medium text-emerald-700">
          COD collection recorded.
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-gold btn-sm w-full">
        {pending ? "Recording…" : `Record COD Collected — ${amountLabel}`}
      </button>
      <p className="text-[11.5px] leading-relaxed text-ink-500">
        Records the cash handover against this order and marks payment as paid.
      </p>
    </form>
  );
}
