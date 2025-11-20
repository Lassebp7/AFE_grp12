"use server";

import { signIn } from "@/auth/auth.config";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

/**
 * Handles the user's login attempt using the Credentials provider.
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
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
          return "Invalid credentials. Please check your email and password.";
        default:
          return "Something went wrong...";
      }
    }
    throw error;
  }
  redirect("/dashboard");
}
