"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AvatarUploader from "@/components/user/AvatarUploader";
import { useCompletePatientProfileForm } from "@/hooks/useCompletePatientProfileForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CompletePatientProfileForm() {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    success,
  } = useCompletePatientProfileForm();

  const supabase = createClient()
  const user = supabase.auth.getUser();
if (!user) {
   

}

  //  

  const router = useRouter();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/patient");
      }, 2000); 

      return () => clearTimeout(timer); 
    }
  }, [success, router]);

 
  if (success) {
    return (
      <div className="text-lg font-medium text-center mt-4">
        Profil complété avec succès ! Redirection...
      </div>
    );
  
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto p-2 text-white"
    >
      <AvatarUploader />

      <div className="flex flex-col gap-1">
        <Label htmlFor="nom">Nom</Label>
        <Input
          id="nom"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="prenom">Prénom</Label>
        <Input
          id="prenom"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="telephone">Téléphone</Label>
        <Input
          id="telephone"
          name="telephone"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="dateNaissance">Date de naissance</Label>
        <Input
          id="dateNaissance"
          name="dateNaissance"
          type="date"
          value={form.dateNaissance}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="adresse">Adresse</Label>
        <Input
          id="adresse"
          name="adresse"
          placeholder="Adresse"
          value={form.adresse}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="mt-2">
        {loading ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
}
