import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/db-data";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { getCustomerAddresses } from "@/lib/customer-data";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutAuthPrompt } from "@/components/checkout/checkout-auth-prompt";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout — Cash on Delivery",
  description: "Complete your AVRELLE AGRO makhana order with Cash on Delivery.",
  robots: { index: false },
};

export default async function CheckoutPage() {
  const [settings, customer] = await Promise.all([
    getSettings(),
    getCurrentCustomer(),
  ]);

  const savedAddresses = customer ? await getCustomerAddresses(customer.id) : [];

  return (
    <div className="section-shell py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-forest-700">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/cart" className="hover:text-forest-700">Cart</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-forest-800">Checkout</li>
        </ol>
      </nav>

      <h1 className="mb-3 font-serif text-[32px] text-forest-900 sm:text-[40px]">Checkout</h1>
      <p className="mb-10 max-w-2xl text-[14.5px] leading-relaxed text-ink-600">
        Cash on Delivery orders are confirmed immediately. Payment is made in cash to the courier
        when your order arrives.
      </p>

      {!customer ? (
        <CheckoutAuthPrompt />
      ) : (
        <CheckoutForm
          shipping={settings.shipping}
          customer={customer}
          savedAddresses={savedAddresses}
        />
      )}
    </div>
  );
}
