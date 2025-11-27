// import Link from 'next/link'; // Uncomment in real app
import { auth } from "@/app/auth/auth";
import {
  ChevronRight,
  Dumbbell,
  LayoutList,
  Plus,
  User
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getWorkoutsByClientId, getWorkoutsByTrainerId } from "./actions";

export default async function WorkoutListPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const workouts = session.user.role === "Client" ? await getWorkoutsByClientId(session.user.id) : await getWorkoutsByTrainerId();

  return (
    <div className="mx-auto max-w-5xl p-6 font-sans text-zinc-900 dark:text-white">
      {/* --- HEADER SECTION --- */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {session.user.role === "PersonalTrainer"
              ? "All Workout Programs"
              : "My Workouts"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {session.user.role === "PersonalTrainer"
              ? "Manage and assign programs to your clients."
              : "Select a program to view details and start training."}
          </p>
        </div>

        {/* Only Trainers can create new programs */}
        {session.user.role === "PersonalTrainer" && (
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
      {workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-800">
          <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-900">
            <LayoutList className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold">No programs found</h3>
          <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            {session.user.role === "PersonalTrainer"
              ? "You haven't created any workout programs yet."
              : "Your trainer hasn't assigned any workouts to you yet."}
          </p>
        </div>
      ) : (
        // --- LIST GRID ---
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <a
              key={workout.workoutProgramId}
              href={`/dashboard/workouts/${workout.workoutProgramId}`}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div>
                {/* Top Meta Row */}
                <div className="mb-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  {/* TRAINER ONLY: Show which client this is for */}
                  {session.user.role === "PersonalTrainer" ? (
                    <div className="flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      <User className="h-3 w-3" />
                      <span>{workout.name}</span>
                    </div>
                  ) : (
                    // Spacer div to keep layout consistent if client view has no top meta
                    <div className="h-6"></div>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="mb-2 text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {workout.clientId}
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
                    <span>{workout.exercises.length} exercises</span>
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
