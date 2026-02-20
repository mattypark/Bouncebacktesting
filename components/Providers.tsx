"use client";

import type { ReactNode } from "react";
import { TransitionProvider } from "./TransitionContext";
import { CartProvider } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TransitionProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </TransitionProvider>
  );
}
