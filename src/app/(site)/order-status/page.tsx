import type { Metadata } from "next";
import Link from "next/link";
import { OrderLookupForm } from "@/components/order/order-lookup-form";

export const metadata: Metadata = {
  title: "Order Status — Track Your AVRELLE Order",
  description: "Check the status of your AVRELLE AGRO makhana order using your order reference.",
  robots: { index: false },
};

export default function OrderStatusPage() {
  return (
    <div className="section-shell py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-forest-700">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-forest-800">Order Status</li>
        </ol>
      </nav>
      <h1 className="font-serif text-[32px] text-forest-900 sm:text-[40px]">Track Your Order</h1>
      <p className="mt-3 mb-10 max-w-2xl text-[14.5px] leading-relaxed text-ink-600">
        Enter the order reference from your confirmation page along with the mobile number you used
        at checkout.
      </p>
      <OrderLookupForm />
    </div>
  );
}
