import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password, role } = await req.json();

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ ok: false, error: "User already exists" }, { status: 400 });
    }

    // Create user
    const user = await User.create({ email, password, role });

    return NextResponse.json({ ok: true, user });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
