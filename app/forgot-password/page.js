"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ForgotPassword = () => {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://linktreeclone-backend-production-ad40.up.railway.app/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) throw new Error(data.message);

      setMessage("✅ Check your email for the password reset link!");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      {/* Linktree Logo */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          Linktree<span className="text-green-500">✳️</span>
        </h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-black mb-2">Reset your password</h2>
        <p className="text-gray-600 mb-4">
          If you signed up with an email and password, reset your password below.
        </p>
        

        {/* Show Success or Error Messages */}
        {message && <p className="text-green-600 bg-green-100 p-3 rounded">{message}</p>}
        {error && <p className="text-red-600 bg-red-100 p-3 rounded">{error}</p>}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username or email"
            className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`w-full p-3 rounded-full font-bold ${
              emailOrUsername
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!emailOrUsername || loading}
          >
            {loading ? "Processing..." : "Reset password"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="mt-6 text-center">
          <Link href="/login" className="text-purple-600 hover:underline flex items-center justify-center">
            ↩️ Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
