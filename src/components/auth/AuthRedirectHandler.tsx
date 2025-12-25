"use client";

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          const token = await result.user.getIdToken();
          await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Redirect login error:", error);
      });
  }, [router]);

  return null; // no UI
}
