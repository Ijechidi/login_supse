"use client"
import { create } from "zustand";
import { Medecin } from "@/components/ux/ProfileCard";
import { getAllMedecins } from "@/lib/actions/medecins";

interface MedecinsState {
  medecins: Medecin[];
  loading: boolean;
  error: string | null;
  fetchMedecins: () => Promise<void>;
  setMedecins: (medecins: Medecin[]) => void;
}

export const useMedecinsStore = create<MedecinsState>((set) => ({
  medecins: [],
  loading: false,
  error: null,
  setMedecins: (medecins) => set({ medecins }),
  fetchMedecins: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllMedecins();
      console.log("medecins :",data)
      set({ medecins: data, loading: false });
    } catch (e: any) {
      set({ error: e.message || "Erreur lors du chargement des médecins", loading: false });
    }
  },
})); 