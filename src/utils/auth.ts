"use server"

import { createClient } from "@/lib/supabase/server";



/* implementera mes logique signup et signin plustard */
export async function signUpUser({
  email,
  password,
  repeatPassword,
  role,
  fonction,
  redirectPath
}: {
  email: string;
  password: string;
  repeatPassword: string;
  role: string;
  fonction: string;
  redirectPath: string;
}) {
  if (password !== repeatPassword) {
    return { error: "Passwords do not match" };
  }
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${redirectPath}`;
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          role,
          fonction,
        },
      },
    });
    if (error) throw error;
    return { error: null };
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function signUpPatient({ email, password, repeatPassword }: { email: string; password: string; repeatPassword: string; }) {
  return signUpUser({
    email,
    password,
    repeatPassword,
    role: "PATIENT",
    fonction: "USER",
    redirectPath: "/welcome",
  });
}

export async function signUpMedecin({ email, password, repeatPassword }: { email: string; password: string; repeatPassword: string; }) {
  return signUpUser({
    email,
    password,
    repeatPassword,
    role: "ADMIN",
    fonction: "MEDECIN",
    redirectPath: "/welcome",
  });
}

export async function loginWithRole({ email, password }: { email: string; password: string; }) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    // Récupérer les métadonnées de l'utilisateur
    const user = data.user;
    const role = user?.user_metadata?.role || "PATIENT";
    // Redirection selon le rôle
    if (role === "MEDECIN") {
      return { error: null, redirectTo: "/medecin" };
    } else if (role === "PATIENT") {
      return { error: null, redirectTo: "/patient" };
    } else {
      return { error: null, redirectTo: "/protected" };
    }
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "An error occurred", redirectTo: null };
  }
}
