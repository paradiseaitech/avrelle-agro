import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password — AVRELLE AGRO",
  description: "Reset your AVRELLE AGRO customer account password.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="section-shell py-12 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <p className="text-eyebrow">Account Recovery</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900 sm:text-[34px]">Forgot Password</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
            Enter your registered email address to receive a secure link to reset your password.
          </p>
        </div>

        <div className="border border-beige-200 bg-white p-6 sm:p-8 shadow-sm">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
