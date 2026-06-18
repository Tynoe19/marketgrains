import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/authContext";
import type { UserRole } from "../types/auth";

type AuthMode = "login" | "register";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, user } = useAuth();

  const [role, setRole] = useState<UserRole>("buyer");
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Where to send user after login (e.g. if they tried to visit /distributor first)
  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? null;

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (user.role === "distributor") {
      navigate(redirectTo ?? "/distributor", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, user, navigate, redirectTo]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      let user;

      if (mode === "login") {
        user = await login({ email, password });
      } else {
        user = await register({ email, password, username, role });
      }

      // Redirect based on role and where they came from
      if (redirectTo && user.role === "distributor") {
        navigate(redirectTo, { replace: true });
      } else if (user.role === "distributor") {
        navigate("/distributor", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="solid" />

      <div className="pt-28 pb-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-gray-500">
              {role === "buyer"
                ? "Sign in to shop organic grains for your home."
                : "Register to access wholesale packages and earn commissions."}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  role === "buyer"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setRole("distributor")}
                className={`py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  role === "distributor"
                    ? "bg-white text-amber-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Distributor
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Tendai Moyo"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold transition-colors"
              >
                {isSubmitting
                  ? "Please wait..."
                  : mode === "login"
                    ? "Sign in"
                    : "Create account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            <Link to="/" className="hover:text-green-600 transition-colors">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
