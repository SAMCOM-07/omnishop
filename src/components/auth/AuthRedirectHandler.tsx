"use client";

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setAuthCookie } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          await setAuthCookie();
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Redirect login error:", error);
      });
  }, [router]);

  return null; // no UI
}
