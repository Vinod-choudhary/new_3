// app/api/test-connection/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 }); // Quick test
    return Response.json({ message: "Database connection successful ✅" });
  } catch (error) {
    return Response.json({ message: "Database connection failed ❌", error: error.message });
  }
}
