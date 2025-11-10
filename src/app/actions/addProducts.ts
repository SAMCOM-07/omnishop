"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function addProductAction(productData: any) {
  try {
    await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: new Date(),
    });
    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Add product error:", error);
    return { success: false, error: "Failed to add product" };
  }
}
