export type UserRole = "buyer" | "distributor";

export type User = {
  id: number;
  email: string;
  name: string;
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
  name: string;
  role: UserRole;
};

export type AuthError = {
  message: string;
};
