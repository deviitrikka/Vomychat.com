"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [errors, setErrors] = useState([]); // Store validation errors
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        if (data.errors) {
          // If backend validation errors exist, store them in state
          setErrors(data.errors);
        } else {
          // If it's a different error (like duplicate email), show it
          setErrors([{ msg: data.message }]);
        }
        return;
      }
      localStorage.setItem("token", data.token);
      // Success - Redirect to login
      alert("✅ Registration Successful! Redirecting...");
      router.push("/?loggedIn=true");

    } catch (err) {
      setLoading(false);
      setErrors([{ msg: "Something went wrong! Please try again." }]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Join Linktree</h2>
        <h2 className="text-1xl  mb-6 text-center">Sign up for free</h2>

        {/* Show validation errors */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
            {errors.map((error, index) => (
              <p key={index}>⚠️ {error.msg}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 border rounded-lg"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="referralCode"
            placeholder="Referral Code (Optional)"
            className="w-full p-3 border rounded-lg"
            value={formData.referralCode}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-800"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
