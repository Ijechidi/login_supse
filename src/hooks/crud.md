# Exemples d'utilisation des fonctions CRUD avec les hooks React Query

## 1. Gestion des disponibilités (useDisponibilites)

```tsx
import { useDisponibilites } from "@/hooks/useDisponibilites";

const { 
  disponibilites, 
  createDisponibilite, 
  updateDisponibilite, 
  removeDisponibilite, 
  loading, 
  error 
} = useDisponibilites({ medecinId: "ID_DU_MEDECIN" });

// Créer une disponibilité
createDisponibilite.mutate({
  medecinId: "ID_DU_MEDECIN",
  heureDebut: new Date(),
  heureFin: new Date(),
  meta: {}
});

// Modifier une disponibilité
updateDisponibilite.mutate({ 
  id: "ID_DISPONIBILITE", 
  data: { heureDebut: new Date() } 
});

// Supprimer une disponibilité
removeDisponibilite.mutate("ID_DISPONIBILITE");
```

---

## 2. Gestion des rendez-vous (useRendezVous)

```tsx
import { useRendezVous } from "@/hooks/useRendezVous";
import { TypeRendezVousEnum, Statut } from "@prisma/client";

const { 
  rendezVous, 
  createRendezVous, 
  updateRendezVous, 
  removeRendezVous, 
  loading, 
  error 
} = useRendezVous("ID_DU_MEDECIN");

// Créer un rendez-vous
createRendezVous.mutate({
  patientId: "ID_PATIENT",
  medecinId: "ID_DU_MEDECIN",
  disponibiliteId: "ID_DISPONIBILITE",
  type: TypeRendezVousEnum.CONSULTATION,
  dateDebut: new Date(),
  motif: "Motif du rendez-vous",
  statut: Statut.EN_ATTENTE
});

// Modifier un rendez-vous
updateRendezVous.mutate({ 
  id: "ID_RENDEZVOUS", 
  data: { statut: Statut.CONFIRME } 
});

// Supprimer un rendez-vous
removeRendezVous.mutate("ID_RENDEZVOUS");
```

---

**Remarques :**
- Les mutations sont optimistes : l'UI se met à jour instantanément.
- Les hooks exposent aussi les états `loading`, `error`, etc. pour gérer l'affichage.
- cas d'erreur et à informer l'utilisateur (toast, message, etc.).
