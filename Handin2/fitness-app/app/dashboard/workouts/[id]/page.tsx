"use client";

import React, { useState } from 'react';
// import { useParams } from 'next/navigation'; // Use this in real app to get the ID
// import Link from 'next/link'; // Use this in real app
import { ArrowLeft, Plus, Clock, Repeat, Dumbbell, Trash2, PlayCircle } from 'lucide-react';

export default function WorkoutDetailsPage() {
    // --- SIMULATED AUTH & PARAMS ---
    const currentUserRole = "TRAINER"; // Toggle "TRAINER" or "CLIENT"

    // In a real app, you would use: const { id } = useParams();
    const workoutId = "1";

    // --- MOCK DATA (Fetched based on ID) ---
    const workoutDetails = {
        id: 1,
        title: "Hypertrophy Phase 1",
        description: "A high-volume push workout focusing on chest and triceps development. Keep rest periods strictly under 90 seconds.",
        duration: "60 min",
        clientName: "John Doe",
        exercises: [
            {
                id: 101,
                name: "Barbell Bench Press",
                description: "Keep feet planted firmly. Lower bar to mid-chest.",
                sets: 4,
                reps: 10,      // Has Reps
                duration: null // No Duration
            },
            {
                id: 102,
                name: "Incline Dumbbell Press",
                description: "Set bench to 30 degrees. Focus on upper chest.",
                sets: 3,
                reps: 12,
                duration: null
            },
            {
                id: 103,
                name: "Weighted Plank",
                description: "Keep core tight and back flat. Do not let hips sag.",
                sets: 3,
                reps: null,    // No Reps
                duration: "60s" // Has Duration (Time)
            }
        ]
    };

    return (
        <div className="mx-auto max-w-4xl p-6 font-sans text-zinc-900 dark:text-white">

            {/* --- NAV HEADER --- */}
            <div className="mb-6">
                <a
                    href="/dashboard/workouts"
                    className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Workouts
                </a>
            </div>

            {/* --- TITLE SECTION --- */}
            <div className="mb-8 flex items-start justify-between border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">{workoutDetails.title}</h1>
                        {currentUserRole === "TRAINER" && (
                            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                For: {workoutDetails.clientName}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {workoutDetails.duration}
                        </div>
                        <div className="flex items-center gap-1">
                            <Dumbbell className="h-4 w-4" />
                            {workoutDetails.exercises.length} Exercises
                        </div>
                    </div>
                    <p className="max-w-2xl pt-2 text-zinc-600 dark:text-zinc-400">
                        {workoutDetails.description}
                    </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3">
                    {currentUserRole === "TRAINER" && (
                        <button className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                            <Plus className="h-4 w-4" />
                            Add Exercise
                        </button>
                    )}
                </div>
            </div>

            {/* --- EXERCISE LIST --- */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Exercises</h2>

                {workoutDetails.exercises.map((exercise, index) => (
                    <div
                        key={exercise.id}
                        className="group flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between"
                    >
                        {/* LEFT: Info */}
                        <div className="flex items-start gap-4">
                            {/* Number Badge */}
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-500 dark:bg-zinc-800">
                                {index + 1}
                            </div>

                            <div>
                                <h3 className="font-bold text-zinc-900 dark:text-white">
                                    {exercise.name}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {exercise.description}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Stats (Sets / Reps or Time) */}
                        <div className="flex items-center gap-6 pl-12 sm:pl-0">

                            {/* SETS (Always present) */}
                            <div className="text-center">
                                <span className="block text-xs font-medium uppercase text-zinc-400">Sets</span>
                                <span className="text-lg font-bold">{exercise.sets}</span>
                            </div>

                            {/* REPS vs DURATION Logic */}
                            <div className="text-center">
                                <span className="block text-xs font-medium uppercase text-zinc-400">
                                    {exercise.reps ? "Reps" : "Time"}
                                </span>
                                <div className="flex items-center gap-1">
                                    {exercise.reps ? (
                                        <>
                                            <Repeat className="h-3 w-3 text-zinc-400" />
                                            <span className="text-lg font-bold">{exercise.reps}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Clock className="h-3 w-3 text-zinc-400" />
                                            <span className="text-lg font-bold">{exercise.duration}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Trainer Action: Delete Exercise */}
                            {currentUserRole === "TRAINER" && (
                                <button className="ml-4 rounded-md p-2 text-zinc-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/20">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}