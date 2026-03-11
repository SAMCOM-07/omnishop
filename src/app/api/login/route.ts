import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  const { token } = await req.json();

  // Verify ID token
  const decoded = await adminAuth.verifyIdToken(token);

    // Create SESSION COOKIE
  const sessionCookie = await adminAuth.createSessionCookie(token, {
    expiresIn: 1000 * 60 * 60 * 24 * 5, // 5 days
  });

  const res = NextResponse.json({ success: true });

  // Set secure HTTP-only cookie
  res.cookies.set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 5,
  });

  return res;
}
