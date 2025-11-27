"use cliennt";

import { Plus, ShieldAlert, User, Users } from "lucide-react";
import { getClientsByTrainer } from "./actions";
import { UserRoles } from "@/app/types";
import { auth } from "@/app/auth/auth";

// This represents: app/dashboard/users/page.tsx
export default async function UsersListPage() {
  const session = await auth();
  const currentUserRole: UserRoles = session?.user?.role;

  const clients = await getClientsByTrainer();

  // Should never be used, as route guarding should prevent manager access
  if (currentUserRole === "Manager") {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4 text-center text-zinc-500">
        <ShieldAlert className="h-12 w-12 text-red-500" />
        <p>Managers cannot view the client list.</p>
        <a href="/dashboard/users/create" className="text-blue-500 underline">
          Go to Create Trainer
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          My Clients
        </h1>

        {/* Only show the top 'Add' button if we already have clients. 
            If empty, the CTA is inside the empty state box. */}
        {clients.length > 0 && (
          <a
            href="/dashboard/users/create"
            className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            <Plus className="h-4 w-4" />
            Add New Client
          </a>
        )}
      </div>

      {/* CONDITIONAL RENDERING */}
      {clients.length === 0 ? (
        // --- EMPTY STATE BOX ---
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-800">
          <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-900">
            <Users className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            No clients yet
          </h3>
          <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            It looks like you havent added any clients to your roster. Add your
            first client view them in the list.
          </p>
          <a
            href="/dashboard/users/create"
            className="mt-6 flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            <Plus className="h-4 w-4" />
            Add New Client
          </a>
        </div>
      ) : (
        // --- LIST VIEW ---
        <div className="grid gap-4">
          {clients.map((client) => (
            <div
              key={client.userId}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">
                    Client Name: {client.lastName}, {client.firstName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
