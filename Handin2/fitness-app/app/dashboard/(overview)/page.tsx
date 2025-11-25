"use client";
import useUser from "@/app/hooks/use-user";
import { Loader2, User } from "lucide-react";

import ClientDashboard from "./client-dashboard";
import ManagerDashboard from "./manager-dashboard";
import TrainerDashboard from "./trainer-dashboard";

export default function Dashboard() {
  const { user, status } = useUser();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center dark:bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          Loading user data...
        </p>
      </div>
    );
  }

  // Determine which dashboard to render based on the user's role
  let RoleSpecificContent;

  switch (user.role) {
    case "Client":
      RoleSpecificContent = <ClientDashboard user={user} />;
      break;
    case "PersonalTrainer":
      RoleSpecificContent = <TrainerDashboard user={user} />;
      break;
    case "Manager":
      RoleSpecificContent = <ManagerDashboard />;
      break;
    default:
      // unknown role
      RoleSpecificContent = (
        <p className="text-red-500">
          Error: Unknown user role or unauthorized access.
        </p>
      );
  }

  return (
    <div className="flex flex-col items-center bg-zinc-50 p-6 font-sans dark:bg-black">
      {/* Main Content Container */}
      <main className="flex w-full max-w-xl flex-col items-center text-center space-y-8">
        {/* Profile Icon */}
        <div className="rounded-full bg-zinc-200 p-4 dark:bg-zinc-900">
          <User className="h-12 w-12 text-zinc-900 dark:text-white" />
        </div>

        {/* Welcome Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Welcome, {user.name}!
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            You are now logged in.
          </p>
        </div>

        <div className="w-full">{RoleSpecificContent}</div>

        {/* Divider */}
        <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
      </main>
    </div>
  );
}
