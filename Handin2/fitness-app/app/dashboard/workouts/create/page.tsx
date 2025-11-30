export const dynamic = "force-dynamic";

import { auth } from "@/app/auth/auth";
import CreateWorkoutForm from "@/app/ui/create-workout-form";
import { ArrowLeft, Dumbbell } from "lucide-react";
import Link from "next/link";
import { getClientsByTrainer } from "../../users/actions";
import { redirect } from "next/navigation";

export default async function CreateWorkoutPage() {
  const sessions = await auth();

  if (!sessions?.user?.id) {
    redirect("/login");
  }

  const clients = await getClientsByTrainer();

  return (
    <div className="mx-auto max-w-2xl p-6 font-sans text-zinc-900 dark:text-white">
      {/* nav header */}
      <div className="mb-8">
        <Link
          href="/dashboard/workouts"
          className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Workouts
        </Link>
      </div>

      {/* page title */}
      <div className="mb-10 flex items-center gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950">
          <Dumbbell className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Create New Program</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Define the basics. You will add exercises in the next step.
          </p>
        </div>
      </div>

      {/* form */}
      <CreateWorkoutForm
        clients={clients}
        personalTrainerId={sessions.user.id}
      />
    </div>
  );
}
