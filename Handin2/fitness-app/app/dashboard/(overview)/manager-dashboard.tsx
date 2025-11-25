import { useRouter } from "next/navigation";

export default function ManagerDashboard() {
  const router = useRouter();
  return (
    <div>
      <h2 className="text-2xl font-semibold dark:text-white pb-8">
        Manager Dashboard
      </h2>
      <button
        className="text-center p-8 rounded-lg w-full cursor-pointer bg-zinc-900 hover:bg-zinc-700 hover:ring-2 hover:ring-zinc-900 transition"
        onClick={() => router.push("/dashboard/users/create")}
      >
        <p>Add a Personal Trainer</p>
      </button>
    </div>
  );
}
