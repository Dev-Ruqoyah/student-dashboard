import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AuthError } from "@supabase/supabase-js";
import { signIn } from "../../contexts/useLoginService";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [visible, setVisible] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-secondary/10">
      {/* Left Content */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-secondary to-primary text-white p-12">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
          <p className="text-lg text-gray-100">
            Sign in to your account and continue your journey with us. Manage
            everything in one place with ease.
          </p>
          <img
            src="/assets/svg/illustration.svg"
            alt="Login Illustration"
            className="mt-10 w-80 mx-auto drop-shadow-lg"
          />
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Sign In
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Please enter your credentials to continue
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // setLoading(true);

                await signIn(values.email, values.password);
                // const params = new URLSearchParams(location.search);
                // const redirectTo = params.get("redirectTo") || "/dashboard";
                // navigate(redirectTo, { replace: true });
                navigate("/dashboard");
                toast.success("Login successful");
              } catch (error) {
                const authError = error as AuthError;

                console.error("Login failed ", error);
                console.log(error);
                toast.error(`Login failed: ${authError?.message || error}`);
              } finally {
                setSubmitting(false);
                // setLoading(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={visible ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {visible ? (
                        <FaEyeSlash
                          onClick={() => setVisible(!visible)}
                          className="cursor-pointer"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setVisible(!visible)}
                          className="cursor-pointer"
                        />
                      )}
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Remember me + Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-secondary" />
                    Remember me
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-secondary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social login */}
          <button className="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a href="/auth/sign-up" className="text-secondary hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
