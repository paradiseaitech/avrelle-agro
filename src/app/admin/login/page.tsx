import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Administrator Sign In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-950 botanical-grid px-5 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <img
            src="/brand/logo-lockup-light.svg"
            alt="AVRELLE AGRO PVT LTD"
            className="mx-auto h-16 w-auto"
          />
          <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-luxe text-gold-400">
            Administration
          </p>
        </div>

        <div className="mt-8 border border-gold-500/25 bg-ivory-50 p-7 shadow-xl sm:p-9">
          <h1 className="font-serif text-[26px] text-forest-900">Sign in</h1>
          <p className="mt-2 mb-6 text-[13.5px] leading-relaxed text-ink-600">
            Manage products, orders, enquiries, and site settings.
          </p>
          <AdminLoginForm />
        </div>

        <p className="mt-6 text-center text-[12px] text-ivory-100/60">
          <Link href="/" className="underline decoration-gold-500/50 underline-offset-4 hover:text-gold-300">
            Return to storefront
          </Link>
        </p>
      </div>
    </div>
  );
}
