import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function GET() {
  const uid = cookies().get("uid")?.value;
  if (!uid) return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  await dbConnect();
  const user = await User.findOne({ idHex: uid }, { data: 1, idHex: 1 }).lean();
  if (!user) return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });
  return NextResponse.json({ ok: true, data: user.data || {} });
}

export async function POST(req: Request) {
  const uid = cookies().get("uid")?.value;
  if (!uid) return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });

  const payload = await req.json().catch(() => ({}));

  await dbConnect();
  const user = await User.findOneAndUpdate(
    { idHex: uid },
    { $set: { data: payload } },
    { new: true, upsert: false }
  ).lean();

  if (!user) return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });
  return NextResponse.json({ ok: true, data: user.data || {} });
}