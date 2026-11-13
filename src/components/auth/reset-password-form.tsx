"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { resetPasswordAction } from "@/lib/actions/customer-auth";
import { Eye, EyeOff } from "lucide-react";

export function ResetPasswordForm({ token, email }: { token: string; email: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, {});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="email" value={email} />

      <div>
        <label htmlFor="new-password" className="field-label">
          New password <span className="text-danger-600">*</span>
        </label>
        <div className="relative">
          <input
            id="new-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="Min. 8 characters"
            className="field pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirm-new-password" className="field-label">
          Confirm new password <span className="text-danger-600">*</span>
        </label>
        <div className="relative">
          <input
            id="confirm-new-password"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="Confirm new password"
            className="field pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 focus:outline-none"
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <p className="text-[11.5px] leading-relaxed text-ink-500">
        Password must be at least 8 characters long and include letters and numbers.
      </p>

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
          <p className="font-semibold text-emerald-950">Password reset successful!</p>
          <p className="mt-1">
            Your password has been changed. You can now sign in with your new password.
          </p>
          <Link
            href="/login"
            className="btn-primary mt-3 inline-block py-2 px-4 text-[13px] text-center"
          >
            Sign in now &rarr;
          </Link>
        </div>
      )}

      {!state.ok && (
        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full py-2.5 font-medium shadow-sm transition-all"
        >
          {pending ? "Resetting password…" : "Reset Password"}
        </button>
      )}
    </form>
  );
}
