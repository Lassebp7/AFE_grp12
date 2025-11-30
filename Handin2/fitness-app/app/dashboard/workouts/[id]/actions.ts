"use server";

import { Workout } from "@/app/types";
import { get, remove } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function GetWorkoutDetails(id: string) {
  return await get<Workout>(`/WorkoutPrograms/${id}`);
}

export async function DeleteExercise(
  id: number,
  workoutId: number | undefined
) {
  await remove(`/Exercises/${id}`);
  if (workoutId) {
    revalidatePath(`/dashboard/workouts/${workoutId}`);
  }
  return;
}
