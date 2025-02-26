"use client";
import React, { useState, useEffect } from "react"; // ✅ Added useEffect
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Corrected authentication check
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!!token); // ✅ Correctly sets state
  }, []);

  const createTree = () => {
    router.push(`/generate?handle=${text}`);
  };

  const fetchReferralStats = async () => {
    try {
      const response = await fetch("/api/referral-stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      console.log("Referral Stats:", data);
    } catch (error) {
      console.error("Error fetching referral stats:", error);
    }
  };

  const fetchReferrals = async () => {
    try {
      const response = await fetch("/api/referrals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      console.log("Referred Users:", data);
    } catch (error) {
      console.error("Error fetching referred users:", error);
    }
  };

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-yellow-300 font-bold text-7xl">Everything you </p>
          <p className="text-yellow-300 font-bold text-7xl">are. In one,</p>
          <p className="text-yellow-300 font-bold text-7xl">simple link in bio.</p>
          <p className="text-yellow-300 text-xl my-4">
            Join 50M+ people using Linktree for their link in bio. One link to help you
            share everything you create, curate and sell from your social media profiles.
          </p>

          {isLoggedIn ? (
            <div className="flex gap-3">
              <button
                onClick={fetchReferralStats}
                className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600"
              >
                Get Referral Stats
              </button>
              <button
                onClick={fetchReferrals}
                className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600"
              >
                View Referred Users
              </button>
            </div>
          ) : (
            <div className="input flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="px-2 py-2 focus:outline-green-800 rounded-md"
                type="text"
                placeholder="Enter your Handle"
              />
              <button
                onClick={createTree}
                className="bg-pink-300 rounded-full px-4 py-4 font-semibold"
              >
                Claim your Bittree
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center flex-col mr-[10vw]">
          <img src="/home.png" alt="homepage image" />
        </div>
      </section>
      <section className="bg-red-700 min-h-[100vh]"></section>
    </main>
  );
}
