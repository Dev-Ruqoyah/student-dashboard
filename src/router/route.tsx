import { Navigate, Route, Routes } from "react-router-dom";
import { AuthSignIn, protectedRoutes } from ".";
import { useAuth } from "../contexts/useAuthContext";
import AuthLayout from "../Layout/AuthLayout";
import LoadingScreen from "../components/Loader/SpinnerLoader";

const AppRouter = () => {
  const { session, role, isUpdated, loading } = useAuth();
  // console.log(isUpdated);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              isUpdated === null ? (
                <LoadingScreen/>
              ) : isUpdated === 0 && route.path !== "/profile/edit" ? (
                <Navigate to="/profile/edit" replace />
              ) : route.role && route.role.includes(role) ? (
                <AuthLayout>{route.element}</AuthLayout>
              ) : (
                <Navigate to="/unauthorized" replace />
              )
            ) : (
              <Navigate to={`/auth/sign-in?redirectTo=${route.path}`} />
            )
          }
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
