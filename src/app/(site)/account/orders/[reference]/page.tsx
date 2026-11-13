import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCustomer } from "@/lib/customer-auth";
import { getCustomerOrder } from "@/lib/customer-data";
import { OrderTrackingView } from "@/components/account/order-tracking-view";

interface OrderTrackingPageProps {
  params: Promise<{ reference: string }>;
}

export async function generateMetadata({ params }: OrderTrackingPageProps): Promise<Metadata> {
  const { reference } = await params;
  return {
    title: `Track Order ${reference} — AVRELLE AGRO`,
    robots: { index: false, follow: false },
  };
}

export default async function CustomerOrderTrackingPage({ params }: OrderTrackingPageProps) {
  const { reference } = await params;
  const customer = await requireCustomer(`/account/orders/${reference}`);

  const order = await getCustomerOrder(reference, customer.id);

  if (!order) {
    return (
      <div className="section-shell py-16 text-center">
        <h1 className="font-serif text-[28px] text-forest-900">Order Not Found</h1>
        <p className="mt-2 text-ink-600">
          We could not find an order matching reference <strong>{reference}</strong> under your account.
        </p>
        <Link href="/account" className="btn-primary mt-6 inline-block">
          Return to My Account
        </Link>
      </div>
    );
  }

  return (
    <div className="section-shell py-10 sm:py-14">
      <OrderTrackingView order={order} />
    </div>
  );
}
