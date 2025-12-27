'use client'

import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { CartContextType, CartProductType, ProductType } from "@/types/types"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";


const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [cartItems, setCartItems] = useState<CartProductType[]>([])
  const [count, setCount] = useState(1);

  const { user } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);


  // total quantity
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //   // Add item to cart
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
      toast.error("Something went wrong !")
    }
  };

  // increase quantity
  const increaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // decrease quantity
  const decreaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };


  // Remove item
  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  //save to localstorage before syncing (or while no user yet)

  useEffect(() => {
    cartItems.length > 0 && localStorage.setItem("cart", JSON.stringify(cartItems));
    if (cartItems.length === 0) {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);


  // Load from localstorage on initial load
  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart && (!user || !user.uid)) setCartItems(JSON.parse(localCart));
  }, []);


  // 🧩 Sync cart to Firestore
  const syncCartToFirestore = useCallback(async () => {
    if (!user?.uid || isSyncing) return;
    setIsSyncing(true);

    try {
      await setDoc(doc(db, "cart", user?.uid), { items: cartItems });
    } catch (err) {
      console.error("Error syncing cart:", err);
    } finally {
      setIsSyncing(false);
    }
  }, [cartItems, user, isSyncing]);

  // 🧠 Debounce sync (wait a bit after user stops clicking)
  useEffect(() => {
    if (!user?.uid) return;
    const timeout = setTimeout(syncCartToFirestore, 1000); // sync 1s after last change
    return () => clearTimeout(timeout);
  }, [cartItems, user, syncCartToFirestore]);

  // 🧩 Load cart from Firestore on login
  useEffect(() => {
    const loadCart = async () => {
      if (!user?.uid) return;
      try {
        const docRef = doc(db, "cart", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) setCartItems(snap.data()?.items);

      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };

    loadCart();
  }, [user]);


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