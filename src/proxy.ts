// import { NextRequest, NextResponse } from "next/server";
// import { adminAuth } from "@/lib/firebase-admin";

// export async function proxy(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   // Not logged in
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const decoded = await adminAuth.verifyIdToken(token);

//     const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

//     if (isAdminRoute && decoded.role !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return NextResponse.next();
//   } catch {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*", "/cart/:path*"],
// };




















// // import { NextRequest, NextResponse } from "next/server";
// // import { jwtDecode } from "jwt-decode";

// // type TokenPayload = {
// //   user_id: string;
// // };

// // export async function proxy(req: NextRequest) {
// //   const token = req.cookies.get("token")?.value;

// //   // ❌ Not logged in → block ALL protected routes
// //   if (!token) {
// //     return NextResponse.redirect(new URL("/login", req.url));
// //   }

// //   let uid: string;

// //   try {
// //     const decoded = jwtDecode<TokenPayload>(token);
// //     uid = decoded.user_id;
// //   } catch {
// //     return NextResponse.redirect(new URL("/login", req.url));
// //   }

// //   // 🔒 ONLY protect admin routes with role check
// //   if (req.nextUrl.pathname.startsWith("/admin")) {
// //     const roleRes = await fetch(
// //       `${req.nextUrl.origin}/api/check-role?uid=${uid}`,
// //       { cache: "no-store" }
// //     );

// //     if (!roleRes.ok) {
// //       return NextResponse.redirect(new URL("/", req.url));
// //     }

// //     const data = await roleRes.json();

// //     if (data.role !== "admin") return NextResponse.redirect(new URL("/", req.url));
// //     return

// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ["/admin/:path*"],
// // };

// // // import { NextRequest, NextResponse } from "next/server";
// // // import { adminAuth } from "@/lib/firebase-admin";

// // // export async function proxy(req: NextRequest) {
// // //   const session = req.cookies.get("session")?.value;

// // //   if (!session) {
// // //     return NextResponse.redirect(new URL("/login", req.url));
// // //   }

// // //   try {
// // //     const decoded = await adminAuth.verifySessionCookie(session, true);

// // //     if (decoded.role !== "admin") {
// // //       return NextResponse.redirect(new URL("/", req.url));
// // //     }

// // //     console.log('ROLE = '+decoded.role)
// // //     return NextResponse.next();
// // //   } catch {
// // //     return NextResponse.redirect(new URL("/login", req.url));
// // //   }
// // // }

// // // export const config = {
// // //   matcher: ["/admin/:path*"],
// // // };



import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function proxy(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value; // Use session cookie instead

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
  matcher: ["/admin/:path*", "/cart/:path*"],
};
