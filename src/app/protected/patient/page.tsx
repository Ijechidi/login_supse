'use client';
import RendezVousForm from '@/components/rendezvous/RendezVousForm';

/**
 * Page principale pour la prise de rendez-vous patient.
 * Utilise le composant modulaire RendezVousForm.
 */
export default function PriseRendezVousPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <RendezVousForm />
    </div>
  );
}
