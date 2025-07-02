"use client"
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSession() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setSession({ user: data.user });
    });
    // Optionnel : écouter les changements de session
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession({ user: session?.user });
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return session;
}