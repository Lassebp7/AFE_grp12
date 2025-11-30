"use client";
import useUser from "@/app/hooks/use-user";
import { Loader2, User } from "lucide-react";

export default function Dashboard() {
  const { user, status } = useUser();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center dark:bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          Loading user data...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[90vh] flex-col items-center bg-black p-6 font-sans">
      <main className="flex w-full h-full max-w-xl flex-col items-center text-center space-y-8 dark:bg-black">
        <div className="rounded-full bg-zinc-200 p-4 dark:bg-zinc-900">
          <User className="h-12 w-12 text-zinc-900 dark:text-white" />
        </div>

        {/* Welcome Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Welcome, {user.name}!
          </h1>

          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
            {user.role}
          </span>

          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            You are now logged in.
          </p>
        </div>
        <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
      </main>
    </div>
  );
}
