export type UserRole = "buyer" | "distributor" | "admin";

export type User = {
  id: number;
  email: string;
  username: string;
  role: UserRole;
};

/** Matches Django REST + simplejwt response shape */
export type AuthResponse = {
  access: string;
  refresh: string;
  user: User;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  username: string;
  role: UserRole;
};

export type AuthError = {
  message: string;
};
