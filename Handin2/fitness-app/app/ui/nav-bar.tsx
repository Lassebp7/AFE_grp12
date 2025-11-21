import { auth } from "@/auth/auth";
import { NavLinks } from "./nav-links";
import { Dumbbell, LogOut, User } from "lucide-react";
import Link from "next/link";

export async function NavBar() {
    const session = await auth();
    const currentUserRole = session?.user?.role || "Client";

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
            <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">

                {/* Fitness logo to the left */}
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                    <div className="rounded-lg bg-zinc-900 p-1 dark:bg-white">
                        <Dumbbell className="h-4 w-4 text-white dark:text-black" />
                    </div>
                    <span>FitApp</span>
                </Link>

                {/* Navigation links, split because it is a client component */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <NavLinks role={currentUserRole} />
                </div>


                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-700 hover:ring-4 hover:ring-zinc-200 hover:text-zinc-900 text-zinc-400 dark:hover:bg-zinc-200 dark:hover:ring-zinc-800"
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </Link>

                {/* <div className="rounded-full bg-zinc-100 p-2 dark:bg-zinc-800">
                    <User className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                </div> */}

            </div>
        </nav>
    );
}