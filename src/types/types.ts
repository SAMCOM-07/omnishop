import { Timestamp } from "firebase/firestore";

export type ProductType = {
  id?: string; // optional Firestore document ID
  name: string;
  description: string;
  category: string;
  availability: "in stock" | "out of stock" | string;
  price: number;
  discount: number;
  discountedAmount: number;
  tax: number;
  unit: number;
  rating: number;
  shippingInfo: string;
  tags: string[];
  createdAt?: Date | string | Timestamp; // Firestore timestamp or ISO string

  images: {
    publicId: string;
    url: string;
  }[];

  reviews: {
    userId?: string;
    username?: string;
    rating: number;
    comment?: string;
    createdAt?: Date | string;
  }[];
};

export type CartProductType = ProductType & { quantity: number };

export type ProductContextType = {
  products: ProductType[];
  loading: boolean;
  error: string;
};

export type CartContextType = {
  cartItems: CartProductType[] | null;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  totalQuantity: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
};

export function getCreatedAtSeconds(
  createdAt?: Date | string | Timestamp
): number {
  if (createdAt instanceof Timestamp) return createdAt.seconds;
  if (createdAt instanceof Date) return createdAt.getTime() / 1000;
  if (typeof createdAt === "string")
    return new Date(createdAt).getTime() / 1000;
  return 0;
}
