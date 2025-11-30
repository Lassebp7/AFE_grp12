"use client";
import useUser from "@/app/hooks/use-user";
import { ArrowLeft, Loader2, Save, UserPlus } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createUser, CreateUserFormState } from "./actions";
import Link from "next/link";

function SubmitButton({ isManager }: { isManager: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="group relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          {isManager ? "Create Trainer" : "Create Client"}
        </>
      )}
    </button>
  );
}

export default function CreateUserPage() {
  const { user } = useUser();
  const boundCreateUser = createUser.bind(null, user); // Binds user to createTrainer, so we can pass it in and post depending on the current users role
  const [formState, dispatch] = useActionState<CreateUserFormState, FormData>(
    boundCreateUser,
    { errors: [] }
  );

  const firstNameError = formState?.properties?.firstName?.errors[0];
  const lastNameError = formState?.properties?.lastName?.errors[0];
  const emailError = formState?.properties?.email?.errors[0];
  const passwordError = formState?.properties?.password?.errors[0];
  const formError = formState?.errors[0]; // General form error

  const InputClass = (hasError: string | undefined) =>
    `w-full rounded-md border py-2 px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 
    ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/dark:bg-red-900/20"
        : "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-black dark:text-white"
    } dark:bg-black dark:text-white`;

  const isManager = user.role === "Manager";

  return (
    <div className="flex flex-col items-center justify-center p-6 font-sans bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-xl space-y-8 bg-white p-8 rounded-xl shadow-lg dark:bg-zinc-950">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/users"
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </Link>
        </div>
        <div className="flex items-center gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-900">
            <UserPlus className="h-6 w-6 text-zinc-900 dark:text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {isManager ? "Create New Trainer" : "Create new Client"}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {isManager
                ? "Add a new personal trainer to your staff."
                : "Add a client to access your workouts."}
            </p>
          </div>
        </div>

        {/* Form bound to the Server Action */}
        <form action={dispatch} className="space-y-6" noValidate>
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* First Name */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-300"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                defaultValue={formState.data?.firstName ?? ""}
                className={InputClass(firstNameError)}
                placeholder="e.g. Jane"
              />
              {firstNameError && (
                <p className="text-xs text-red-500 mt-1" id="firstName-error">
                  {firstNameError}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-300"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                defaultValue={formState.data?.lastName ?? ""}
                className={InputClass(lastNameError)}
                placeholder="e.g. Doe"
              />
              {lastNameError && (
                <p className="text-xs text-red-500 mt-1" id="lastName-error">
                  {lastNameError}
                </p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              defaultValue={formState.data?.email ?? ""}
              className={InputClass(emailError)}
              placeholder="e.g. jane@trainer.com"
              autoComplete="off" // Prevent browser saving the wrong password field
            />
            {emailError && (
              <p className="text-xs text-red-500 mt-1" id="email-error">
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={InputClass(passwordError)}
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
            {passwordError && (
              <p className="text-xs text-red-500 mt-1" id="password-error">
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <SubmitButton isManager={isManager} />

          {/* Global Form Error (e.g., API failure) */}
          {formState.success && (
            <div
              aria-live="polite"
              className="flex flex-col items-center text-sm font-medium text-green-300 p-3 border border-green-300 bg-green-50 dark:bg-green-950 rounded-lg"
            >
              <p>
                {user.role === "Manager"
                  ? "Personal Trainer created Successfully!"
                  : "Client created Successfully!"}
              </p>
            </div>
          )}

          {formState.success == false && (
            <div
              aria-live="polite"
              className="flex flex-col items-center text-sm font-medium text-red-500 p-3 border border-red-500 bg-red-50 dark:bg-red-950 rounded-lg"
            >
              <p>Something went wrong...</p>
            </div>
          )}

          {formError && (
            <div
              aria-live="polite"
              className="text-sm font-medium text-red-500 p-3 border border-red-500 bg-red-50 dark:bg-red-950 rounded-lg"
            >
              {formError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
