"use client";

import { useEffect, useRef, useState } from "react";
import { useCartContext, type CartItem } from "@/components/cart/cart-context";

type QuickAddItem = Omit<CartItem, "quantity">;

export function AddToCartButton({
  item,
  disabled,
  label = "Add to Cart",
  className,
  size,
}: {
  item: QuickAddItem;
  disabled?: boolean;
  label?: string;
  className?: string;
  size?: "sm";
}) {
  const { add } = useCartContext();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          add(item);
          setAdded(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setAdded(false), 2200);
        }}
        className={`${size === "sm" ? "btn-primary btn-sm" : "btn-primary"} ${className ?? ""}`}
        aria-label={`${label}: ${item.productName}, ${item.variantLabel}`}
      >
        {added ? "Added ✓" : label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {added ? `${item.productName} ${item.variantLabel} added to cart` : ""}
      </span>
    </>
  );
}
