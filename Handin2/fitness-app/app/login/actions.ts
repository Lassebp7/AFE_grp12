"use server";

import { signIn } from "@/auth/auth.config";
import { AuthError } from "next-auth";

/**
 * Handles the user's login attempt using the Credentials provider.
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData, {
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials. Please check your email and password.";
        default:
          return "An unexpected error occurred during sign in.";
      }
    }
    throw error;
  }
}
