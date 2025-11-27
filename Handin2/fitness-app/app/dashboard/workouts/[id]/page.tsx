import { ArrowLeft, Clock, Dumbbell, Plus, Repeat, Trash2 } from "lucide-react";
import { GetWorkoutDetails } from "./actions";
import Link from "next/link";
import { auth } from "@/app/auth/auth";

interface WorkoutDetailsPageProps {
  params: {
    id: string; // The dynamic segment [id] will be available here
  };
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;
  console.log("ID:", id);
  const workoutData = await GetWorkoutDetails(id);
  const session = await auth();
  const role = session?.user.role;

  return (
    <div className="mx-auto max-w-4xl p-6 font-sans text-zinc-900 dark:text-white">
      {/* --- NAV HEADER --- */}
      <div className="mb-6">
        <Link
          href="/dashboard/workouts"
          className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Workouts
        </Link>
      </div>

      {/* --- TITLE SECTION --- */}
      <div className="mb-8 flex items-start justify-between border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{workoutData.name}</h1>
            {role === "PersonalTrainer" && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                For: {workoutData.clientId}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1">
              <Dumbbell className="h-4 w-4" />
              {workoutData.exercises.length} Exercises
            </div>
          </div>
          <p className="max-w-2xl pt-2 text-zinc-600 dark:text-zinc-400">
            {workoutData.description}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          {role === "PersonalTrainer" && (
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

        {workoutData.exercises.map((exercise, index) => (
          <div
            key={exercise.exerciseId}
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
                <span className="block text-xs font-medium uppercase text-zinc-400">
                  Sets
                </span>
                <span className="text-lg font-bold">{exercise.sets}</span>
              </div>

              {/* REPS vs DURATION Logic */}
              <div className="text-center">
                <span className="block text-xs font-medium uppercase text-zinc-400">
                  {exercise.repetitions ? "Reps" : "Time"}
                </span>
                <div className="flex items-center gap-1">
                  {exercise.repetitions ? (
                    <>
                      <Repeat className="h-3 w-3 text-zinc-400" />
                      <span className="text-lg font-bold">
                        {exercise.repetitions}
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 text-zinc-400" />
                      <span className="text-lg font-bold">{exercise.time}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Trainer Action: Delete Exercise */}
              {role === "PersonalTrainer" && (
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
