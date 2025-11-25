"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { Dumbbell, ArrowRight } from 'lucide-react';

export default function Home() {
  const data = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [data.status, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 font-sans dark:bg-black">
      {/* Main Content Container - Constrained width for readability */}
      <main className="flex w-full max-w-2xl flex-col items-center text-center space-y-8">
        {/* Big Header */}
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Welcome to the Fitness App
        </h1>

        {/* Descriptive Text Field */}
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-lg">
          Start your journey today. Track your workouts, monitor your progress,
          and reach your fitness goals with our intuitive platform designed for
          athletes of all levels.
        </p>

        {/* Action Button Area */}
        <div className="pt-4">
          <Link
            href="/login"
            className="group flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-700 hover:ring-4 hover:ring-zinc-200 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:hover:ring-zinc-800"
          >
            Log in
            {/* <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /> */}
          </Link>
        </div>
      </main>

      {/* Footer / Copyright (Optional, keeps it anchored) */}
      <footer className="absolute bottom-6 text-sm text-zinc-400">
        © 2025 Gruppe 12 Inc.
      </footer>
    </div>
  );
}
