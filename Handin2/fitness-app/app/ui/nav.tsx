import Link from "next/link";

const routes = [
  { name: "Dashboard", href: "/dashboard" },
  {
    name: "Trainers",
    href: "/dashboard/trainers",
  },
  { name: "Workouts", href: "/dashboard/workouts" },
];

export function NavBar() {
  return (
    <nav className={"w-full h-12 bg-neutral-600 accent-amber-50"}>
      <ul className="flex fles-row">
        {routes.map((link, key) => {
          return (
            <Link className="px-6 py-3 rounded-md" href={link.href} key={key}>
              {link.name}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
