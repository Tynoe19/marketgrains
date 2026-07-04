

import { logout, refreshAccessToken } from "./authService";

const isAuthRoute = (path: string) =>
  path.startsWith("accounts/login/") ||
  path.startsWith("accounts/register/") ||
  path.startsWith("accounts/refresh/");

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/";

let refreshPromise: Promise<string> | null = null;

function getRefreshedAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

// custom error class to include HTTP status code
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
  options: RequestInit = {},
  retried = false
): Promise<T> {
  const token = localStorage.getItem("access_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(!isAuthRoute(path) && token
      ? { Authorization: `Bearer ${token}` }
      : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && !isAuthRoute(path) && !retried) {
    try {
      await getRefreshedAccessToken();
      return apiFetch<T>(path, options, true);
    } catch {
      logout();
      throw new ApiError("Session expired. Please log in again.", 401);
    }
  }

  if (!response.ok) {
    let message = "Something went wrong";
    try {
      const data = await response.json();
      message = data.detail || data.message || data.non_field_errors?.[0] || message;
    } catch {
      // response wasn't JSON
    }
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}
