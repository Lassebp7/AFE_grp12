"use client";

import { usePathname } from "next/navigation";
import { UserRoles } from "../types";
import clsx from "clsx";
import Link from "next/dist/client/link";

interface NavLinksProps {
    role: UserRoles;
    onNavigate?: (path: string) => void;
}

export function NavLinks({ role, onNavigate }: NavLinksProps) {
    const pathname = usePathname();

    const routes = [
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: role === "Manager" ? "Add Trainer" : "Clients",
            href: role === "Manager" ? "/dashboard/users/create" : "/dashboard/users",
        },
        {
            name: "Workouts",
            href: "/dashboard/workouts"
        },
    ];

    return (
        <ul className="flex flex-row gap-1">
            {routes.map((link) => {
                const isActive = link.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(link.href);

                return (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={clsx("block rounded-md px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white", {
                                "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white": isActive,
                            })}
                        >
                            {link.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}