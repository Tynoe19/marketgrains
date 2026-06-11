import { apiFetch, API_URL } from "./api";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
  UserRole,
} from "../types/auth";

const MOCK_USERS_KEY = "marketgrains_mock_users";
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "marketgrains_user";

type StoredMockUser = {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  password: string;
};

/** Demo accounts — use these to test before Django exists */
const DEMO_USERS: StoredMockUser[] = [
  {
    id: 1,
    email: "buyer@demo.com",
    name: "Demo Buyer",
    role: "buyer",
    password: "demo123",
  },
  {
    id: 2,
    email: "distributor@demo.com",
    name: "Demo Distributor",
    role: "distributor",
    password: "demo123",
  },
];

function getMockUsers(): StoredMockUser[] {
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  const registered: StoredMockUser[] = stored ? JSON.parse(stored) : [];
  return [...DEMO_USERS, ...registered];
}

function saveMockUser(user: StoredMockUser) {
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  const registered: StoredMockUser[] = stored ? JSON.parse(stored) : [];
  registered.push(user);
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(registered));
}

function createMockToken(user: User): { access: string; refresh: string } {
  const payload = btoa(JSON.stringify({ id: user.id, role: user.role }));
  return {
    access: `mock-access.${payload}`,
    refresh: `mock-refresh.${payload}`,
  };
}

function persistSession(response: AuthResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, response.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh);
  localStorage.setItem(USER_KEY, JSON.stringify(response.user));
}

function toPublicUser(stored: StoredMockUser): User {
  return {
    id: stored.id,
    email: stored.email,
    name: stored.name,
    role: stored.role,
  };
}

/** Mock login — simulates POST /api/auth/login/ */
async function mockLogin(credentials: LoginCredentials): Promise<AuthResponse> {
  await delay(400);

  const user = getMockUsers().find(
    (u) =>
      u.email.toLowerCase() === credentials.email.toLowerCase() &&
      u.password === credentials.password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const publicUser = toPublicUser(user);
  const tokens = createMockToken(publicUser);
  const response = { ...tokens, user: publicUser };
  persistSession(response);
  return response;
}

/** Mock register — simulates POST /api/auth/register/ */
async function mockRegister(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  await delay(400);

  const exists = getMockUsers().some(
    (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
  );

  if (exists) {
    throw new Error("An account with this email already exists");
  }

  const newUser: StoredMockUser = {
    id: Date.now(),
    email: credentials.email,
    name: credentials.name,
    role: credentials.role,
    password: credentials.password,
  };

  saveMockUser(newUser);

  const publicUser = toPublicUser(newUser);
  const tokens = createMockToken(publicUser);
  const response = { ...tokens, user: publicUser };
  persistSession(response);
  return response;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isUsingMockAuth(): boolean {
  return !API_URL;
}

/** Login — calls Django when VITE_API_URL is set, otherwise uses mock */
export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  if (isUsingMockAuth()) {
    return mockLogin(credentials);
  }

  const response = await apiFetch<AuthResponse>("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  persistSession(response);
  return response;
}

/** Register — calls Django when VITE_API_URL is set, otherwise uses mock */
export async function register(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  if (isUsingMockAuth()) {
    return mockRegister(credentials);
  }

  const response = await apiFetch<AuthResponse>("/api/auth/register/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  persistSession(response);
  return response;
}

export function logout() {
  clearSession();
}
