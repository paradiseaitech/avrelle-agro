"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

/**
 * Client-side cart. Prices stored here are for display only — the server
 * recomputes every total from the database at checkout.
 */

export interface CartItem {
  variantId: string;
  productId: string;
  productSlug: string;
  productName: string;
  gradeName: string | null;
  variantLabel: string;
  unitPricePaise: number;
  image: string | null;
  quantity: number;
}

const STORAGE_KEY = "avrelle-cart-v1";
const MAX_QTY = 20;

let cacheItems: CartItem[] | null = null;
const listeners = new Set<() => void>();

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem =>
        typeof i?.variantId === "string" &&
        typeof i?.productName === "string" &&
        typeof i?.unitPricePaise === "number" &&
        Number.isInteger(i?.quantity) &&
        i.quantity > 0,
    );
  } catch {
    return [];
  }
}

function getItems(): CartItem[] {
  if (cacheItems === null) cacheItems = readStorage();
  return cacheItems;
}

function commit(items: CartItem[]) {
  cacheItems = items;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage full or blocked — cart still works in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Must be a stable reference — React warns (and can loop) if getServerSnapshot
// returns a fresh array on every call.
const EMPTY_ITEMS: CartItem[] = [];

function serverSnapshot(): CartItem[] {
  return EMPTY_ITEMS;
}

export const cartStore = {
  getItems,
  subscribe,
  add(item: Omit<CartItem, "quantity">, quantity = 1) {
    const items = [...getItems()];
    const existing = items.find((i) => i.variantId === item.variantId);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, MAX_QTY);
    } else {
      items.push({ ...item, quantity: Math.min(quantity, MAX_QTY) });
    }
    commit(items);
  },
  setQuantity(variantId: string, quantity: number) {
    let items = getItems();
    if (quantity < 1) {
      items = items.filter((i) => i.variantId !== variantId);
    } else {
      items = items.map((i) =>
        i.variantId === variantId ? { ...i, quantity: Math.min(quantity, MAX_QTY) } : i,
      );
    }
    commit(items);
  },
  remove(variantId: string) {
    commit(getItems().filter((i) => i.variantId !== variantId));
  },
  clear() {
    commit([]);
  },
};

export function useCart() {
  const items = useSyncExternalStore(subscribe, getItems, serverSnapshot);

  useEffect(() => {
    // Re-read after mount in case another tab changed the cart.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        cacheItems = readStorage();
        listeners.forEach((l) => l());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const subtotalPaise = useMemo(
    () => items.reduce((n, i) => n + i.unitPricePaise * i.quantity, 0),
    [items],
  );

  const add = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    cartStore.add(item, quantity);
  }, []);
  const setQuantity = useCallback((variantId: string, quantity: number) => {
    cartStore.setQuantity(variantId, quantity);
  }, []);
  const remove = useCallback((variantId: string) => cartStore.remove(variantId), []);
  const clear = useCallback(() => cartStore.clear(), []);

  return { items, count, subtotalPaise, add, setQuantity, remove, clear, MAX_QTY };
}

export type CartContextValue = ReturnType<typeof useCart>;
export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
