"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, Dumbbell, User } from "lucide-react";
import Link from "next/link";
// import Link from 'next/link'; // Uncomment in real app
// import { useRouter } from 'next/navigation'; // Uncomment in real app

export default function CreateWorkoutPage() {
  // --- MOCK DATA: Clients available to assign ---
  const clients = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Robert Fox" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    clientId: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating Program:", formData);
    // 1. API Call to create program
    // 2. router.push(`/dashboard/workouts/${newId}`);
    alert("Program Created! Redirecting to add exercises...");
  };

  return (
    <div className="mx-auto max-w-2xl p-6 font-sans text-zinc-900 dark:text-white">
      {/* --- NAV HEADER --- */}
      <div className="mb-8">
        <Link
          href="/dashboard/workouts"
          className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Workouts
        </Link>
      </div>

      {/* --- PAGE TITLE --- */}
      <div className="mb-10 flex items-center gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-900">
          <Dumbbell className="h-6 w-6 text-zinc-900 dark:text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Create New Program</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Define the basics. You will add exercises in the next step.
          </p>
        </div>
      </div>

      {/* --- FORM --- */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Row 1: Title & Client */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Program Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">
              Program Title
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-sans transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
              placeholder="e.g. Summer Shred Phase 1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Assign Client Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">
              Assign to Client
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-4 w-4 text-zinc-400" />
              </div>
              <select
                required
                className="w-full appearance-none rounded-md border border-zinc-300 bg-white py-2 pl-10 pr-8 text-sm font-sans transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
                onChange={(e) =>
                  setFormData({ ...formData, clientId: e.target.value })
                }
                defaultValue=""
              >
                <option value="" disabled>
                  Select a client...
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {/* Custom arrow styling since we used appearance-none */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">
            Description & Notes
          </label>
          <textarea
            rows={4}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-sans transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
            placeholder="Describe the goal of this workout (e.g., 'Focus on slow eccentric movements, keep rest times short...')"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Submit Action */}
        <div className="pt-4">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            <Save className="h-4 w-4" />
            Create & Add Exercises
          </button>
        </div>
      </form>
    </div>
  );
}
