import { auth } from "@/app/auth/auth";

export async function authFetch(
  url: string,
  method: string,
  options: RequestInit = {}
) {
  const session = await auth();
  const token = session?.user?.token;

  if (!token) {
    throw new Error("Authentication required.");
  }

  // Merge the new Authorization header with existing headers
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // Call the native fetch with the injected headers
  return fetch(process.env.BACKEND_URL + url, {
    method,
    ...options,
    headers,
  });
}

export async function get<T>(
  url: string,
  options?: Omit<RequestInit, "method">
): Promise<T> {
  const response = await authFetch(url, "GET", options);

  // TODO: Some better error handling
  if (!response.ok) {
    throw new Error(
      `GET request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export async function post<T>(
  url: string,
  body: T,
  options?: Omit<RequestInit, "method" | "body">
): Promise<T> {
  const response = await authFetch(url, "POST", {
    ...options,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `POST request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export async function put<T>(
  url: string,
  body: T,
  options?: Omit<RequestInit, "method" | "body">
): Promise<T> {
  const response = await authFetch(url, "PUT", {
    ...options,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `PUT request failed: ${response.status} ${response.statusText}`
    );
  }

  if (response.status === 204) return {} as T;

  return response.json() as Promise<T>;
}

export async function remove(
  url: string,
  options?: Omit<RequestInit, "method">
): Promise<void> {
  const response = await authFetch(url, "DELETE", options);

  if (!response.ok) {
    throw new Error(
      `DELETE request failed: ${response.status} ${response.statusText}`
    );
  }
}
