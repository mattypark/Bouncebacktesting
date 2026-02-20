"use client";

import { useCart } from "./CartContext";

/*
  Cart icon button used in navigation bars.
  Shows a badge with item count when cart is non-empty.
  Color adapts via the `color` prop.
*/

export default function CartIcon({ color = "#084734" }: { color?: string }) {
  const { toggleCart, totalItems } = useCart();

  return (
    <button
      onClick={toggleCart}
      aria-label="Open cart"
      className="relative z-[60] flex h-7 w-7 items-center justify-center"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-bb-lime text-[9px] font-bold text-bb-deep">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}
