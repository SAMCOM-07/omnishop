import { ProductType } from "@/types/types";

export function serializeData(data: ProductType | ProductType[]) {
  return JSON.parse(
    JSON.stringify(data, (_, value) => {
      // Convert Firestore Timestamps to ISO strings
      if (value?.seconds !== undefined && value?.nanoseconds !== undefined) {
        return new Date(value.seconds * 1000 + value.nanoseconds / 1e6).toISOString();
      }

      // Convert any other non-serializable values if needed
      return value;
    })
  );
}
