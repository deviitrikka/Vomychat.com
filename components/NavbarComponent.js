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
                                <svg height="100%" viewBox="0 0 80 17" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; width: auto;"><title>Linktree Logo</title><desc>Linktree Logo Symbol and Word Mark</desc><path d="M0 1.72687H2.25964V13.6313H8.50582V15.7244H0V1.72687ZM10.7287 1.72687C10.9121 1.72444 11.0941 1.75816 11.2644 1.82609C11.4348 1.89402 11.59 1.99484 11.7214 2.12278C11.8528 2.25073 11.9576 2.4033 12.03 2.57178C12.1024 2.74026 12.1409 2.92135 12.1433 3.1047C12.1433 3.47987 11.9943 3.83967 11.729 4.10496C11.4637 4.37024 11.1039 4.51928 10.7287 4.51928C10.3536 4.51928 9.99375 4.37024 9.72847 4.10496C9.46318 3.83967 9.31415 3.47987 9.31415 3.1047C9.31491 2.92087 9.3523 2.73903 9.42412 2.56981C9.49594 2.40058 9.60076 2.24736 9.73245 2.11909C9.86414 1.99082 10.0201 1.89008 10.1911 1.82273C10.3622 1.75539 10.5449 1.7228 10.7287 1.72687ZM9.62645 5.63991H11.7942V15.7244H9.62645V5.63991ZM13.0618 5.63991H15.2296V7.03612C15.8714 5.97059 16.9737 5.36435 18.425 5.36435C20.7765 5.36435 22.2462 7.20146 22.2462 10.1225V15.7244H20.0784V10.3062C20.0784 8.41395 19.2517 7.34843 17.7587 7.34843C16.1249 7.34843 15.2247 8.46906 15.2247 10.4899V15.7244H13.057L13.0618 5.63991ZM23.3852 1.72687H25.553V10.5817L29.5946 5.63991H32.3135L27.9963 10.692L32.3135 15.7244H29.5946L25.553 10.8022V15.7244H23.3852V1.72687ZM33.1586 3.07408H35.3631V5.64604H37.9351V7.44641H35.3631V12.6442C35.3631 13.3068 35.7673 13.7109 36.3919 13.7109H37.8445V15.7305H36.098C34.2058 15.7305 33.1586 14.6099 33.1586 12.6271V3.07408ZM38.8904 5.64604H41.0582V6.89527C41.5909 5.93998 42.4911 5.37047 43.5934 5.37047C43.8478 5.35888 44.1024 5.38993 44.3466 5.46233V7.48315C44.0813 7.42486 43.8097 7.40017 43.5383 7.40966C41.94 7.40966 41.0582 8.75688 41.0582 11.0655V15.7305H38.8904V5.64604ZM49.4158 5.37047C51.804 5.37047 54.3944 6.82179 54.3944 10.9185V11.2125H46.6234C46.79 13.0116 47.8359 14.0037 49.5811 14.0037C50.8304 14.0037 51.8959 13.3239 52.1347 12.3882H54.3393C54.1188 14.4078 52.0245 16.0061 49.5811 16.0061C46.4581 16.0061 44.4936 13.9669 44.4936 10.6797C44.4936 7.75259 46.3858 5.36435 49.4158 5.36435V5.37047ZM52.0796 9.41211C51.7673 8.16288 50.7936 7.37292 49.4158 7.37292C48.0931 7.37292 47.1574 8.18125 46.79 9.41211H52.0796ZM60.2731 5.37047C62.6614 5.37047 65.2517 6.82179 65.2517 10.9185V11.2125H57.4807C57.646 13.0116 58.6932 14.0037 60.4385 14.0037C61.6877 14.0037 62.7532 13.3239 62.992 12.3882H65.1966C64.9761 14.4078 62.8818 16.0061 60.4385 16.0061C57.3154 16.0061 55.3497 13.9669 55.3497 10.6797C55.3497 7.75259 57.2419 5.36435 60.2731 5.36435V5.37047ZM62.9369 9.41211C62.6246 8.16288 61.651 7.37292 60.2731 7.37292C58.9504 7.37292 58.0135 8.18125 57.646 9.41211H62.9369Z" fill="#000000"></path><path d="M65.7852 5.33374H69.6615L66.9058 2.70668L68.4306 1.13901L71.0577 3.83956V0H73.3357V3.83956L75.9627 1.14513L77.4863 2.70668L74.7319 5.32762H78.607V7.49541H74.7098L77.4827 10.1898L75.9627 11.7208L72.1967 7.93631L68.4306 11.7208L66.9058 10.196L69.6798 7.50153H65.7852V5.33374ZM71.0515 10.6062H73.3296V15.7502H71.0515V10.6062Z" fill="#43E660"></path></svg>
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
