import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
  UserRole,
} from "../types/auth";
import {
  login as loginRequest,
  register as registerRequest,
  logout as logoutRequest,
  getStoredUser,
  getStoredToken,
} from "../services/authService";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (credentials: RegisterCredentials) => Promise<User>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app load, restore session from localStorage (survives page refresh)
  useEffect(() => {
    const storedUser = getStoredUser();
    const storedToken = getStoredToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const onTokenRefreshed = () => {
      const storedToken = getStoredToken();
      if (storedToken) setToken(storedToken);
    };

    const onSessionExpired = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener("auth:token-refreshed", onTokenRefreshed);
    window.addEventListener("auth:session-expired", onSessionExpired);

    return () => {
      window.removeEventListener("auth:token-refreshed", onTokenRefreshed);
      window.removeEventListener("auth:session-expired", onSessionExpired);
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await loginRequest(credentials);
    setUser(response.user);
    setToken(response.access);
    return response.user;
  };

  const register = async (credentials: RegisterCredentials) => {
    const response = await registerRequest(credentials);
    setUser(response.user);
    setToken(response.access);
    return response.user;
  };

  const logout = () => {
    logoutRequest();
    setUser(null);
    setToken(null);
  };

  const hasRole = (role: UserRole) => user?.role === role;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
