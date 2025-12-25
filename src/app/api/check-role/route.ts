import { NextResponse } from "next/server";
import { getUserRole } from "@/lib/getUserRole";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  if (!uid) return NextResponse.json({ role: null });

  const role = await getUserRole(uid);
  return NextResponse.json({ role });
}
