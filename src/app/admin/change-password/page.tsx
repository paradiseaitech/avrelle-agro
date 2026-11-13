import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { PasswordChangeForm } from "@/components/admin/settings-forms";
import { logoutAction } from "@/lib/actions/admin-auth";

export const metadata: Metadata = {
  title: "Required Password Change — AVRELLE Administration",
  robots: { index: false, follow: false },
};

export default async function AdminChangePasswordPage() {
  const admin = await requireAdmin(undefined, { allowPasswordChange: true });

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-950 botanical-grid px-5 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center">
          <img
            src="/brand/logo-lockup-light.svg"
            alt="AVRELLE AGRO PVT LTD"
            className="mx-auto h-16 w-auto"
          />
          <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-luxe text-gold-400">
            Security Setup Required
          </p>
        </div>

        <div className="mt-8 border border-gold-500/25 bg-ivory-50 p-7 shadow-xl sm:p-9">
          <h1 className="font-serif text-[24px] text-forest-900">Change Temporary Password</h1>
          <div className="mt-3 mb-6 rounded border border-amber-300 bg-amber-50 p-3.5 text-[13px] leading-relaxed text-amber-900">
            <p className="font-semibold">First-time login requirement</p>
            <p className="mt-1">
              Signed in as <span className="font-medium text-forest-900">{admin.email}</span>.
              You must set a new permanent password before you can access the administration dashboard.
            </p>
          </div>

          <PasswordChangeForm />

          {!admin.mustChangePassword && (
            <div className="mt-5 border-t border-beige-200 pt-4 text-center">
              <a href="/admin" className="btn-primary w-full inline-block text-center">
                Proceed to Dashboard &rarr;
              </a>
            </div>
          )}

          <form action={logoutAction} className="mt-6 border-t border-beige-200 pt-4 text-center">
            <button type="submit" className="text-[12px] text-ink-500 hover:text-danger-600">
              Sign out and return later
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
