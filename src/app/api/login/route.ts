// // import { NextResponse } from "next/server";
// // import { getAuth } from "firebase-admin/auth";
// // import { adminAuth } from "@/lib/firebase-admin";

// // export async function POST(req: Request) {
// //   const { token } = await req.json();

// //   const decoded = await adminAuth.verifyIdToken(token);

// //   const res = NextResponse.json({ success: true });

// //   res.cookies.set("token", token, {
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === "production",
// //     sameSite: "lax",
// //     path: "/",
// //   });

// //   return res;
// // }

// import { NextResponse } from "next/server";
// import { adminAuth } from "@/lib/firebase-admin";

// export async function POST(req: Request) {
//   const { token } = await req.json();

  
//   // 1️⃣ Verify ID token
//   const decoded = await adminAuth.verifyIdToken(token);
  

//   // // 2️⃣ OPTIONAL: Check role here (recommended)
//   // if (decoded.role !== "admin") {
//   //   return NextResponse.json({ error: "Not an admin" }, { status: 403 });
//   // } 
 

//   // 3️⃣ Create SESSION COOKIE (VERY IMPORTANT)
//   const sessionCookie = await adminAuth.createSessionCookie(token, {
//     expiresIn: 1000 * 60 * 60 * 24 * 5, // 5 days
//   });

//   const res = NextResponse.json({ success: true });

//   // 4️⃣ Set secure HTTP-only cookie
//   res.cookies.set("session", sessionCookie, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 5,
//   });

//   console.log("Session cookie set successfully");
//   console.log("Decoded token:", decoded);
  
//   return res;
// }


import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  const { token } = await req.json();

  // Verify ID token
  const decoded = await adminAuth.verifyIdToken(token);

  // Optional: You can log 'decoded' to explore its structure
  console.log("Decoded token:", decoded.role);
  

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
