"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter,useSearchParams } from "next/navigation";

const NavbarComponent = () => {
    const pathname = usePathname();
    const router = useRouter();
    const showNavbar = ["/", "/generate", "/login", "/signup","/profile"].includes(pathname);

    // 🔹 State for authentication check
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const searchParams = useSearchParams(); //*
    // const [isPageReloaded, setIsPageReloaded] = useState(false); 

    // 🔹 Check if user is logged in
    const loggedInQuery = searchParams.get("loggedIn"); // ✅ Check if user was just redirected after login

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token); // Convert token presence to boolean
        };

        checkAuthStatus(); // ✅ Run when component loads

        // ✅ If user was just logged in, refresh page ONCE
        if (loggedInQuery) {
            window.history.replaceState(null, "", "/"); // Remove `?loggedIn=true` from URL
            window.location.reload(); // 🔄 Force a single refresh
        }

        // ✅ Listen for login/logout changes across browser tabs
        window.addEventListener("storage", checkAuthStatus);

        return () => window.removeEventListener("storage", checkAuthStatus);
    }, [loggedInQuery]);

    // 🔹 Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false); // ✅ Update state immediately
        router.push("/");
        window.location.reload(); // 🔄 Refresh the page
        // Notify other tabs about logout
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <>
            {showNavbar && (
                <nav className="bg-white w-full fixed top-0 z-50 shadow-md">
                    <div className="container mx-auto flex justify-between items-center px-6 py-4">
                        {/* Logo */}
                        <div className="min-h-[50px] min-w-[150px] flex items-center">
                            <Link href="/">
                                <h1 className="text-2xl font-bold">Linktree<span className="text-green-500">✳️</span></h1>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex gap-6">
                            <Link href="/"><li className="hover:text-gray-500 cursor-pointer">Templates</li></Link>
                            <Link href="/"><li className="hover:text-gray-500 cursor-pointer">Marketplace</li></Link>
                            <Link href="/"><li className="hover:text-gray-500 cursor-pointer">Discover</li></Link>
                            <Link href="/"><li className="hover:text-gray-500 cursor-pointer">Pricing</li></Link>
                            <Link href="/"><li className="hover:text-gray-500 cursor-pointer">Learn</li></Link>
                        </ul>

                        {/* 🔹 Buttons (Login/Logout) */}
                        <div className="hidden md:flex gap-3">
                            {isLoggedIn ? (
                                <button
                                    className="bg-red-500 text-white p-3 rounded-lg font-bold hover:bg-red-700"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="login bg-gray-400 p-3 rounded-lg font-bold hover:bg-gray-500"
                                        onClick={() => router.push('/login')}
                                    >
                                        Log in
                                    </button>
                                    <button
                                        className="signup bg-gray-900 text-white font-bold p-3 rounded-full hover:bg-gray-700"
                                        onClick={() => router.push('/signup')}
                                    >
                                        Sign up free
                                    </button>
                                </>
                            )}
                        </div>

                        {/* 🔹 Mobile Menu Button */}
                        <button
                            className="md:hidden focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* 🔹 Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden bg-white absolute top-16 left-0 w-full flex flex-col items-center space-y-4 py-6 shadow-lg">
                            <Link href="/" className="hover:text-gray-500">Templates</Link>
                            <Link href="/" className="hover:text-gray-500">Marketplace</Link>
                            <Link href="/" className="hover:text-gray-500">Discover</Link>
                            <Link href="/" className="hover:text-gray-500">Pricing</Link>
                            <Link href="/" className="hover:text-gray-500">Learn</Link>

                            {isLoggedIn ? (
                                <button
                                    className="bg-red-500 text-white p-3 rounded-lg font-bold hover:bg-red-700 w-3/4"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="login bg-gray-400 p-3 rounded-lg font-bold hover:bg-gray-500 w-3/4"
                                        onClick={() => router.push('/login')}
                                    >
                                        Log in
                                    </button>
                                    <button
                                        className="signup bg-gray-900 text-white font-bold p-3 rounded-full hover:bg-gray-700 w-3/4"
                                        onClick={() => router.push('/signup')}
                                    >
                                        Sign up free
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </nav>
            )}
        </>
    );
}

export default NavbarComponent;
