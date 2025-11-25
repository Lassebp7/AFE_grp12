import { SessionUser } from "@/app/types";

export default function TrainerDashboard({ user }: { user: SessionUser }) {
  return (
    <div className="text-center p-8 bg-green-100 rounded-lg dark:bg-green-900">
      <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
        Personal Trainer Tools
      </h2>
      <p>Manage your clients and sessions, Trainer {user.name}.</p>
    </div>
  );
}
