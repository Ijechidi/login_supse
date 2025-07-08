"use client"
import { useEffect } from "react";
import { useSpecialitesStore } from "@/store/useSpecialitesStore";

export function useSpecialites() {
  const { specialites, loading, fetchSpecialites } = useSpecialitesStore();

  useEffect(() => {
    if (specialites.length === 0 && !loading) {
      fetchSpecialites();
    }
  }, [specialites.length, loading, fetchSpecialites]);

  return { specialites, loading };
} 