"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { createClient } from "@/lib/supabase/client";

export interface AuthUser {
    email: string | null;
    id: string | null;
    nom: string | null;
    prenom: string | null;
    name: string | null;
    avatarUrl: string | null;
    role: string;
    function: string;
    userPId: string | null;
    telephone: string | null;
    dateNaissance: string | null;
    adresse: string | null;
    sexe: string | null;
    completedProfile: boolean;
    nextVisit: string | null;
    lastVisit: string | null;
  }
  

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  const formatUser = (supabaseUser: any): AuthUser => {
    const meta = supabaseUser.user_metadata || {};

    return {
      email: supabaseUser.email || null,
      id: supabaseUser.id || null,
      nom: meta.nom || supabaseUser.email?.split("@")[0] || null,
      prenom: meta.prenom || null,
      name: meta.name || supabaseUser.email?.split("@")[0] || null,
      avatarUrl: meta.avatar_url || "/favicon.ico",
      role: meta.role || "PATIENT",
      function: meta.fonction || "USER",
      userPId: meta.prisma_user_id || null,
      telephone: meta.telephone || null,
      dateNaissance: meta.dateNaissance || null,
      adresse: meta.adresse || null,
      sexe: meta.sexe || null,
      completedProfile: Boolean(meta.completedProfile),
      nextVisit: meta.next_visit || null,
      lastVisit: meta.last_visit || null,
    };
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      const formatted = formatUser(data.user);
      setUser(formatted);
      setLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session?.user) {
          setUser(null);
        } else {
          const formatted = formatUser(session.user);
          setUser(formatted);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const value = useMemo(
    () => ({ user, setUser, loading }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
