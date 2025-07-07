import { useState } from "react";
import { useAvatarUploader } from "@/hooks/useAvatarUploader";

export function useCompletePatientProfileForm() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    dateNaissance: "",
    adresse: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { avatarUrl } = useAvatarUploader();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (res.ok) setSuccess(true);
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    success,
  };
}
