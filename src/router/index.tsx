import { Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/student/Dashboard";
import Register from "../pages/auth/Register";
import Unauthorized from "../pages/(other)/Unauthorized";
import Courses from "../pages/dashboard/student/Courses";
import Profile from "../pages/dashboard/student/Profile";
import ProfileEdit from "../pages/dashboard/student/ProfileEdit";

export const AuthSignIn = [
  {
    path: "/auth/sign-in",
    name: "Sign In",
    element: <Login />,
  },
  {
    path: "/auth/sign-up",
    name: "Sign Up",
    element: <Register />,
  },
];

const initialRoute = [
  {
    path: "/",
    name: "Dashboard",
    element: <Navigate to={"/dashboard"} />,
    role: ["admin", "student"],
  },
];

export const studentRoute = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    role: ["admin", "student"],
  },
  {
    path: "/courses",
    name: "Courses",
    element: <Courses />,
    role: ["admin", "student"],
  },
  {
    path: "/profile",
    name: "Profile",
    element: <Profile />,
    role: ["admin","student"],
  },
  {
    path: "/profile/edit",
    name: "Profile Edit",
    element: <ProfileEdit />,
    role: ["admin","student"],
  },
];

const adminRoute = [
  {
    path: "/admin",
    name: "Admin Panel",
    element: <div>Admin Panel - Access Restricted to Admins</div>,
    role: ["admin"],
  },
];

const Unauthorizedroute = [
  {
    path: "/unauthorized",
    name: "Unauthorized",
    element: <Unauthorized />,
    role: ["admin", "student", "null"],
  },
];

export const protectedRoutes = [
  ...studentRoute,
  ...initialRoute,
  ...adminRoute,
  ...Unauthorizedroute,
];
