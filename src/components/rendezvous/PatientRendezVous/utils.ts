// utils.ts
import { Statut } from './types';

// Fonction pour formater la date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

// Fonction pour formater l'heure
export const formatHeure = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Fonction pour obtenir la couleur du statut
export const getStatutColor = (statut: Statut): string => {
  switch (statut) {
    case Statut.confirme:
      return 'bg-green-100 text-green-800 border-green-200';
    case Statut.en_attente:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case Statut.annule:
      return 'bg-red-100 text-red-800 border-red-200';
    case Statut.termine:
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Fonction pour obtenir le texte du statut
export const getStatutText = (statut: Statut): string => {
  switch (statut) {
    case Statut.confirme:
      return 'Confirmé';
    case Statut.en_attente:
      return 'En attente';
    case Statut.annule:
      return 'Annulé';
    case Statut.termine:
      return 'Terminé';
    default:
      return statut;
  }
};