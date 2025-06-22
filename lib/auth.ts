"use server"

import { createClient } from "./supabase/server";

/* implementera mes logique signup et signin plustard */
export async function signUpPatient({ email, password, repeatPassword }: { email: string; password: string; repeatPassword: string; }) {
  if (password !== repeatPassword) {
    return { error: "Passwords do not match" };
  }
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
       emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/protected`,
        data:{
          role:"PATIENT",
          fonction: "USER"
        }
      },
    });
    if (error) throw error;
    return { error: null };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "An error occurred" };
  }
}



export async function signUpMedecin({ email, password, repeatPassword }: { email: string; password: string; repeatPassword: string; }) {
  if (password !== repeatPassword) {
    return { error: "Passwords do not match" };
  }
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/protected`,
                data:{
          role:"ADMIN",
          fonction:"MEDECIN"
        }
      },
    });
    if (error) throw error;
    return { error: null };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "An error occurred" };
  }
}
