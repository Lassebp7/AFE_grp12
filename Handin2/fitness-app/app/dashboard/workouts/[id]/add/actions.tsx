"use server";

import { post } from "@/utils/api";
import { revalidatePath } from "next/cache";
import z from "zod";

interface CreateExercisePayload {
  name: string;
  description: string;
  sets: number;
  repetitions: number | null;
  time: string | null;
}

const createExerciseSchema = z
  .object({
    name: z
      .string()
      .min(3, { error: "Exercise name must be at least 3 characters." }),
    description: z
      .string()
      .min(3, { error: "Description must be at least 3 characters." }),
    sets: z.coerce
      .number({ error: "Set count must be a number" })
      .int({ error: "Set count must be a whole number." })
      .positive({ error: "Set count must be positive." }),
    repetitions: z.coerce
      .number({ error: "Repetition count must be a number." })
      .int({ error: "Repetition count must be a whole number." })
      .min(0, { error: "Repetition count must be above 0." })
      .optional()
      .nullable(),
    time: z.string().optional().nullable(),
  })
  // XOR on repetitions and time
  .refine((d) => !!d.repetitions !== !!d.time, {
    message: "Specify either repetitions or time.",
    path: ["time"],
  });

export type CreateExerciseFormState = {
  success?: boolean;
  errors?: string[];
  properties?: {
    [key: string]: { errors: string[] } | undefined;
  };
  data?: {
    name?: string;
    description?: string;
    sets?: number;
    repetitions?: number | null;
    time?: string | null;
  };
};

export async function createExercise(
  workoutId: string,
  prevState: CreateExerciseFormState,
  formData: FormData
): Promise<CreateExerciseFormState> {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    sets: formData.get("sets"),
    repetitions: formData.get("repetitions"),
    time: formData.get("time"),
  };

  const result = createExerciseSchema.safeParse(data);

  if (!result.success) {
    const errorData = z.treeifyError(result.error);

    return {
      errors: errorData.errors || [],
      properties: errorData.properties,
      data: data,
    } as unknown as CreateExerciseFormState;
  }

  const payload: CreateExercisePayload = {
    name: result.data.name,
    description: result.data.description,
    sets: result.data.sets,
    repetitions: result.data.repetitions ?? null,
    time: result.data.time ?? null,
  };

  try {
    await post<CreateExercisePayload>(
      `/Exercises/Program/${workoutId}`,
      payload
    );

    // revalidate the parent workout details page to show the new exercise
    revalidatePath(`/dashboard/workouts/${workoutId}`);

    return {
      success: true,
      errors: [],
    };
  } catch (error) {
    console.error("API Error during exercise creation:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during creation. Please try again.";

    return {
      success: false,
      errors: [errorMessage],
      data: result.data,
    };
  }
}
