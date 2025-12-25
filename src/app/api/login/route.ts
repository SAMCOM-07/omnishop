import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  const { token } = await req.json();

  const decoded = await adminAuth.verifyIdToken(token);

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
