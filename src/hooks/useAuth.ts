"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfileDetails } from "@/lib/getProfileDetails";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [profileDetails, setProfileDetails] = useState<any>(null);

  useEffect(() => {
    async function getDetails() {
      const details = await getUserProfileDetails(user!.uid);
      setProfileDetails(details);
      setLoadingUser(false);
      // await user?.getIdToken(true);
    }
    if (!user) return;
    getDetails();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingUser(false);
      // console.log(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, loadingUser, isLoggedIn: !!user, profileDetails };
}
