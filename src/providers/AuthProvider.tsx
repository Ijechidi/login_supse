"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getUserInfo } from "@/lib/users/getUserInfo";

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const userInfo = await getUserInfo();
      setUser(userInfo);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}