// import "server-only";

import { ProductType } from "@/types/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";
import { serializeData } from "./serialize";

// get all products
export const getAllProducts = async () => {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(
    query(productsRef, orderBy("createdAt", "desc"))
  );

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];

  return serializeData(products);
};

// get products by category
export const getProductsByCategory = async (c: string) => {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(
    query(productsRef, orderBy("createdAt", "desc"))
  );

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];

  const products = data.filter(
    (product) => product.category.toLowerCase() === c.toLowerCase()
  );

  return serializeData(products);
};

// get product by price range
export const getProductsByPriceRange = async (min: string, max: string) => {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(
    query(productsRef, orderBy("createdAt", "desc"))
  );

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];

  const products = data.filter((product) => {
    const effectivePrice = product.discountedAmount ?? product.price;
    return effectivePrice >= Number(min) && effectivePrice <= Number(max);
  });

  return serializeData(products);
};

// get product by price range and category
export const getProductsByCategoryAndPriceRange = async (
  c: string,
  min: string,
  max: string
) => {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(
    query(productsRef, orderBy("createdAt", "desc"))
  );

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];

  const products = data.filter((product) => {
    const effectivePrice = product.discountedAmount ?? product.price;
    return (
      product.category?.toLowerCase() === c?.toLowerCase() &&
      effectivePrice >= Number(min) &&
      effectivePrice <= Number(max)
    );
  });

  return serializeData(products);
};

// search query fetch
export const getProductsBySearch = async (
  q: string
): Promise<ProductType[]> => {
  const qq = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(qq);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];
  const products = data.filter((p) =>
    p.name?.toLowerCase().includes(q.toLowerCase())
  );
  return serializeData(products);
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
  const product = { id: snapshot.id, ...snapshot.data() } as ProductType;
  return serializeData(product);
}

export async function getRelatedProducts(category: string, productId: string) {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];
  const relatedProducts = products.filter(
    (product) => product.category === category && product.id !== productId
  );
  return serializeData(relatedProducts);
}
