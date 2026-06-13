
import { apiFetch } from "./api";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth";

/** LocalStorage keys */
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "marketgrains_user";

/** Save session data */
function persistSession(response: AuthResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, response.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh);

  if (response.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
  }
}

/** LOGIN */
export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>("accounts/login/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  persistSession(response);
  return response;
}

/** REGISTER */
export async function register(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>("accounts/register/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  persistSession(response);
  return response;
}

/** GET CURRENT USER */
export async function getMe(): Promise<User> {
  const user = await apiFetch<User>("accounts/me/", {
    method: "GET",
  });

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

/** GET stored user */
export function getStoredUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

/** GET token */
export function getStoredToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/** LOGOUT */
export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}