"use client"

import { Save } from "lucide-react";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { useState } from "react";
import { postWorkout } from "../dashboard/workouts/create/actions";
import { User } from "../types";

interface Props {
  clients: User[];
  personalTrainerId: string;
}

export default function CreateWorkoutForm({ clients, personalTrainerId }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const workout = {
      name: formData.get("name") as string,
      clientId: Number(formData.get("clientId")),
      description: formData.get("description") as string,
      exercises: [],
    }

    try {
      console.log(workout)
      await postWorkout(workout);
    }
    catch (error) {
      console.error("Detailed Error:", error);
      alert("Error creating workout program.");
      return;
    }
    finally {
      setIsLoading(false);
    }
    redirect('/dashboard/workouts', RedirectType.replace);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">
            Program Title
          </label>
          <input
            name='name'
            type="text"
            required
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-sans transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
            placeholder="e.g. Summer Shred Phase 1"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300">
            Assign to Client
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            </div>
            <select
              name="clientId"
              required
              className="w-full appearance-none rounded-md border border-zinc-300 bg-white py-2 pl-10 pr-8 text-sm font-sans transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
              defaultValue=""
            >
              <option value="" disabled>
                Select a client...
              </option>
              {clients.map((client) => (
                <option key={client.userId} value={client.userId}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
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
          name="description"
          rows={4}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-sans transition-all focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
          placeholder="Describe the goal of this workout (e.g., 'Focus on slow eccentric movements, keep rest times short...')"
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
  )
}