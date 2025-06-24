export interface Medecin {
  id: string;
  specialite: string;
  user: {
    nom: string;
    prenom: string;
  };
}