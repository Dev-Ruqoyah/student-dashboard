import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../contexts/useLoginService";
import { toast } from "react-toastify";

// Validation schema
const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-fit grid grid-cols-1 md:grid-cols-2 bg-secondary/10">
      {/* Left Content */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-secondary to-primary text-white p-12">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Join Us 🚀</h1>
          <p className="text-lg text-gray-100">
            Create your account today and start managing everything in one place
            with ease.
          </p>
          <img
            src="/assets/svg/illustration.svg"
            alt="Register Illustration"
            className="mt-10 w-80 mx-auto drop-shadow-lg"
          />
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center md:h-auto h-screen px-6 sm:px-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Fill in the details to get started
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setLoading(true);

                // Supabase signup call (assuming signUp is wired to supabase.auth.signUp)
                await signUp({
                  email: values.email,
                  password: values.password,
                  first_name: values.first_name,
                  last_name: values.last_name,
                });
                toast.success("Check your mail to verify your email")
                navigate("/auth/sign-in");
                // console.log("Register success", values);
              } catch (error) {
                console.error("Register failed ", error);
              } finally {
                setSubmitting(false);
                setLoading(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <Field
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <Field
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full bg-secondary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
                >
                  {isSubmitting || loading ? "Creating account..." : "Sign Up"}
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

          {/* Social Register */}
          <button className="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/auth/sign-in" className="text-secondary hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
