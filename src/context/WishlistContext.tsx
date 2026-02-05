'use client';

import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { WishlistContextType, WishlistProductType, ProductType } from "@/types/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistProductType[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const { user } = useAuth();

  /* ---------------- ADD ---------------- */
  const addToWishlist = (product: ProductType) => {
    try {
      setWishlistItems((prev) => {
        if (prev.some((item) => item.id === product.id)) return prev;
        return [...prev, product] as WishlistProductType[];
      });
      toast.success("Added to wishlist");
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };

  /* ---------------- REMOVE ---------------- */
  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== productId)
    );
    toast.info("Removed from wishlist");
  };



  /* ---------------- LOCAL STORAGE (GUEST) ---------------- */
  useEffect(() => {
    if (!user?.uid && wishlistItems.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  /* ---------------- LOAD LOCAL (INITIAL) ---------------- */
  useEffect(() => {
    try {
      const local = localStorage.getItem("wishlist");
      if (local && (!user || !user.uid)) setWishlistItems(JSON.parse(local));
    } catch (err) {
      console.error("Failed to load wishlist", err);
    } finally {
      setLoadingWishlist(false);
    }
  }, []);

  /* ---------------- LOAD FIRESTORE (ON LOGIN) ---------------- */
  useEffect(() => {
    if (!user?.uid) {
      localStorage.removeItem("wishlist");
      return
    };

    const loadWishlist = async () => {
      try {
        const ref = doc(db, "wishlist", user.uid);
        const snap = await getDoc(ref);
        const local = JSON.parse(localStorage.getItem("wishlist") || "[]");

        if (snap.exists()) {
          const firestoreItems = snap.data().items || [];

          // Merge without duplicates
          const merged = [
            ...firestoreItems,
            ...local.filter(
              (l: ProductType) =>
                !firestoreItems.some((f: ProductType) => f.id === l.id)
            ),
          ];

          setWishlistItems(merged);
        } else {
          setWishlistItems(local);
        }
      } catch (err) {
        console.error("Error loading wishlist", err);
      } finally {
        setLoadingWishlist(false);
      }
    };

    loadWishlist();
  }, [user]);

  /* ---------------- SYNC TO FIRESTORE ---------------- */
  const syncToFirestore = useCallback(async () => {
    if (!user?.uid || isSyncing) return;

    setIsSyncing(true);
    try {
      await setDoc(doc(db, "wishlist", user.uid), {
        items: wishlistItems,
      });
    } catch (err) {
      console.error("Wishlist sync failed", err);
    } finally {
      setIsSyncing(false);
    }
  }, [wishlistItems, user, isSyncing]);

  useEffect(() => {
    if (!user?.uid) return;
    const t = setTimeout(syncToFirestore, 1000);
    return () => clearTimeout(t);
  }, [wishlistItems, syncToFirestore, user]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        loadingWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
