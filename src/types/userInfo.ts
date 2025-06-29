export type UserInfo = {
  email: string | null;
  id: string | null;
  name: string | null;
  nom: string | null;
  prenom: string | null;
  avatarUrl: string;
  role: 'PATIENT' | 'MEDECIN' | 'ADMIN' | 'SECRETAIRE';
  function: string;
  userPId: string | null;
  telephone: string | null;
  dateNaissance: string | null;
  adresse: string | null;
  sexe: 'H' | 'F' | 'AUTRE' | null;
  completedProfile: boolean;
  nextVisit: string | null;
  lastVisit: string | null;
};
