import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { LoadingState } from "./LoadingState.jsx";

export function ProtectedRoute() {
  const { bootState, isAuthenticated } = useAuth();
  const location = useLocation();

  if (bootState === "loading") {
    return <LoadingState label="Checking session…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
