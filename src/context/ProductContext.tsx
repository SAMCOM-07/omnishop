"use client";

import { db } from "@/lib/firebase";
import { getCreatedAtSeconds, ProductContextType, ProductType } from "@/types/types";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, ReactNode, useEffect, useState } from "react";

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {

  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getDocs(collection(db, 'products'));
        const data: ProductType[] = response.docs.map(doc => ({
          ...doc.data() as Omit<ProductType, 'id'>, // Type assertion
          id: doc.id

        }));
        const sortedProducts = data.sort(
          (a, b) => getCreatedAtSeconds(b.createdAt) - getCreatedAtSeconds(a.createdAt)
        );

        setProducts(sortedProducts)
      } catch (error: any) {
        console.log(error.message)

      } finally {

      }
    }
    fetchProducts();
  }, [products])

  return (
    <ProductContext.Provider
      value={{
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
