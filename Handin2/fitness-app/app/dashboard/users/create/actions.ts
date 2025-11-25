"use server";

import { User } from "@/app/types";
import { post } from "@/utils/api";
import { redirect } from "next/navigation";
import z, { string } from "zod";

const createTrainerSchema = z.object({
  firstName: z.string().min(1, { error: "Enter your first name" }),
  lastName: z.string().min(1, { error: "Enter your last name" }),
  email: z.email({ error: "Invalid email. Please enter a valid email." }),
  password: z.string().min(1, { error: "Enter your password" }),
});

interface CreateTrainerPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId: null;
  accountType: "PersonalTrainer";
}

export type CreateTrainerFormState = {
  errors: string[];
  properties?: {
    firstName?: {
      errors: string[];
    };
    lastName?: {
      errors: string[];
    };
    email?: {
      errors: string[];
    };
    password?: {
      errors: string[];
    };
  };
  // Prev form data
  data?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  };
};

export async function createClient(
  personalTrainerId: number,
  formData: FormData
) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const newClient: User = {
    firstName,
    lastName,
    email,
    password,
    personalTrainerId,
    accountType: "Client",
    userId: 0,
  };

  await post<User>("/Users", newClient);
}

export async function createTrainer(
  prevState: CreateTrainerFormState,
  formData: FormData
): Promise<CreateTrainerFormState> {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = createTrainerSchema.safeParse(data);

  if (!result.success) {
    const errorData = z.treeifyError(result.error);

    return {
      errors: errorData.errors || [],
      properties: errorData.properties,
      data: data,
    } as CreateTrainerFormState;
  }

  const payload: CreateTrainerPayload = {
    ...result.data,
    personalTrainerId: null,
    accountType: "PersonalTrainer",
  };

  try {
    await post<CreateTrainerPayload>("/Users", payload);
  } catch (error) {
    console.error("API Error during trainer creation:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during creation. Please try again.";

    return {
      errors: [errorMessage],
      data: {
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        email: data.email as string,
      },
    };
  }
  redirect("/dashboard");
}
