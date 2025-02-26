"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");

  const createTree = () => {
    router.push(`/generate?handle=${text}`);
  };

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-1 md:grid-cols-2 p-6">
        {/* Left Section */}
        <div className="flex justify-center flex-col px-6 md:ml-[10vw] gap-3 text-center md:text-left">
          <p className="text-yellow-300 font-bold text-4xl md:text-7xl">Everything you</p>
          <p className="text-yellow-300 font-bold text-4xl md:text-7xl">are. In one,</p>
          <p className="text-yellow-300 font-bold text-4xl md:text-7xl">simple link in bio.</p>
          <p className="text-yellow-300 text-lg md:text-xl my-4">
            Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate, and sell.
          </p>
          <div className="input flex flex-col md:flex-row gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="px-4 py-3 focus:outline-green-800 rounded-md text-black w-full md:w-auto"
              type="text"
              placeholder="Enter your Handle"
            />
            <button onClick={createTree} className="bg-pink-300 rounded-full px-6 py-3 font-semibold">
              Claim your Bittree
            </button>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="flex items-center justify-center">
          <img src="/home.png" alt="homepage image" className="max-w-[90%] md:max-w-full" />
        </div>
      </section>

      <section className="bg-red-700 min-h-[100vh]"></section>
    </main>
  );
}
