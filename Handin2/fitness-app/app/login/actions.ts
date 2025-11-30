"use server";

import { signIn } from "@/app/auth/auth";
import { AuthError } from "next-auth";
import z from "zod";

const LoginSchema = z.object({
  email: z.email({ error: "Invalid email. Please enter a valid email." }),
  password: z.string().min(1, { error: "Enter your password" }),
});

export type FormState = {
  errors: string[];
  properties?: {
    email?: {
      errors: string[];
    };
    password?: {
      errors: string[];
    };
  };
  // Prev form data
  data?: {
    email?: string;
    password?: string;
  };
  success: boolean;
};

export async function authenticate(prevState: FormState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    const errorData = z.treeifyError(validatedFields.error);

    return {
      errors: errorData.errors || [],
      properties: errorData.properties,
      data: data,
    } as FormState;
  }

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: [
              "Invalid credentials. Please check your email and password.",
            ],
            data: data,
          } as FormState;
        default:
          return {
            errors: ["Something went wrong..."],
            data: data,
          } as FormState;
      }
    }
    throw error;
  }
  return { errors: [], success: true } as FormState;
}
