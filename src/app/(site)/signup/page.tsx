import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { CustomerSignupForm } from "@/components/auth/customer-signup-form";

export const metadata: Metadata = {
  title: "Create Customer Account — AVRELLE AGRO",
  description: "Create an account with AVRELLE AGRO for faster checkout and order tracking.",
  robots: { index: false, follow: false },
};

interface SignupPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { redirect: redirectParam } = await searchParams;
  const customer = await getCurrentCustomer();
  if (customer) {
    redirect(redirectParam || "/account");
  }

  return (
    <div className="section-shell py-12 sm:py-16">
      <div className="mx-auto max-w-lg">
        <div className="text-center mb-8">
          <p className="text-eyebrow">Customer Portal</p>
          <h1 className="mt-2 font-serif text-[32px] text-forest-900 sm:text-[36px]">Create Account</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
            {redirectParam === "/checkout"
              ? "Create your account to complete checkout. Your cart items are saved."
              : "Join AVRELLE AGRO to enjoy seamless ordering, address management, and live order tracking."}
          </p>
        </div>

        <div className="border border-beige-200 bg-white p-6 sm:p-8 shadow-sm">
          <CustomerSignupForm redirectUrl={redirectParam} />
        </div>

        <p className="mt-6 text-center text-[12px] text-ink-500">
          Already registered?{" "}
          <Link
            href={`/login${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ""}`}
            className="font-medium text-forest-800 underline decoration-gold-500 hover:text-gold-700"
          >
            Sign in to existing account
          </Link>
        </p>
      </div>
    </div>
  );
}
