import { Workout } from "@/app/types";
import { get } from "@/utils/api";
import { User } from "next-auth";



export async function getWorkoutsByClientId(clientId: string): Promise<Workout[]> {
    try {
        return await get(`/WorkoutPrograms/client/${clientId}`);
    } catch (error) {
        throw error;
    }
}

export async function getWorkoutsByTrainerId(): Promise<Workout[]> {
    try {
        return await get(`/WorkoutPrograms/trainer`);
    } catch (error) {
        throw error;
    }
}

