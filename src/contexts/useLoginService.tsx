import { supabase } from "../supabaseClient";

// 🔹 Sign in with email/password
export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  
};

// 🔹 Sign up new user
export const signUp = async ({
  email,
  password,
  first_name,
  last_name,
}: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        role: "student",
      },
    },
  });

  if (error) throw error;

  console.log("✅ Signup success, confirmation email sent.");

  // Listener will update user/isAuthenticated if session is returned
};

// 🔹 Sign out user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  
};
