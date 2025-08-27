"use client";

import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState<"customer" | "technician">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);

  async function signup() {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await res.json();
    if (data.ok) setMessage("Signup successful ✅");
    else setMessage(data.error || "Signup failed ❌");
  }

  async function login() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.ok) {
      setMessage("Login successful ✅");
      setUser(data.user);
    } else {
      setMessage(data.error || "Login failed ❌");
    }
  }

  async function logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    const data = await res.json();
    setMessage(data.message || "Logged out");
    setUser(null);
  }

  async function fetchMe() {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (data.ok) setUser(data.user);
    else setMessage(data.error || "Not authenticated");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Bank Login</h1>

        {/* Role Selector */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setRole("customer")}
            className={`px-4 py-2 rounded-lg ${
              role === "customer" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setRole("technician")}
            className={`px-4 py-2 rounded-lg ${
              role === "technician" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Technician
          </button>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Actions */}
        <div className="flex justify-between gap-2">
          <button
            onClick={signup}
            className="flex-1 bg-green-500 text-white rounded-lg py-2"
          >
            Sign Up
          </button>
          <button
            onClick={login}
            className="flex-1 bg-blue-500 text-white rounded-lg py-2"
          >
            Login
          </button>
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={fetchMe}
            className="flex-1 bg-gray-300 rounded-lg py-2"
          >
            Who Am I?
          </button>
          <button
            onClick={logout}
            className="flex-1 bg-red-500 text-white rounded-lg py-2"
          >
            Logout
          </button>
        </div>

        {/* Status */}
        {message && <p className="text-center text-gray-600">{message}</p>}

        {/* User info */}
        {user && (
          <div className="bg-gray-100 rounded-lg p-4 mt-4 text-sm">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
