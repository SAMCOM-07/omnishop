'use client'

import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { CartContextType, CartProductType, ProductType } from "@/types/types"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [count, setCount] = useState(1);
  const { user } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);

  // Calculate total quantity and price
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product: ProductType) => {
    try {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + count }
              : item
          );
        } else {
          return [...prev, { ...product, quantity: count }];
        }
      });
      toast.success("Product Successfully Added !");
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };

  const increaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync to localStorage
      return updatedCart;
    });
  };

  // Save to localStorage when items change
  useEffect(() => {
    if (cartItems.length > 0 && !user?.uid) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Load cart from localStorage on initial load if user is not logged in
  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart && (!user || !user.uid)) {
      setCartItems(JSON.parse(localCart));
    }
  }, []);

  // Sync cart with Firestore when the user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (!user?.uid) {
        localStorage.removeItem("cart");
        return
      };


      try {
        const docRef = doc(db, "cart", user.uid);
        const snap = await getDoc(docRef);
        const localCart = JSON.parse(localStorage.getItem("cart") || '[]');

        if (snap.exists()) {
          const firestoreCart = snap.data()?.items || [];

          // Merge local cart into Firestore cart
          const mergedCart = firestoreCart.map((firestoreItem: CartProductType) => {
            const localItem = localCart.find((item: CartProductType) => item.id === firestoreItem.id);
            return localItem
              ? { ...firestoreItem, quantity: firestoreItem.quantity + localItem.quantity }
              : firestoreItem;
          });

          // Include items from local cart that are not in Firestore cart
          const itemsOnlyInLocal = localCart.filter(
            (localItem: CartProductType) => !firestoreCart.some((item: CartProductType) => item.id === localItem.id)
          );

          setCartItems([...mergedCart, ...itemsOnlyInLocal]);
        } else {
          // No Firestore cart, just use local cart
          setCartItems([]);
        }
      } catch (err) {
        console.error("Error loading cart from Firestore:", err);
      }

    };

    loadCart();
  }, [user]);

  // Sync cart to Firestore when user changes or cart items change
  const syncCartToFirestore = useCallback(async () => {
    if (!user?.uid || isSyncing) return;
    setIsSyncing(true);

    try {
      await setDoc(doc(db, "cart", user.uid), { items: cartItems });
    } catch (err) {
      console.error("Error syncing cart to Firestore:", err);
    } finally {
      setIsSyncing(false);
    }
  }, [cartItems, user, isSyncing]);

  // Debounce sync (wait a bit after user stops modifying the cart)
  useEffect(() => {
    if (!user?.uid) return;

    const timeout = setTimeout(syncCartToFirestore, 1000);
    return () => clearTimeout(timeout);
  }, [cartItems, user, syncCartToFirestore]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalQuantity,
        setCount,
        count,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
