import { Navigate, Route, Routes } from "react-router-dom";
import { AuthSignIn, protectedRoutes } from ".";
import { useAuth } from "../contexts/useAuthContext";
import AuthLayout from "../Layout/AuthLayout";

const AppRouter = () => {
  const { session, role,  isUpdated } = useAuth();

  return (
    <Routes>
      {/* Public Route */}
      {(AuthSignIn || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={route.element}
        />
      ))}

      {/* ProtectedRoutes */}
      {(protectedRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            session ? (
              // If not updated and trying to access something other than /profile/edit → redirect
              isUpdated === 0 && route.path !== "/profile/edit" ? (
                <Navigate to="/profile/edit" replace />
              ) : route.role && route.role.includes(role) ? (
                <AuthLayout>{route.element}</AuthLayout>
              ) : (
                <Navigate to="/unauthorized" replace />
              )
            ) : (
              <Navigate
                to={{
                  pathname: "/auth/sign-in",
                  search: `?redirectTo=${route.path}`,
                }}
              />
            )
          }
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
