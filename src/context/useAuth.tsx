"use client";

import supabase from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthContextType {
  session: Session | null;
  signIn: (formValues: { email: string; password: string }) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (formValues: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword(formValues);
      if (error) throw error;
      setSession(data.session);
      toast.success("Login successful");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // get initial session
  const getInitialSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (!error) {
      setSession(data.session);
    }
  };

  useEffect(() => {
    getInitialSession();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ session, signIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
