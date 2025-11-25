"use client";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import useUser from "../hooks/use-user";
import { SignoutButton } from "./button";
import { NavLinks } from "./nav-links";

export function NavBar() {
  const { user } = useUser();
  const currentUserRole = user.role;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Fitness logo to the left */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white"
        >
          <div className="rounded-lg bg-zinc-900 p-1 dark:bg-white">
            <Dumbbell className="h-4 w-4 text-white dark:text-black" />
          </div>
          <span>FitApp</span>
        </Link>

        {/* Navigation links, split because it is a client component */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavLinks role={currentUserRole} />
        </div>

        <SignoutButton />
      </div>
    </nav>
  );
}
