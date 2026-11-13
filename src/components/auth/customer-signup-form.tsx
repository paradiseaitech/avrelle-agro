"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { customerSignupAction } from "@/lib/actions/customer-auth";
import { Eye, EyeOff } from "lucide-react";

export function CustomerSignupForm({ redirectUrl }: { redirectUrl?: string }) {
  const [state, action, pending] = useActionState(customerSignupAction, {});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form action={action} className="space-y-4">
      {redirectUrl && <input type="hidden" name="redirect" value={redirectUrl} />}

      <div>
        <label htmlFor="signup-name" className="field-label">
          Full name <span className="text-danger-600">*</span>
        </label>
        <input
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="e.g. Ramesh Kumar"
          className="field"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="signup-email" className="field-label">
            Email address <span className="text-danger-600">*</span>
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="signup-phone" className="field-label">
            Mobile number
          </label>
          <input
            id="signup-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="10-digit mobile"
            className="field"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="signup-password" className="field-label">
            Password <span className="text-danger-600">*</span>
          </label>
          <div className="relative">
            <input
              id="signup-password"
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
          <label htmlFor="signup-confirm" className="field-label">
            Confirm password <span className="text-danger-600">*</span>
          </label>
          <div className="relative">
            <input
              id="signup-confirm"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="Confirm password"
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
      </div>

      <p className="text-[11.5px] leading-relaxed text-ink-500">
        Password must be at least 8 characters and include at least one letter and one number.
      </p>

      <div className="pt-1">
        <label className="flex items-start gap-2.5 text-[12.5px] text-ink-700 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 rounded border-beige-300 text-forest-700 focus:ring-forest-600"
          />
          <span>
            I agree to AVRELLE AGRO&apos;s{" "}
            <Link href="/terms" target="_blank" className="underline hover:text-forest-800">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" target="_blank" className="underline hover:text-forest-800">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>

      {state.error && (
        <div
          role="alert"
          className="rounded border border-danger-600/30 bg-danger-100 p-3 text-[13px] leading-relaxed text-danger-600"
        >
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full py-2.5 font-medium shadow-sm transition-all"
      >
        {pending ? "Creating account…" : "Create Customer Account"}
      </button>

      <div className="border-t border-beige-200 pt-4 text-center text-[13px] text-ink-600">
        Already have an account?{" "}
        <Link
          href={`/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
          className="font-semibold text-forest-800 underline decoration-gold-500 hover:text-gold-700"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
