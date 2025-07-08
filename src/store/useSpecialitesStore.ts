"use client"
import { create } from "zustand";

interface Medecin {
  id: string;
  nom: string;
  prenom: string;
  avatarUrl?: string;
  specialite: string;
  telephone: string;
  isDisponible: boolean;
}

interface Specialite {
  nom: string;
  medecins: Medecin[];
}

interface SpecialitesStore {
  specialites: Specialite[];
  loading: boolean;
  fetchSpecialites: () => Promise<void>;
  getMedecinById: (id: string) => Medecin | undefined;
}

export const useSpecialitesStore = create<SpecialitesStore>((set, get) => ({
  specialites: [],
  loading: false,
  fetchSpecialites: async () => {
    set({ loading: true });
    const res = await fetch("/api/medical/specialites");
    const data = await res.json();
    set({ specialites: data, loading: false });
  },
  getMedecinById: (id: string) => {
    const { specialites } = get();
    for (const specialite of specialites) {
      const medecin = specialite.medecins.find((m) => m.id === id);
      if (medecin) return medecin;
    }
    return undefined;
  },
})); 