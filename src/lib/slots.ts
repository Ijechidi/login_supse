 
/**
 * Mappe les disponibilités et rendez-vous en créneaux horaires pour l'affichage patient
 * @param disponibilites Array de disponibilités filtrées pour la date
 * @param rendezVous Array de rendez-vous pour la date
 * @returns Array de slots { time, available, rendezVous }
 */
export function mapDisponibilitesToSlots(disponibilites: any[], rendezVous: any[]) {
  return disponibilites.map(d => {
    const rdv = rendezVous.find(r => {
      const rdvDebut = new Date(r.dateDebut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dispoDebut = (d.heureDebut instanceof Date ? d.heureDebut : new Date(d.heureDebut)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return rdvDebut === dispoDebut;
    });
    return {
      time: (d.heureDebut instanceof Date ? d.heureDebut : new Date(d.heureDebut)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      available: !rdv,
      rendezVous: rdv,
    };
  });
} 