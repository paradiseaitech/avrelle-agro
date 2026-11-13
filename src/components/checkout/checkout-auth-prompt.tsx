"use client";

import { useState } from "react";
import { CustomerLoginForm } from "@/components/auth/customer-login-form";
import { CustomerSignupForm } from "@/components/auth/customer-signup-form";
import { useCartContext } from "@/components/cart/cart-context";
import { formatINR } from "@/lib/utils";
import { Lock, ShoppingBag, ShieldCheck } from "lucide-react";

export function CheckoutAuthPrompt() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const { items, subtotalPaise } = useCartContext();

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="mb-6 rounded-md border border-gold-400/40 bg-gold-50/50 p-4 text-[13.5px] leading-relaxed text-forest-950 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-gold-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-forest-900">
              Customer Authentication Required for Checkout
            </p>
            <p className="mt-0.5 text-ink-600">
              To secure your order, enable real-time tracking, and protect delivery details, please sign in or create an account. Your cart has been safely preserved.
            </p>
          </div>
        </div>

        <div className="border border-beige-200 bg-white p-6 sm:p-8 shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-beige-200 mb-6">
            <button
              type="button"
              onClick={() => setTab("signin")}
              className={`pb-3 px-4 text-[15px] font-medium border-b-2 transition-all ${
                tab === "signin"
                  ? "border-forest-800 text-forest-950 font-bold"
                  : "border-transparent text-ink-500 hover:text-forest-800"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`pb-3 px-4 text-[15px] font-medium border-b-2 transition-all ${
                tab === "signup"
                  ? "border-forest-800 text-forest-950 font-bold"
                  : "border-transparent text-ink-500 hover:text-forest-800"
              }`}
            >
              Create Account
            </button>
          </div>

          {tab === "signin" ? (
            <div>
              <p className="mb-5 text-[13px] text-ink-500">
                Already registered? Sign in with your email and password to proceed directly to checkout.
              </p>
              <CustomerLoginForm redirectUrl="/checkout" />
            </div>
          ) : (
            <div>
              <p className="mb-5 text-[13px] text-ink-500">
                New customer? Register in 30 seconds to proceed with your order.
              </p>
              <CustomerSignupForm redirectUrl="/checkout" />
            </div>
          )}
        </div>
      </div>

      {/* Cart Summary Sidebar */}
      <div>
        <div className="border border-beige-200 bg-white p-6">
          <div className="flex items-center gap-2 border-b border-beige-200 pb-3 text-forest-900">
            <ShoppingBag className="h-4 w-4 text-gold-600" />
            <h2 className="font-serif text-[18px]">Your Cart Summary</h2>
          </div>

          <div className="mt-4 divide-y divide-beige-100">
            {items.map((i) => (
              <div key={i.variantId} className="py-2.5 flex justify-between text-[13px]">
                <div>
                  <p className="font-medium text-forest-950">{i.productName}</p>
                  <p className="text-[11.5px] text-ink-500">
                    {i.variantLabel} × {i.quantity}
                  </p>
                </div>
                <span className="font-medium text-ink-900">
                  {formatINR(i.unitPricePaise * i.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-beige-200 pt-3 flex justify-between font-serif text-[16px] font-bold text-forest-950">
            <span>Subtotal</span>
            <span>{formatINR(subtotalPaise)}</span>
          </div>

          <p className="mt-3 text-[11.5px] leading-relaxed text-ink-500 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-gold-600 shrink-0" />
            Prices and delivery charges verified during checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
