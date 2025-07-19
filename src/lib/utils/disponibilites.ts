export interface GenerateDisponibilitesInput {
  medecinId: string;
  date: Date;
  heureDebut: string;
  heureFin: string;
  dureeMinutes: number;
}

export interface DisponibiliteSlot {
  heureDebut: Date;
  heureFin: Date;
  medecinId: string;
  status: "LIBRE";
}

export function generateDisponibilites({
  medecinId,
  date,
  heureDebut,
  heureFin,
  dureeMinutes,
}: GenerateDisponibilitesInput): DisponibiliteSlot[] {
  const [hStart, mStart] = heureDebut.split(":").map(Number);
  const [hEnd, mEnd] = heureFin.split(":").map(Number);

  const startTime = new Date(date);
  startTime.setHours(hStart, mStart, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(hEnd, mEnd, 0, 0);

  const slots: DisponibiliteSlot[] = [];

  let current = new Date(startTime);
  while (current < endTime) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current.getTime() + dureeMinutes * 60 * 1000);

    if (slotEnd > endTime) break;

    slots.push({
      heureDebut: slotStart,
      heureFin: slotEnd,
      medecinId,
      status: "LIBRE",
    });

    current = slotEnd;
  }

  return slots;
}

export function createSingleDisponibilite({
  medecinId,
  date,
  heureDebut,
  heureFin,
}: {
  medecinId: string;
  date: Date;
  heureDebut: string;
  heureFin: string;
}): DisponibiliteSlot {
  const [hStart, mStart] = heureDebut.split(":").map(Number);
  const [hEnd, mEnd] = heureFin.split(":").map(Number);
  
  const startTime = new Date(date);
  startTime.setHours(hStart, mStart, 0, 0);
  
  const endTime = new Date(date);
  endTime.setHours(hEnd, mEnd, 0, 0);
  
  return {
    heureDebut: startTime,
    heureFin: endTime,
    medecinId,
    status: "LIBRE",
  };
}

export function validateDisponibiliteInput({
  heureDebut,
  heureFin,
  duree,
  isMultipleSlots,
}: {
  heureDebut: string;
  heureFin: string;
  duree: number;
  isMultipleSlots: boolean;
}): { isValid: boolean; errors: { debut?: string; fin?: string; duree?: string } } {
  const errors: { debut?: string; fin?: string; duree?: string } = {};
  
  if (!heureDebut) errors.debut = "Heure de début requise";
  if (!heureFin) errors.fin = "Heure de fin requise";
  if (isMultipleSlots && (!duree || duree < 15)) errors.duree = "Durée minimale : 15 minutes";
  
  if (heureDebut && heureFin) {
    const [sh, sm] = heureDebut.split(":").map(Number);
    const [eh, em] = heureFin.split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    
    if (end <= start) errors.fin = "L'heure de fin doit être après le début";
    if (isMultipleSlots && end - start < duree) errors.duree = "Durée trop longue pour l'intervalle";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
} 