import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function proxy(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  // Not logged in
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie);

    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/checkout/:path*", "/orders/:path*", "/completed/:path*"], 
};