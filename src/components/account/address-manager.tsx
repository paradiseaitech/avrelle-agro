"use client";

import { useActionState, useEffect, useState } from "react";
import {
  deleteCustomerAddressAction,
  saveCustomerAddressAction,
  setDefaultCustomerAddressAction,
  type AuthState,
} from "@/lib/actions/customer-auth";
import type { CustomerAddress } from "@/db/schema";
import { Check, Plus, Trash2, MapPin } from "lucide-react";

export function AddressManager({
  addresses,
}: {
  addresses: CustomerAddress[];
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(null);
  const [state, action, pending] = useActionState(saveCustomerAddressAction, {});
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (state?.ok) {
      setShowAddForm(false);
      setEditingAddress(null);
    }
  }, [state?.ok]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this delivery address?")) return;
    setIsDeleting(id);
    await deleteCustomerAddressAction(id);
    setIsDeleting(null);
  };

  const handleSetDefault = async (id: string) => {
    await setDefaultCustomerAddressAction(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-[20px] text-forest-900">Saved Delivery Addresses</h2>
          <p className="text-[13px] text-ink-500">
            Manage your shipping destinations for faster checkout.
          </p>
        </div>
        {!showAddForm && !editingAddress && (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="btn-primary btn-sm flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" /> Add New Address
          </button>
        )}
      </div>

      {(showAddForm || editingAddress) && (
        <div className="rounded border border-gold-500/30 bg-ivory-50/70 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-[18px] text-forest-900">
              {editingAddress ? "Edit Delivery Address" : "Add New Delivery Address"}
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingAddress(null);
              }}
              className="text-[12px] text-ink-500 hover:text-ink-800"
            >
              Cancel
            </button>
          </div>

          <form action={action} className="space-y-3.5">
            {editingAddress && <input type="hidden" name="id" value={editingAddress.id} />}

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="field-label">Recipient Name *</label>
                <input
                  name="name"
                  required
                  defaultValue={editingAddress?.name ?? ""}
                  placeholder="Full name"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label">Phone Number *</label>
                <input
                  name="phone"
                  required
                  type="tel"
                  defaultValue={editingAddress?.phone ?? ""}
                  placeholder="10-digit mobile"
                  className="field"
                />
              </div>
            </div>

            <div>
              <label className="field-label">Flat / House no. / Building / Street *</label>
              <input
                name="addressLine1"
                required
                defaultValue={editingAddress?.addressLine1 ?? ""}
                placeholder="Address line 1"
                className="field"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="field-label">Area / Sector / Village</label>
                <input
                  name="addressLine2"
                  defaultValue={editingAddress?.addressLine2 ?? ""}
                  placeholder="Address line 2 (optional)"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label">Landmark</label>
                <input
                  name="landmark"
                  defaultValue={editingAddress?.landmark ?? ""}
                  placeholder="Near temple / school (optional)"
                  className="field"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="field-label">City *</label>
                <input
                  name="city"
                  required
                  defaultValue={editingAddress?.city ?? ""}
                  placeholder="City"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label">State *</label>
                <input
                  name="state"
                  required
                  defaultValue={editingAddress?.state ?? ""}
                  placeholder="State"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label">PIN Code *</label>
                <input
                  name="pincode"
                  required
                  maxLength={6}
                  defaultValue={editingAddress?.pincode ?? ""}
                  placeholder="6-digit PIN code"
                  className="field"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2 text-[12.5px] text-ink-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="isDefault"
                  defaultChecked={editingAddress ? editingAddress.isDefault : addresses.length === 0}
                  className="rounded border-beige-300 text-forest-700 focus:ring-forest-600"
                />
                <span>Set as default delivery address</span>
              </label>
            </div>

            {state.error && <p className="text-[12.5px] text-danger-600">{state.error}</p>}

            <div className="flex gap-2 pt-2">
              <button type="submit" disabled={pending} className="btn-primary btn-sm">
                {pending ? "Saving address…" : editingAddress ? "Update Address" : "Save Address"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingAddress(null);
                }}
                className="btn-outline btn-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {addresses.length === 0 && !showAddForm && (
        <div className="rounded border border-dashed border-beige-300 p-8 text-center bg-ivory-50/50">
          <MapPin className="mx-auto h-8 w-8 text-ink-300" />
          <p className="mt-2 font-serif text-[16px] text-forest-900">No saved addresses yet</p>
          <p className="mt-1 text-[13px] text-ink-500">
            Save your delivery address for faster one-click checkout.
          </p>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="btn-primary btn-sm mt-4"
          >
            Add Delivery Address
          </button>
        </div>
      )}

      {addresses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`relative rounded border p-4.5 transition-all ${
                addr.isDefault
                  ? "border-forest-700 bg-forest-50/20 shadow-sm"
                  : "border-beige-200 bg-white hover:border-beige-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-forest-900">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="inline-flex items-center gap-1 rounded bg-forest-100 px-2 py-0.5 text-[10.5px] font-medium text-forest-800">
                        <Check className="h-3 w-3" /> Default
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[12.5px] text-ink-500">Phone: {addr.phone}</p>
                </div>
              </div>

              <div className="mt-3 text-[13px] leading-relaxed text-ink-700">
                <p>{addr.addressLine1}</p>
                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                {addr.landmark && <p className="text-ink-500">Landmark: {addr.landmark}</p>}
                <p className="font-medium text-forest-950">
                  {addr.city}, {addr.state} — {addr.pincode}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-beige-100 pt-3 text-[12px]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAddress(addr);
                      setShowAddForm(false);
                    }}
                    className="font-medium text-forest-700 hover:text-gold-700 underline"
                  >
                    Edit
                  </button>
                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-ink-600 hover:text-forest-800"
                    >
                      Make default
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  disabled={isDeleting === addr.id}
                  onClick={() => handleDelete(addr.id)}
                  className="text-ink-400 hover:text-danger-600"
                  aria-label="Delete address"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
