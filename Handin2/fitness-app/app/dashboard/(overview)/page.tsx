import React from 'react';
import { User, Shield, LogOut } from 'lucide-react';
import { auth } from '@/auth/auth.config';

export default async function Dashboard() {
  // Placeholder data
  const seesion = await auth();
  const userData = {
    name: seesion?.user?.name,
    role: seesion?.user?.role.split(/(?=[A-Z])/).filter(Boolean).join(' '),
  };

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
            Welcome, {userData.name}!
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            You are now logged in.
          </p>
        </div>

        {/* Role Display */}
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <Shield className="h-4 w-4 text-zinc-500" />
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Your role is: <span className="font-bold text-zinc-900 dark:text-white">{userData.role}</span>
          </span>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />

        {/* Logout Action */}
        <a
          href="/"
          className="group flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-700 hover:ring-4 hover:ring-zinc-200 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:hover:ring-zinc-800"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </a>

      </main>
    </div>
  );
}