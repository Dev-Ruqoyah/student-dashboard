import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../supabaseClient";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  role: string;
  session: Session | null;
  loading: boolean;
  isUpdated: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth-session");
    return stored ? JSON.parse(stored)?.user ?? null : null;
  });
  const [role, setRole] = useState<string>(() => {
    const stored = localStorage.getItem("auth-session");
    return stored ? JSON.parse(stored)?.user?.user_metadata?.role ?? "" : "";
  });
  const [session, setSession] = useState<Session | null>(() => {
    const stored = localStorage.getItem("auth-session");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);
  const [isUpdated, setUpdated] = useState<number | null>(null);

  // fetch user update
  const fetchProfile = async (userId: string) => {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("is_updated")
      .eq("id", userId)
      .single();

    if (profiles) {
      setUpdated(profiles.is_updated);
    }
    if (error) {
      console.error(error);
    }
  };

  // 🔹 Fetch initial session
  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error.message);
    }

    if (data.session) {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setRole(data.session?.user?.user_metadata?.role ?? "");
      localStorage.setItem("auth-session", JSON.stringify(data.session)); // ✅ consistent key
      
    } else {
      localStorage.removeItem("auth-session");
    }
    setLoading(false);
    if (data.session?.user?.id) {
      fetchProfile(data.session.user.id);
    }
  };

  useEffect(() => {
    fetchSession();

    // 🔹 Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setRole(session?.user?.user_metadata?.role ?? "");
      setSession(session);
      setLoading(false);

      if (session) {
        localStorage.setItem("auth-session", JSON.stringify(session));
          fetchProfile(session.user.id);
      } else {
        localStorage.removeItem("auth-session");
        setUpdated(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, session, loading, isUpdated }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Custom hook for accessing auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
