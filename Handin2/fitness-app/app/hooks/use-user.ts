import { useSession } from "next-auth/react";
import { SessionUser } from "../types";

export default function useUser() {
  const { data: session, status } = useSession();
  const user: SessionUser = {
    name: session?.user.name,
    role: session?.user.role,
    id: session?.user.id,
  };
  return { user, session, status };
}
