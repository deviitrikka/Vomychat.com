"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const searchParams = useSearchParams();
    const loggedInQuery = searchParams.get("loggedIn");

    const [referralStats, setReferralStats] = useState(null);
    const [referredUsers, setReferredUsers] = useState([]);
    const [loadingStats, setLoadingStats] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        checkAuthStatus();

        if (loggedInQuery) {
            window.history.replaceState(null, "", "/");
            window.location.reload();
        }

        window.addEventListener("storage", checkAuthStatus);
        return () => window.removeEventListener("storage", checkAuthStatus);
    }, [loggedInQuery]);

    // ✅ Fetch Referral Stats
    const fetchReferralStats = async () => {
        setLoadingStats(true);
        try {
            const response = await fetch("http://localhost:5000/api/referrals/referral-stats", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) throw new Error("No stats yet!");

            const data = await response.json();
            setReferralStats(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingStats(false);
        }
    };

    // ✅ Fetch Referred Users
    const fetchReferrals = async () => {
        setLoadingUsers(true);
        try {
            const response = await fetch("http://localhost:5000/api/referrals/referrals", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) throw new Error("No Referrals yet!");

            const data = await response.json();
            setReferredUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingUsers(false);
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
                        share everything you create, curate, and sell from your social media profiles.
                    </p>

                    {/* ✅ Show Buttons for Logged-in Users */}
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
                                onClick={() => router.push("/signup")}
                                className="bg-pink-300 rounded-full px-4 py-4 font-semibold"
                            >
                                Claim your Bittree
                            </button>
                        </div>
                    )}

                    {/* ✅ Show Referral Stats */}
                    {loadingStats && <p className="text-yellow-300 mt-3">Loading Referral Stats...</p>}
                    {referralStats && (
                        <div className="bg-gray-200 p-4 rounded-md mt-3">
                            <h3 className="text-lg font-semibold">Referral Stats:</h3>
                            <p>Total Referrals: {referralStats.totalReferrals}</p>
                        </div>
                    )}

                    {/* ✅ Show Referred Users */}
                    {loadingUsers && <p className="text-yellow-300 mt-3">Loading Referred Users...</p>}
                    {referredUsers.length > 0 && (
                        <div className="bg-gray-200 p-4 rounded-md mt-3">
                            <h3 className="text-lg font-semibold">Referred Users:</h3>
                            <ul className="list-disc pl-4">
                                {referredUsers.map(user => (
                                    <li key={user._id} className="mt-1">
                                        {user.username} ({user.email})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* ✅ Show Error Message if Fetch Fails */}
                    {error && <p className="text-red-500 mt-3">{error}</p>}
                </div>

                <div className="flex items-center justify-center flex-col mr-[10vw]">
                    <img src="/home.png" alt="homepage image" />
                </div>
            </section>
        </main>
    );
}
