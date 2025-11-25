import { SessionUser } from "@/app/types";

export default function ClientDashboard({ user }: { user: SessionUser }) {
  return (
    <div className="text-center p-8 bg-blue-100 rounded-lg dark:bg-blue-900">
      <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200">
        Client Portal
      </h2>
      <p>
        Your current workout plan and progress tracking goes here, {user.name}.
      </p>
    </div>
  );
}
