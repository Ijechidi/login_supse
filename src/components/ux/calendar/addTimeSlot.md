refactore e composant pour lui permettre efficacement d ajouter des creau horraire en suivant ce exemple 

Input : 8h00 → 14h00 | Durée : 1h
Créneaux générés :
- 08:00 - 09:00
- 09:00 - 10:00
- 10:00 - 11:00
- 11:00 - 12:00
- 12:00 - 13:00
- 13:00 - 14:00

Le médecin choisit :
* heureDebut (ex: 2025-07-19T08:00:00)
* heureFin (ex: 2025-07-19T14:00:00)
* duree (en minutes, ex: 60 pour 1h)
* On génère des créneaux de :
   * heureDebut → heureDebut + duree
   * heureDebut + duree → heureDebut + 2 * duree
   * etc., jusqu’à heureFin
* Chaque créneau est enregistré dans la table Disponibilite.

le medcin peu ajouter un crenau de plus en cliquand sur une duree sans forcemnt mettre l intervale 

type GenerateDisponibilitesInput = {
  medecinId: string;
  date: Date; // ex: "2025-07-19"
  heureDebut: string; // ex: "08:00"
  heureFin: string;   // ex: "14:00"
  dureeMinutes: number;
};

function generateDisponibilites({
  medecinId,
  date,
  heureDebut,
  heureFin,
  dureeMinutes,
}: GenerateDisponibilitesInput) {
  const [hStart, mStart] = heureDebut.split(":").map(Number);
  const [hEnd, mEnd] = heureFin.split(":").map(Number);

  const startTime = new Date(date);
  startTime.setHours(hStart, mStart, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(hEnd, mEnd, 0, 0);

  const slots: {
    heureDebut: Date;
    heureFin: Date;
    medecinId: string;
    status: "LIBRE";
  }[] = [];

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