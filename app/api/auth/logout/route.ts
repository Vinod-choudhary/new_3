import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("uid");
  return NextResponse.json({ ok: true, message: "Logged out" });
}
