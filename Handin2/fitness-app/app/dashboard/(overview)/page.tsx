"use client";
import useUser from "@/app/hooks/use-user";
import { SignoutButton } from "@/app/ui/button";
import { Shield, User } from "lucide-react";

export default function Dashboard() {
  const user = useUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 font-sans dark:bg-black">
      {/* Main Content Container */}
      <main className="flex w-full max-w-xl flex-col items-center text-center space-y-8">
        {/* Profile Icon */}
        <div className="rounded-full bg-zinc-200 p-4 dark:bg-zinc-900">
          <User className="h-12 w-12 text-zinc-900 dark:text-white" />
        </div>

        {/* Welcome Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Welcome, {user.name}!
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            You are now logged in.
          </p>
        </div>

        {/* Role Display */}
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <Shield className="h-4 w-4 text-zinc-500" />
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Your role is: {user.role}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />

        {/* Logout Action */}
        <SignoutButton />
      </main>
    </div>
  );
}
