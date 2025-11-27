"use server";

import { SessionUser } from "@/app/types";
import { post } from "@/utils/api";
import z from "zod";

const createUserSchema = z.object({
  firstName: z.string().min(1, { error: "Enter your first name" }),
  lastName: z.string().min(1, { error: "Enter your last name" }),
  email: z.email({ error: "Invalid email. Please enter a valid email." }),
  password: z.string().min(1, { error: "Enter your password" }),
});

interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId: number | null;
  accountType: "PersonalTrainer" | "Client";
}

export type CreateUserFormState = {
  success?: boolean;
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

export async function createUser(
  currentUser: SessionUser,
  prevState: CreateUserFormState,
  formData: FormData
): Promise<CreateUserFormState> {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = createUserSchema.safeParse(data);

  if (!result.success) {
    const errorData = z.treeifyError(result.error);

    return {
      errors: errorData.errors || [],
      properties: errorData.properties,
      data: data,
    } as CreateUserFormState;
  }

  let payload: CreateUserPayload;
  // Manager, create personal trainer
  if (currentUser.role === "Manager") {
    payload = {
      ...result.data,
      personalTrainerId: null,
      accountType: "PersonalTrainer",
    };
  } // Personal trainer, create client
  else {
    payload = {
      ...result.data,
      personalTrainerId: Number(currentUser.id) ?? 0,
      accountType: "Client",
    };
  }

  try {
    console.log(payload);
    await post<CreateUserPayload>("/Users", payload);

    return {
      success: true,
      errors: [],
    };
  } catch (error) {
    console.error("API Error during trainer creation:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during creation. Please try again.";

    return {
      success: false,
      errors: [errorMessage],
      data: {
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        email: data.email as string,
      },
    };
  }
}
