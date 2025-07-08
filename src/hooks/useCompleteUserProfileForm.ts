"use client";

import { useState, useEffect } from "react";
import { useAvatarUploader } from "@/hooks/useAvatarUploader";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export function useCompleteUserProfileForm() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    dateNaissance: "",
    adresse: "",
    specialite: "MEDECINE_GENERALE",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState<string>("PATIENT"); // valeur par défaut
  const [user, setUser] = useState<User>();
  const { avatarUrl } = useAvatarUploader();
  const supabase = createClient();

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: authUser, error } = await supabase.auth.getUser();

      if (error || !authUser|| !authUser?.user ) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        return;
      }

      const userRole = authUser.user.user_metadata?.role || "PATIENT";

      setUser(authUser.user);
      setRole(userRole);
    };

    fetchUserRole();
  }, [supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/patient/complete-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, avatarUrl }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      const data = await res.json();
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    success,
    role,
    user,
  };
}
