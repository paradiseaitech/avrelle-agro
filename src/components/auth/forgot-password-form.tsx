"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordResetAction } from "@/lib/actions/customer-auth";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordResetAction, {});

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="reset-email" className="field-label">
          Your registered email address <span className="text-danger-600">*</span>
        </label>
        <input
          id="reset-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="field"
        />
      </div>

      {state.error && (
        <div
          role="alert"
          className="rounded border border-danger-600/30 bg-danger-100 p-3 text-[13px] leading-relaxed text-danger-600"
        >
          {state.error}
        </div>
      )}

      {state.ok && (
        <div
          role="status"
          className="rounded border border-emerald-300 bg-emerald-50 p-4 text-[13px] leading-relaxed text-emerald-900"
        >
          <p className="font-semibold text-emerald-950">Password reset link sent!</p>
          <p className="mt-1">
            If an account exists for that email, we have sent instructions to reset your password. Please check your inbox and spam folder.
          </p>
        </div>
      )}

      {!state.ok && (
        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full py-2.5 font-medium shadow-sm transition-all"
        >
          {pending ? "Sending link…" : "Send Reset Link"}
        </button>
      )}

      <div className="border-t border-beige-200 pt-4 text-center text-[13px] text-ink-600">
        Remembered your password?{" "}
        <Link href="/login" className="font-semibold text-forest-800 underline decoration-gold-500 hover:text-gold-700">
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
