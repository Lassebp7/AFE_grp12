import React from 'react';
import { UserPlus, Save, ArrowLeft } from 'lucide-react';
import { UserRoles } from '@/app/types';
import { createClient } from './actions';
import { auth } from '@/auth/auth';

export default async function CreateUserPage() {
  const session = await auth();
  const currentUserRole: UserRoles = session?.user?.role;

  const createClientWithTrainerId = createClient.bind(null, parseInt(session?.user?.id || '0', 10));

  // Clients should not access this page. Therefore no need check for client
  const targetRole = currentUserRole === "Manager" ? "Personal Trainer" : "Client";

  return (
    <div className="flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl space-y-8">


        {currentUserRole === "PersonalTrainer" && <div className="mb-8">
          <a
            href="/dashboard/users"
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to clients
          </a>
        </div>}

        {/* Header */}
        <div className="flex items-center gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-900">
            <UserPlus className="h-6 w-6 text-zinc-900 dark:text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Create New {targetRole}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {currentUserRole === "Manager"
                ? "Add a new trainer to your staff."
                : "Onboard a new client to start their journey."}
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" autoComplete='off' action={createClientWithTrainerId}>

          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
                placeholder="e.g. John"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
                placeholder="e.g. Doe"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
              placeholder="e.g. john@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">Password</label>
            <input
              type="password"
              name="password"
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit" // Remember to change to type="submit" in your real app
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            <Save className="h-4 w-4" />
            Create {targetRole}
          </button>
        </form>

      </div>
    </div>
  );
}