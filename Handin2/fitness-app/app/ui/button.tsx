import clsx from "clsx";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

function SignoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="group flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-all cursor-pointer hover:bg-zinc-700 hover:ring-4 hover:ring-zinc-200 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:hover:ring-zinc-800"
    >
      <LogOut className="h-4 w-4" />
      Log out
    </button>
  );
}

export { Button, SignoutButton };
