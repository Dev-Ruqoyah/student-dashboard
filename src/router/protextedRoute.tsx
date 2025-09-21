import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuthContext";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(location);
  if (!user) {
    return (
      <Navigate to={`/auth/sign-in?redirectTo=${location.pathname}`} replace />
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;
