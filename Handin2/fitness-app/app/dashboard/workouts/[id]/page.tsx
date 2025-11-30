import { auth } from "@/app/auth/auth";
import { ArrowLeft, Dumbbell, Plus } from "lucide-react";
import Link from "next/link";
import { GetWorkoutDetails } from "./actions";
import ExerciseRowComponent from "./exercise-row";

interface WorkoutDetailsPageProps {
  params: {
    id: string; // The dynamic segment [id] will be available here
  };
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;
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

      {/* Title and stuff like that */}
      <div className="mb-8 flex items-start justify-between border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{workoutData.name}</h1>
            {role === "PersonalTrainer" && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                Client ID: {workoutData.clientId}
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

        {/* Create new exercise button*/}
        <div className="flex gap-3">
          {role === "PersonalTrainer" && (
            <Link
              href={`/dashboard/workouts/${id}/add`}
              className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <Plus className="h-4 w-4" />
              Add Exercise
            </Link>
          )}
        </div>
      </div>

      {/* Exercise list */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Exercises</h2>

        {/* Wrap row into client component to add interactivity */}
        {workoutData.exercises.map((exercise, index) => (
          <ExerciseRowComponent
            exercise={exercise}
            index={index}
            role={role}
            workoutData={workoutData}
            key={exercise.exerciseId}
          />
        ))}
      </div>
    </div>
  );
}
