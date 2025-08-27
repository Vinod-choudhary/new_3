import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Make sure your .env.local has this

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    try {
      const client = await MongoClient.connect(uri);
      const db = client.db("yourDB"); // Replace with your DB name
      const users = db.collection("users");

      // Check if user already exists
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        client.close();
        return res.status(409).json({ message: "User already exists" });
      }

      // Save user (password should be hashed in production)
      await users.insertOne({
        email,
        password, // ⚠️ In real apps, use bcrypt.hash(password)
        createdAt: new Date(),
      });

      client.close();
      res.status(200).json({ message: "User saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
