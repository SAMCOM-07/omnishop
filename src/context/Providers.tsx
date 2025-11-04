"use client";

import { ReactNode } from "react";
import { ProductProvider } from "./ProductContext";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ProductProvider>
            {children}
        </ProductProvider>
    );
}
