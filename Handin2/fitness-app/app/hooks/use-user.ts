import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: session } = useSession();
  const user = {
    name: session?.user.name,
    role: session?.user.role,
  };
  return user;
}
