import { auth } from "@/auth/auth";

export async function authenticatedFetch(
  url: string,
  method: string,
  options: RequestInit = {}
) {
  const session = await auth();
  const rawJwt = session?.user?.rawjwt;

  if (!rawJwt) {
    throw new Error("Authentication required.");
  }

  // Merge the new Authorization header with existing headers
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${rawJwt}`,
    "Content-Type": "application/json",
  };

  // Call the native fetch with the injected headers
  return fetch(process.env.BACKEND_URL + url, {
    method,
    ...options,
    headers,
  });
}
