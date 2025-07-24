import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Filtre les disponibilités pour une date donnée (YYYY-MM-DD)
 * @param disponibilites Array de disponibilités (doit contenir heureDebut)
 * @param date Date sélectionnée (ou null)
 * @returns Array filtré
 */
export function filterDisponibilitesByDate(disponibilites: any[], date: Date | null) {
  if (!date) return disponibilites;
  return disponibilites.filter(d => {
    const dDate = d.heureDebut instanceof Date ? d.heureDebut : new Date(d.heureDebut);
    return dDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
  });
}


/* 
filtre des rendevous par patientId
*/

export function filterRendezVousByPatientId(rendezVous: any[], patientId: string) {
  return rendezVous.filter((rdv) => rdv.patientId === patientId);
}


/* format heure pour disponibiliter */

export function formatHeure(date: Date): string {
  const heures = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${heures}h:${minutes}`;
}




// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;



  export function calculateAge(birthDate: string): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  }