"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
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
    setErrors([]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
          // If it's a different error (like invalid credentials), show it
          setErrors([{ msg: data.message }]);
        }
        return;
      }

      // Store JWT token in localStorage (or secure HTTP-only cookie)
      localStorage.setItem("token", data.token);

      // Redirect to dashboard after successful login
      alert("✅ Login Successful! Redirecting to dashboard...");
      router.push("/?loggedIn=true");

    } catch (err) {
      setLoading(false);
      setErrors([{ msg: "Something went wrong! Please try again." }]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome back!</h2>
        <h3 className="text-1xl mb-6 text-center">Login in to your Linktree</h3>

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
            name="emailOrUsername"
            placeholder="Email or Username"
            className="w-full p-3 border rounded-lg"
            value={formData.emailOrUsername}
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

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-800"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <p className="mt-3 text-center">
          <Link href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </p>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
