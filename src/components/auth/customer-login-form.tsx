"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { customerLoginAction, type AuthState } from "@/lib/actions/customer-auth";
import { Eye, EyeOff } from "lucide-react";

export function CustomerLoginForm({ redirectUrl }: { redirectUrl?: string }) {
  const [state, action, pending] = useActionState(customerLoginAction, {});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="space-y-4">
      {redirectUrl && <input type="hidden" name="redirect" value={redirectUrl} />}

      <div>
        <label htmlFor="customer-email" className="field-label">
          Email address <span className="text-danger-600">*</span>
        </label>
        <input
          id="customer-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="field"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="customer-password" className="field-label">
            Password <span className="text-danger-600">*</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-[12px] font-medium text-forest-700 hover:text-gold-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            id="customer-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="••••••••"
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
        {pending ? "Signing in…" : "Sign In"}
      </button>

      <div className="border-t border-beige-200 pt-4 text-center text-[13px] text-ink-600">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
          className="font-semibold text-forest-800 underline decoration-gold-500 hover:text-gold-700"
        >
          Create an account
        </Link>
      </div>
    </form>
  );
}
