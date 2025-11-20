"use client";

import React from 'react';
import { Dumbbell, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// NOTE: In your real Next.js app, import Link from 'next/link';
// and use <Link href="..."> instead of <a href="...">

export function NavBar() {
  // --- SIMULATED AUTH STATE ---
  // Change this to "TRAINER" to see the link change to "Clients"
  // Change this to "MANAGER" to see the link change to "Add Trainer"
  const currentUserRole = "Trainer";

  const pathname = usePathname();

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard"
    },
    {
      // --- CONDITIONAL NAVIGATION ---
      // 1. If Manager: The button is "Add Trainer" and skips the list view entirely.
      // 2. If Trainer: The button is "Clients" and goes to the list view.
      name: currentUserRole === "MANAGER" ? "Add Trainer" : "Clients",
      href: currentUserRole === "MANAGER" ? "/dashboard/users/create" : "/dashboard/users",
    },
    {
      name: "Workouts",
      href: "/dashboard/workouts"
    },
  ];


  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">

        <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
          <div className="rounded-lg bg-zinc-900 p-1 dark:bg-white">
            <Dumbbell className="h-4 w-4 text-white dark:text-black" />
          </div>
          <span>FitApp</span>
        </div>



        {/* Centered Navigation */}
        <ul className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-row gap-1">
          {routes.map((link, key) => {

            const isActive = link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);

            return (
              <li key={key}>
                {/* Use <Link> in your real app! */}
                <a
                  href={link.href}
                  className={clsx("block rounded-md px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white", {
                    "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white": isActive,
                  })}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="rounded-full bg-zinc-100 p-2 dark:bg-zinc-800">
          <User className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>

      </div>
    </nav>
  );
}