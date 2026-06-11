/**
 * Base URL for Django API.
 * Empty string = mock auth mode (no backend required).
 *
 * When Django is ready, set in .env:
 *   VITE_API_URL=http://localhost:8000
 */
export const API_URL = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/** Attach JWT to requests — same pattern you'll use with Django */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("access_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = "Something went wrong";
    try {
      const data = await response.json();
      message = data.detail || data.message || message;
    } catch {
      // response wasn't JSON
    }
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}
