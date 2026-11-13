import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Set New Password — AVRELLE AGRO",
  robots: { index: false, follow: false },
};

interface ResetPasswordProps {
  searchParams: Promise<{ token?: string; email?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordProps) {
  const { token, email } = await searchParams;

  if (!token || !email) {
    return (
      <div className="section-shell py-16 text-center">
        <h1 className="font-serif text-[28px] text-forest-900">Invalid Password Reset Link</h1>
        <p className="mt-2 text-ink-600">
          This password reset link is invalid or incomplete. Please request a new link.
        </p>
        <Link href="/forgot-password" className="btn-primary mt-6 inline-block">
          Request New Reset Link
        </Link>
      </div>
    );
  }

  return (
    <div className="section-shell py-12 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <p className="text-eyebrow">Account Security</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[34px]">Set New Password</h1>
          <p className="mt-2 text-[14px] text-ink-600">
            Choose a strong password for your account ({email}).
          </p>
        </div>

        <div className="border border-beige-200 bg-white p-6 sm:p-8 shadow-sm">
          <ResetPasswordForm token={token} email={email} />
        </div>
      </div>
    </div>
  );
}
