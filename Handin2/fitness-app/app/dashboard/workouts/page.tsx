"use client";

import React from "react";
// import Link from 'next/link'; // Uncomment in real app
import {
  Plus,
  User,
  Dumbbell,
  Clock,
  ChevronRight,
  LayoutList,
} from "lucide-react";
import Link from "next/link";

export default function WorkoutListPage() {
  // --- SIMULATED AUTH ---
  // Toggle between "TRAINER" and "CLIENT"
  const currentUserRole = "TRAINER";

  // --- MOCK DATA ---
  const workouts = [
    {
      id: 1,
      title: "Hypertrophy Phase 1",
      description: "Focus on chest and back for mass.",
      duration: "60 min",
      clientName: "John Doe",
      exerciseCount: 5,
    },
    {
      id: 2,
      title: "Legs & Core Blast",
      description: "High intensity interval training for lower body.",
      duration: "45 min",
      clientName: "Jane Smith",
      exerciseCount: 7,
    },
    {
      id: 3,
      title: "Mobility & Recovery",
      description: "Active recovery session to improve flexibility.",
      duration: "30 min",
      clientName: "John Doe",
      exerciseCount: 4,
    },
  ];

  // Filter logic
  const displayedWorkouts =
    currentUserRole === "TRAINER" ? workouts.slice(0, 1) : workouts;

  return (
    <div className="mx-auto max-w-5xl p-6 font-sans text-zinc-900 dark:text-white">
      {/* --- HEADER SECTION --- */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {currentUserRole === "TRAINER"
              ? "All Workout Programs"
              : "My Workouts"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {currentUserRole === "TRAINER"
              ? "Manage and assign programs to your clients."
              : "Select a program to view details and start training."}
          </p>
        </div>

        {/* Only Trainers can create new programs */}
        {currentUserRole === "TRAINER" && (
          <Link
            href="/dashboard/workouts/create"
            className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            <Plus className="h-4 w-4" />
            Create Program
          </Link>
        )}
      </div>

      {/* --- EMPTY STATE --- */}
      {displayedWorkouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-800">
          <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-900">
            <LayoutList className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold">No programs found</h3>
          <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            {currentUserRole === "TRAINER"
              ? "You haven't created any workout programs yet."
              : "Your trainer hasn't assigned any workouts to you yet."}
          </p>
        </div>
      ) : (
        // --- LIST GRID ---
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedWorkouts.map((workout) => (
            <a
              key={workout.id}
              href={`/dashboard/workouts/${workout.id}`}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div>
                {/* Top Meta Row */}
                <div className="mb-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  {/* TRAINER ONLY: Show which client this is for */}
                  {currentUserRole === "TRAINER" ? (
                    <div className="flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      <User className="h-3 w-3" />
                      <span>{workout.clientName}</span>
                    </div>
                  ) : (
                    // Spacer div to keep layout consistent if client view has no top meta
                    <div className="h-6"></div>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="mb-2 text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {workout.title}
                </h3>
                <p className="text-sm text-zinc-500 line-clamp-2 dark:text-zinc-400">
                  {workout.description}
                </p>
              </div>

              {/* Footer Stats */}
              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <div className="flex gap-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <Dumbbell className="h-4 w-4 text-zinc-400" />
                    <span>{workout.exerciseCount} exercises</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-zinc-400" />
                    <span>{workout.duration}</span>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-zinc-300 transition-transform group-hover:translate-x-1 dark:text-zinc-600" />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
