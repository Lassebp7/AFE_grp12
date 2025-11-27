"use client";

import {
  ArrowLeft,
  Clock,
  Dumbbell,
  Loader2,
  Repeat,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createExercise, CreateExerciseFormState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="group relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving Exercise...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Create Exercise
        </>
      )}
    </button>
  );
}

// Reusable input styling with error handling
const InputClass = (hasError: string | undefined) =>
  `w-full rounded-md border py-2 px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 
  ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20 dark:text-white"
      : "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
  }`;

export default function CreateExerciseForm({
  workoutId,
}: {
  workoutId: string;
}) {
  // Bind the workoutId to the Server Action, so we can access it in createExercise
  const boundCreateExercise = createExercise.bind(null, workoutId);

  const initialState: CreateExerciseFormState = { errors: [] };
  const [formState, dispatch] = useActionState<
    CreateExerciseFormState,
    FormData
  >(boundCreateExercise, initialState);

  // Preventing bug with some default behaviour on radio buttons
  const defaultType =
    (formState.data?.time ?? null) !== null &&
    (formState.data?.time ?? "") !== "" &&
    (formState.data?.repetitions ?? null) === null
      ? "time"
      : "reps";

  // State for the Reps/Time radio toggle
  const [exerciseType, setExerciseType] = useState<"reps" | "time">(
    defaultType
  );

  // Error Extraction (simplified for clarity)
  const nameError = formState?.properties?.name?.errors[0];
  const descriptionError = formState?.properties?.description?.errors[0];
  const setsError = formState?.properties?.sets?.errors[0];
  const repetitionsError = formState?.properties?.repetitions?.errors[0];
  const timeError = formState?.properties?.time?.errors[0];
  const formError =
    formState?.errors && formState.errors.length > 0
      ? formState.errors[0]
      : null;

  return (
    <div className="flex flex-col items-center justify-center p-6 font-sans bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-xl space-y-8 bg-white p-8 rounded-xl shadow-lg dark:bg-zinc-950">
        {/* Back Button and Header */}
        <Link
          href={`/dashboard/workouts/${workoutId}`}
          className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Workout
        </Link>

        <div className="flex items-center gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950">
            <Dumbbell className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Add New Exercise
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Adding to Workout ID: {workoutId}
            </p>
          </div>
        </div>

        {/* Form bound to the Server Action */}
        <form action={dispatch} className="space-y-6" noValidate>
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-300"
            >
              Exercise
            </label>
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={formState.data?.name ?? ""}
              className={InputClass(nameError)}
              placeholder="e.g. Barbell Bench Press"
            />
            {nameError && (
              <p className="text-xs text-red-500 mt-1">{nameError}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={formState.data?.description ?? ""}
              className={InputClass(descriptionError)}
              placeholder="Keep elbows tucked, focus on chest contraction."
            />
            {descriptionError && (
              <p className="text-xs text-red-500 mt-1">{descriptionError}</p>
            )}
          </div>

          {/* Sets Input */}
          <div className="space-y-2">
            <label
              htmlFor="sets"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-300"
            >
              Number of Sets
            </label>
            <input
              id="sets"
              type="number"
              name="sets"
              defaultValue={formState.data?.sets ?? ""}
              className={InputClass(setsError)}
              placeholder="e.g. 4"
            />
            {setsError && (
              <p className="text-xs text-red-500 mt-1">{setsError}</p>
            )}
          </div>

          {/* --- Reps/Time Toggle --- */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-300">
              Specify Metric
            </h3>

            <div className="flex gap-4">
              {/* Reps Radio Button */}
              <label
                className={`flex items-center gap-2 rounded-md p-3 w-1/2 cursor-pointer transition-colors ${
                  exerciseType === "reps"
                    ? "bg-indigo-50 border-indigo-400 dark:bg-indigo-900/40"
                    : "bg-zinc-100 border-zinc-200 dark:bg-zinc-800"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="reps"
                  checked={exerciseType === "reps"}
                  onChange={() => setExerciseType("reps")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <Repeat className="h-4 w-4" />
                <span className="text-sm font-medium">Repetitions</span>
              </label>

              {/* Time Radio Button */}
              <label
                className={`flex items-center gap-2 rounded-md p-3 w-1/2 cursor-pointer transition-colors ${
                  exerciseType === "time"
                    ? "bg-indigo-50 border-indigo-400 dark:bg-indigo-900/40"
                    : "bg-zinc-100 border-zinc-200 dark:bg-zinc-800"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="time"
                  checked={exerciseType === "time"}
                  onChange={() => setExerciseType("time")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Time Duration</span>
              </label>
            </div>

            {/* Conditional Input Field */}
            {exerciseType === "reps" ? (
              <div className="space-y-2">
                <label
                  htmlFor="repetitions"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-300"
                >
                  Reps per Set
                </label>
                <input
                  id="repetitions"
                  type="number"
                  name="repetitions"
                  defaultValue={formState.data?.repetitions ?? ""}
                  className={InputClass(repetitionsError)}
                  placeholder="e.g. 12"
                />
                {repetitionsError && (
                  <p className="text-xs text-red-500 mt-1">
                    {repetitionsError}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <label
                  htmlFor="time"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-300"
                >
                  Time per Set (e.g., 60s, 1m30s)
                </label>
                <input
                  id="time"
                  type="text"
                  name="time"
                  defaultValue={formState.data?.time ?? ""}
                  className={InputClass(timeError)}
                  placeholder="e.g. 45s"
                />
                {timeError && (
                  <p className="text-xs text-red-500 mt-1">{timeError}</p>
                )}
              </div>
            )}
          </div>
          {/* --- End Reps/Time Toggle --- */}

          {/* Submit Button */}
          <SubmitButton />

          {/* Messages */}
          {formState.success && (
            <div
              aria-live="polite"
              className="flex flex-col items-center text-sm font-medium text-green-700 p-3 border border-green-300 bg-green-50 rounded-lg dark:bg-green-950 dark:text-green-300"
            >
              <p>Exercise created and added to the workout successfully!</p>
            </div>
          )}

          {formState.success === false && (
            <div
              aria-live="polite"
              className="flex flex-col items-center text-sm font-medium text-red-700 p-3 border border-red-500 bg-red-50 rounded-lg dark:bg-red-950 dark:text-red-300"
            >
              <p>
                Submission failed:{" "}
                {formError || "An unexpected API error occurred."}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
