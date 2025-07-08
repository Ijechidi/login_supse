"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AvatarUploader from "@/components/user/AvatarUploader";
import { useCompleteUserProfileForm } from "@/hooks/useCompleteUserProfileForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HeartPlus, HeartPulse } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


export default function CompleteUserProfileForm() {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    success,
    role,
    user,
  } = useCompleteUserProfileForm();

  const router = useRouter();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push(role === "MEDECIN" ? "/medecin" : "/patient");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router, role]);

  if (success) {
    return (
      <div className="text-lg font-medium text-center mt-4">
        Profil complété avec succès ! Redirection...
      </div>
    );
  }


  const specialites = [
    { value: "MEDECINE_GENERALE", label: "Médecine générale" },
    { value: "CARDIOLOGIE", label: "Cardiologie" },
    { value: "DERMATOLOGIE", label: "Dermatologie" },
    { value: "PEDIATRIE", label: "Pédiatrie" },
    { value: "GYNECOLOGIE", label: "Gynécologie" },
    { value: "NEUROLOGIE", label: "Neurologie" },
    { value: "OPHTALMOLOGIE", label: "Ophtalmologie" },
    { value: "ORTHOPEDIE", label: "Orthopédie" },
  ]

  const handleSpecialiteChange = (value: string) => {
    handleChange({ target: { name: "specialite", value } } as React.ChangeEvent<HTMLInputElement>);
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto p-2 text-white"
    >
      {user && 
      
      <div className="flex justify-center items-center">
        
       <h1>Bienvenue, DR. {user.user_metadata.nom || user.email } </h1> 
        
        <span> {role === "PATIENT" ? <HeartPulse className="opacity-50 " /> : <HeartPlus className="opacity-50"/>}   </span>
        
        </div>} 
      <AvatarUploader  />
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
      {role === "MEDECIN" && (
  <div className="flex flex-col gap-1">
    <Label htmlFor="specialite">Spécialité</Label>
    <Select
      value={form.specialite}
      onValueChange={handleSpecialiteChange}
    >
      <SelectTrigger id="specialite" className="w-full">
        <SelectValue placeholder="Choisissez une spécialité" />
      </SelectTrigger>
      <SelectContent>
        {specialites.map((spec) => (
          <SelectItem key={spec.value} value={spec.value}>
            {spec.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)}

      {/* Ici, tu peux ajouter des champs spécifiques au médecin si besoin, selon le rôle */}
      <Button type="submit" disabled={loading} className="mt-2">
        {loading ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
} 