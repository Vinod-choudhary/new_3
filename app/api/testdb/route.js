// app/api/testdb/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  await connectToDatabase();
  return NextResponse.json({ message: "Database connection successful ✅" });
}
