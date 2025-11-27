import { Workout } from "@/app/types";
import { post } from "@/utils/api";

export async function postWorkout(Workout: Workout): Promise<Workout> {
    try {
        return await post(`/WorkoutPrograms`, Workout);
    } catch (error) {
        throw error;
    }
}