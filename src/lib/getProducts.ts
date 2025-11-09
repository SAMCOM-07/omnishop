import "server-only";

import { ProductType } from "@/types/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const getProducts = async (): Promise<ProductType[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];

  return products;
};

export const getProductsById = async ({
  params,
}: {
  params: { productId: string };
}): Promise<ProductType | null> => {
  const { productId } = params;
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];
  const product = products.find((product) => product.id === productId) || null;
  return product;
};
