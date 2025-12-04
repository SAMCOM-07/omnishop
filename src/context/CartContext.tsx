'use client'

import { CartContextType, CartProductType, ProductType } from "@/types/types"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"


const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [cartItems, setCartItems] = useState<CartProductType[]>([])

  // total quantity

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  //   // Add item to cart
  const addToCart = (product: ProductType) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    // console.log(cartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        // removeFromCart,
        // updateQuantity,
        totalQuantity,
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




// "use client";
// import { createContext, useContext, useState, useEffect, useCallback } from "react";
// import { db } from "@/lib/firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { useAuth } from "@/context/AuthContext"; // optional if you use Firebase Auth

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const { user } = useAuth() || {}; // handle if no AuthContext yet
//   const [isSyncing, setIsSyncing] = useState(false);

//   // Add item to cart
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // Update quantity
//   const updateQuantity = (productId, newQty) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === productId ? { ...item, quantity: newQty } : item
//       )
//     );
//   };

//   // Remove item
//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== productId));
//   };

//   // Total quantity for navbar badge
//   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   // 🧩 Sync cart to Firestore
//   const syncCartToFirestore = useCallback(async () => {
//     if (!user?.uid || isSyncing) return;
//     setIsSyncing(true);

//     try {
//       await setDoc(doc(db, "carts", user.uid), { items: cartItems });
//     } catch (err) {
//       console.error("Error syncing cart:", err);
//     } finally {
//       setIsSyncing(false);
//     }
//   }, [cartItems, user, isSyncing]);

//   // 🧠 Debounce sync (wait a bit after user stops clicking)
//   useEffect(() => {
//     if (!user?.uid) return;
//     const timeout = setTimeout(syncCartToFirestore, 1500); // sync 1.5s after last change
//     return () => clearTimeout(timeout);
//   }, [cartItems, user, syncCartToFirestore]);

//   // 🧩 Load cart from Firestore on login
//   useEffect(() => {
//     const loadCart = async () => {
//       if (!user?.uid) return;
//       try {
//         const docRef = doc(db, "carts", user.uid);
//         const snap = await getDoc(docRef);
//         if (snap.exists()) {
//           setCartItems(snap.data().items || []);
//         } else {
//           setCartItems([]);
//         }
//       } catch (err) {
//         console.error("Error loading cart:", err);
//       }
//     };

//     loadCart();
//   }, [user]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         totalQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);