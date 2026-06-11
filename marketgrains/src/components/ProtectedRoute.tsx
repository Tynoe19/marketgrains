import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { UserRole } from "../types/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: UserRole;
};

/**
 * Wraps routes that need authentication.
 * - No user → redirect to /login
 * - Wrong role → redirect to home
 */
export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
