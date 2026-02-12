import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { Linking } from "react-native";
import { supabase } from "../lib/supabase";
import { AuthContextProps } from "../types/auth";

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        supabase.auth.initialize();
      }
    });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
