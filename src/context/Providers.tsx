"use client";

import { ReactNode } from "react";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
