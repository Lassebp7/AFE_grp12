export const dynamic = "force-dynamic";

// import Link from 'next/link'; // Uncomment in real app
import { auth } from "@/app/auth/auth";
import {
  ArrowRight,
  ArrowUpRight,
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => {
            const counterpartLabel = session.user.role === "PersonalTrainer" ? "Client" : "Trainer";

            const counterpartValue = session.user.role === "PersonalTrainer"
              ? workout.clientId
              : workout.personalTrainerId;

            return (
              <Link
                key={workout.workoutProgramId}
                href={`/dashboard/workouts/${workout.workoutProgramId}`}
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-0 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="line-clamp-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {workout.name}
                    </h3>

                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      <User className="h-3 w-3" />
                      {counterpartLabel}: {counterpartValue}
                    </span>
                  </div>

                  <p className="line-clamp-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {workout.description || "No description provided."}
                  </p>
                </div>

                <div className="mx-6 border-t border-zinc-200 dark:border-zinc-700/50" />

                <div className="mt-auto flex items-center justify-between border-zinc-100 px-6 py-4 dark:border-zinc-800">

                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Dumbbell className="h-4 w-4 text-zinc-400" />
                      <span>{workout.exercises.length} exercises</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
