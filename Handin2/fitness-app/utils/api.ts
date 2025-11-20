import { authenticatedFetch } from "./authFetch";

export async function get<T>(
  url: string,
  options?: Omit<RequestInit, "method">
): Promise<T> {
  const response = await authenticatedFetch(url, "GET", options);

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
  const response = await authenticatedFetch(url, "POST", {
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
  const response = await authenticatedFetch(url, "PUT", {
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
  const response = await authenticatedFetch(url, "DELETE", options);

  if (!response.ok) {
    throw new Error(
      `DELETE request failed: ${response.status} ${response.statusText}`
    );
  }
}
