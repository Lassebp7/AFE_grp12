"use client";

import { Exercise, Workout } from "@/app/types";
import { Clock, Repeat } from "lucide-react";

export default function ExerciseRowComponent({
  exercise,
  index,
  role,
  workoutData,
}: {
  exercise: Exercise;
  index: number;
  role?: string;
  workoutData: Workout;
}) {
  return (
    <div
      key={exercise.exerciseId}
      className="group flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-4">
        {/* Exercise number */}
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

      <div className="flex items-center gap-6 pl-12 sm:pl-0">
        {/* sets */}
        <div className="text-center">
          <span className="block text-xs font-medium uppercase text-zinc-400">
            Sets
          </span>
          <span className="text-lg font-bold">{exercise.sets}</span>
        </div>

        {/* reps or time */}
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

        {/* Delete exercise button */}

        {/* Currently, it seems the backend does not work for this,
            since not even the swagger page works with the same id.
            For this reason, this functionality has been commented out. */}

        {/* {role === "PersonalTrainer" && (
          <button
            className="ml-4 rounded-md p-2 text-zinc-400 opacity-0 cursor-pointer transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/20"
            onClick={async () => {
              console.log("exercise id", exercise.exerciseId);
              DeleteExercise(exercise.exerciseId, workoutData.workoutProgramId);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )} */}
      </div>
    </div>
  );
}
