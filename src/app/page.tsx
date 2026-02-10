"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const isDisabled = name.trim().length === 0;

  const handleStart = () => {
    if (isDisabled) return;
    router.push("/chat");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full flex-col items-center justify-center gap-4 px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Welcome to Doodle Chat App!
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            setName(value);
            localStorage.setItem("chatAuthor", value);
          }}
          className="w-full max-w-md rounded border px-4 py-2"
        />

        <button
          onClick={handleStart}
          disabled={isDisabled}
          className={`mt-4 rounded px-6 py-2 text-white transition
            ${isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          Get Started
        </button>
      </main>
    </div>
  );
}