"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Order, OrderItem } from "@/db/schema";
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  RotateCw,
  MapPin,
  CreditCard,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

interface StatusEvent {
  status: string;
  at: string;
  note?: string;
}

interface OrderWithItems extends Order {
  items: OrderItem[];
}

export function OrderTrackingView({ order }: { order: OrderWithItems }) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Poll status while page is open every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      router.refresh();
    }, 30_000);
    return () => clearInterval(timer);
  }, [router]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const formatRupees = (paise: number) =>
    (paise / 100).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const history = (order.statusHistory || []) as StatusEvent[];

  const steps = [
    { key: "pending", label: "Order Placed", icon: Clock },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
    { key: "packed", label: "Processing & Packed", icon: Package },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle2 },
  ];

  const statusOrder = ["pending", "confirmed", "packed", "shipped", "out_for_delivery", "delivered"];
  const isCancelled = order.fulfilmentStatus === "cancelled";
  const currentIndex = statusOrder.indexOf(order.fulfilmentStatus);

  const getEventTime = (key: string) => {
    const ev = history.find((h) => h.status === key);
    if (!ev) return null;
    return new Date(ev.at).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-forest-700 hover:text-gold-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Account
          </Link>
          <h1 className="mt-2 font-serif text-[28px] text-forest-900 sm:text-[32px]">
            Order {order.reference}
          </h1>
          <p className="text-[13px] text-ink-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <button
          type="button"
          onClick={handleManualRefresh}
          className="btn-outline btn-sm flex items-center gap-1.5"
          title="Refresh tracking status"
        >
          <RotateCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Visual Timeline Card */}
      <div className="rounded border border-beige-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-[18px] text-forest-900 mb-6">Delivery Progress</h2>

        {isCancelled ? (
          <div className="rounded border border-danger-200 bg-danger-50 p-4 text-center">
            <AlertCircle className="mx-auto h-7 w-7 text-danger-600 mb-2" />
            <h3 className="font-semibold text-danger-900">Order Cancelled</h3>
            <p className="mt-1 text-[13px] text-danger-700">
              This order has been cancelled. Any restocked inventory has been returned.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Desktop / Horizontal Timeline */}
            <div className="hidden md:grid md:grid-cols-6 gap-2">
              {steps.map((step, idx) => {
                const isPassed = currentIndex >= idx;
                const isCurrent = currentIndex === idx;
                const time = getEventTime(step.key);

                return (
                  <div key={step.key} className="text-center relative">
                    <div className="flex items-center justify-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                          isCurrent
                            ? "bg-gold-500 text-forest-950 ring-4 ring-gold-200"
                            : isPassed
                            ? "bg-forest-800 text-white"
                            : "bg-beige-200 text-ink-400"
                        }`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <p
                      className={`mt-2 text-[12px] font-medium leading-tight ${
                        isCurrent
                          ? "font-bold text-forest-950"
                          : isPassed
                          ? "text-forest-800"
                          : "text-ink-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    {time && <p className="mt-1 text-[10.5px] text-ink-500">{time}</p>}
                  </div>
                );
              })}
            </div>

            {/* Mobile / Vertical Timeline */}
            <div className="md:hidden space-y-4">
              {steps.map((step, idx) => {
                const isPassed = currentIndex >= idx;
                const isCurrent = currentIndex === idx;
                const time = getEventTime(step.key);

                return (
                  <div key={step.key} className="flex items-start gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isCurrent
                          ? "bg-gold-500 text-forest-950 ring-2 ring-gold-200"
                          : isPassed
                          ? "bg-forest-800 text-white"
                          : "bg-beige-200 text-ink-400"
                      }`}
                    >
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p
                        className={`text-[13px] ${
                          isCurrent
                            ? "font-bold text-forest-950"
                            : isPassed
                            ? "font-medium text-forest-900"
                            : "text-ink-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      {time && <p className="text-[11px] text-ink-500">{time}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Milestone Activity Log */}
        {history.length > 0 && (
          <div className="mt-8 border-t border-beige-100 pt-5">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ink-500 mb-3">
              Milestone Log
            </h3>
            <ul className="space-y-2 text-[12.5px] text-ink-600">
              {history.map((ev, i) => (
                <li key={i} className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-medium capitalize text-forest-900">
                      {ev.status.replace(/_/g, " ")}
                    </span>
                    {ev.note && <span className="text-ink-500"> — {ev.note}</span>}
                  </div>
                  <span className="shrink-0 text-ink-400 text-[11.5px]">
                    {new Date(ev.at).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Grid: Order Items & Delivery/Payment details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Items Summary */}
        <div className="rounded border border-beige-200 bg-white p-5">
          <h2 className="font-serif text-[18px] text-forest-900 mb-4">Ordered Items</h2>
          <ul className="divide-y divide-beige-100">
            {order.items.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-center text-[13.5px]">
                <div>
                  <p className="font-medium text-forest-950">{item.productName}</p>
                  <p className="text-[12px] text-ink-500">
                    Grade: {item.gradeName || "Standard"} • Pack: {item.variantLabel}
                  </p>
                  <p className="text-[12px] text-ink-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold text-forest-900">
                  ₹{formatRupees(item.totalPaise)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-beige-200 pt-3 space-y-1.5 text-[13px]">
            <div className="flex justify-between text-ink-600">
              <span>Subtotal</span>
              <span>₹{formatRupees(order.subtotalPaise)}</span>
            </div>
            <div className="flex justify-between text-ink-600">
              <span>Delivery Charges</span>
              <span>
                {order.shippingPaise === 0 ? "Free" : `₹${formatRupees(order.shippingPaise)}`}
              </span>
            </div>
            <div className="flex justify-between font-serif text-[16px] font-bold text-forest-950 pt-2 border-t border-beige-100">
              <span>Total Amount</span>
              <span>₹{formatRupees(order.totalPaise)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="space-y-4">
          <div className="rounded border border-beige-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-3 text-forest-900">
              <MapPin className="h-4 w-4 text-gold-600" />
              <h2 className="font-serif text-[18px]">Delivery Address</h2>
            </div>
            <div className="text-[13px] leading-relaxed text-ink-700">
              <p className="font-semibold text-forest-950">{order.customerName}</p>
              <p>{order.addressLine1}</p>
              {order.addressLine2 && <p>{order.addressLine2}</p>}
              {order.landmark && <p className="text-ink-500">Landmark: {order.landmark}</p>}
              <p className="font-medium text-forest-900">
                {order.city}, {order.state} — {order.pincode}
              </p>
              <p className="mt-1 text-ink-500">Phone: {order.phone}</p>
            </div>
          </div>

          <div className="rounded border border-beige-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-3 text-forest-900">
              <CreditCard className="h-4 w-4 text-gold-600" />
              <h2 className="font-serif text-[18px]">Payment Information</h2>
            </div>
            <div className="space-y-1.5 text-[13px]">
              <div className="flex justify-between">
                <span className="text-ink-500">Method</span>
                <span className="font-medium text-forest-950 uppercase">
                  {order.paymentMethod === "cod" ? "Cash on Delivery (COD)" : order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Payment Status</span>
                <span
                  className={`font-semibold uppercase text-[12px] px-2 py-0.5 rounded ${
                    order.paymentStatus === "paid"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              {order.paymentMethod === "cod" && order.paymentStatus === "unpaid" && (
                <p className="mt-2 text-[12px] leading-relaxed text-ink-500 border-t border-beige-100 pt-2">
                  Payment of <strong>₹{formatRupees(order.totalPaise)}</strong> will be collected in cash by the courier upon delivery.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
