import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { CustomerLoginForm } from "@/components/auth/customer-login-form";

export const metadata: Metadata = {
  title: "Customer Sign In — AVRELLE AGRO",
  description: "Sign in to your AVRELLE AGRO customer account to manage orders, addresses, and tracking.",
  robots: { index: false, follow: false },
};

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect: redirectParam } = await searchParams;
  const customer = await getCurrentCustomer();
  if (customer) {
    redirect(redirectParam || "/account");
  }

  return (
    <div className="section-shell py-12 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <p className="text-eyebrow">Customer Portal</p>
          <h1 className="mt-2 font-serif text-[32px] text-forest-900 sm:text-[36px]">Sign In</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
            {redirectParam === "/checkout"
              ? "Please sign in or create an account to proceed with checkout. Your cart is preserved."
              : "Access your saved addresses, track your makhana orders, and manage your account."}
          </p>
        </div>

        <div className="border border-beige-200 bg-white p-6 sm:p-8 shadow-sm">
          <CustomerLoginForm redirectUrl={redirectParam} />
        </div>

        <p className="mt-6 text-center text-[12px] text-ink-500">
          Need assistance with your account?{" "}
          <Link href="/contact" className="underline hover:text-forest-800">
            Contact customer support
          </Link>
        </p>
      </div>
    </div>
  );
}
