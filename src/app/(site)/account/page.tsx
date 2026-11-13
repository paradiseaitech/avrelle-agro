import type { Metadata } from "next";
import { requireCustomer } from "@/lib/customer-auth";
import { getCustomerOrders, getCustomerAddresses } from "@/lib/customer-data";
import { ProfileForm } from "@/components/account/profile-form";
import { AddressManager } from "@/components/account/address-manager";
import { OrderHistoryList } from "@/components/account/order-history-list";
import { customerLogoutAction } from "@/lib/actions/customer-auth";
import { LogOut, Package, MapPin, User } from "lucide-react";

export const metadata: Metadata = {
  title: "My Account — AVRELLE AGRO",
  description: "Manage your AVRELLE AGRO account, saved delivery addresses, and track your orders.",
  robots: { index: false, follow: false },
};

interface AccountPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const customer = await requireCustomer("/account");
  const { tab = "orders" } = await searchParams;

  const [orders, addresses] = await Promise.all([
    getCustomerOrders(customer.id),
    getCustomerAddresses(customer.id),
  ]);

  return (
    <div className="section-shell py-10 sm:py-14">
      {/* Account Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-beige-200 pb-6">
        <div>
          <p className="text-eyebrow">Customer Account</p>
          <h1 className="mt-1 font-serif text-[28px] text-forest-900 sm:text-[36px]">
            Welcome, {customer.name}
          </h1>
          <p className="text-[13px] text-ink-500">
            {customer.email} {customer.phone ? `• ${customer.phone}` : ""}
          </p>
        </div>

        <form action={customerLogoutAction}>
          <button
            type="submit"
            className="btn-outline btn-sm flex items-center gap-2 hover:border-danger-600 hover:text-danger-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-6 flex border-b border-beige-200 gap-2 sm:gap-6 overflow-x-auto">
        <a
          href="/account?tab=orders"
          className={`flex items-center gap-2 border-b-2 py-3 px-1 text-[14px] font-medium transition-colors ${
            tab === "orders"
              ? "border-forest-800 text-forest-950 font-semibold"
              : "border-transparent text-ink-500 hover:text-forest-800"
          }`}
        >
          <Package className="h-4 w-4" />
          <span>My Orders</span>
          <span className="rounded-full bg-beige-200 px-2 py-0.5 text-[11px] text-ink-700">
            {orders.length}
          </span>
        </a>

        <a
          href="/account?tab=addresses"
          className={`flex items-center gap-2 border-b-2 py-3 px-1 text-[14px] font-medium transition-colors ${
            tab === "addresses"
              ? "border-forest-800 text-forest-950 font-semibold"
              : "border-transparent text-ink-500 hover:text-forest-800"
          }`}
        >
          <MapPin className="h-4 w-4" />
          <span>Delivery Addresses</span>
          <span className="rounded-full bg-beige-200 px-2 py-0.5 text-[11px] text-ink-700">
            {addresses.length}
          </span>
        </a>

        <a
          href="/account?tab=profile"
          className={`flex items-center gap-2 border-b-2 py-3 px-1 text-[14px] font-medium transition-colors ${
            tab === "profile"
              ? "border-forest-800 text-forest-950 font-semibold"
              : "border-transparent text-ink-500 hover:text-forest-800"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile Details</span>
        </a>
      </div>

      {/* Tab Panels */}
      <div className="mt-8">
        {tab === "orders" && (
          <div>
            <div className="mb-4">
              <h2 className="font-serif text-[20px] text-forest-900">Your Makhana Orders</h2>
              <p className="text-[13px] text-ink-500">
                Track status, view delivery details, and inspect ordered grades.
              </p>
            </div>
            <OrderHistoryList orders={orders} />
          </div>
        )}

        {tab === "addresses" && (
          <div>
            <AddressManager addresses={addresses} />
          </div>
        )}

        {tab === "profile" && (
          <div className="max-w-xl rounded border border-beige-200 bg-white p-6 sm:p-8">
            <h2 className="font-serif text-[20px] text-forest-900 mb-2">Personal Information</h2>
            <p className="text-[13px] text-ink-500 mb-6">
              Update your contact details for delivery communication.
            </p>
            <ProfileForm
              initialName={customer.name}
              initialPhone={customer.phone}
              email={customer.email}
            />
          </div>
        )}
      </div>
    </div>
  );
}
