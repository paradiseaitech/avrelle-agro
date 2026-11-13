"use client";

import { useActionState, useState } from "react";
import { loginAction, type LoginState } from "@/lib/actions/admin-auth";

const initialState: LoginState = {};

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="admin-email" className="field-label">
          Email address
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="field"
          placeholder="admin@avrelleagro.in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="field-label">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="field"
          placeholder="••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="border border-danger-600/30 bg-danger-100 px-4 py-3 text-[13px] leading-relaxed text-danger-600"
        >
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Signing in…" : "Sign In"}
      </button>

      <p className="text-center text-[12px] leading-relaxed text-ink-500">
        Authorised staff only. All administrative actions are attributed to your account.
      </p>
    </form>
  );
}
