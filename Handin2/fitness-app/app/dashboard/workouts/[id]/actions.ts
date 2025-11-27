"use server";

import { Workout } from "@/app/types";
import { get } from "@/utils/api";

export async function GetWorkoutDetails(id: string) {
  console.log("Getting workout id: ", id);
  return await get<Workout>(`/api/WorkoutPrograms/${id}`);
}
