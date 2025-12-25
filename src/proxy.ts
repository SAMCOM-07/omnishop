import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  user_id: string;
};

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // ❌ Not logged in → block ALL protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let uid: string;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    uid = decoded.user_id;
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔒 ONLY protect admin routes with role check
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const roleRes = await fetch(
      `${req.nextUrl.origin}/api/check-role?uid=${uid}`,
      { cache: "no-store" }
    );

    if (!roleRes.ok) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const data = await roleRes.json();

    if (data.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/cart/:path*"],
};
