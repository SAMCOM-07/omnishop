// import "server-only";

import { ProductType } from "@/types/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { serializeData } from "./serialize";

// export const getProducts = async (c?: string): Promise<ProductType[]> => {
//   if (c) {
//     const productsRef = collection(db, "products");
//     const qRef = query(
//       productsRef,
//       where("category", "==", c.toLowerCase()),
//       orderBy("createdAt", "desc")
//     );
//     const querySnapshot = await getDocs(qRef);
//     const products = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as ProductType[];
//     return products;

//   } else {
//     const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
//     const querySnapshot = await getDocs(q);
//     const products = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as ProductType[];
//     return products;
//   }
// };

// export const getProducts = async (
//   c?: string,        // category
//   min?: number,      // min price
//   max?: number,      // max price
// ): Promise<ProductType[]> => {
//   const productsRef = collection(db, "products");

//   let q;

//   // CASE 1 — If there's category + price filters
//   if (c && (min || max)) {
//     const conditions = [
//       where("category", "==", c.toLowerCase()),
//       ...(min ? [where("price", ">=", min)] : []),
//       ...(max ? [where("price", "<=", max)] : []),
//     ];
//     q = query(productsRef, ...conditions, orderBy("createdAt", "desc"));
//   }

//   // CASE 2 — If only category
//   else if (c) {
//     q = query(
//       productsRef,
//       where("category", "==", c.toLowerCase()),
//       orderBy("createdAt", "desc")
//     );
//   }

//   // CASE 3 — If only price range
//   else if (min || max) {
//     const conditions = [
//       ...(min ? [where("price", ">=", min)] : []),
//       ...(max ? [where("price", "<=", max)] : []),
//     ];
//     q = query(productsRef, ...conditions, orderBy("createdAt", "desc"));
//   }

//   // CASE 4 — Default: return all products
//   else {
//     q = query(productsRef, orderBy("createdAt", "desc"));
//   }

//   const querySnapshot = await getDocs(q);
//   const products = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as ProductType[];

//   return products;
// };

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
