import "server-only";

import { ProductType } from "@/types/types";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export const getProducts = async (): Promise<ProductType[]> => {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];

  return products;
};

// export const getProductById = async (productId: string) => {
//   const snapshot = await getDocs(collection(db, "products"));
//   const products = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as ProductType[];
//   const product = products.find((product) => product.id === productId) || null;
//   return product;
// };

export async function getProductById(productId: string) {
  const ref = doc(db, "products", productId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  const product =  {id: snapshot.id, ...snapshot.data()} as ProductType;
  return product;
}

export async function getRelatedProducts(category: string, productId: string) {
  const q = query(
    collection(db, "products"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductType[];
  const relatedProducts = products.filter(
    (product) => product.category === category && product.id !== productId
  );
  return relatedProducts;
}
