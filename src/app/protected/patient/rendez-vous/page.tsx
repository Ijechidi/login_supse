
import MedecinList from '@/components/medecin/MedecinList';
import TextHeader from '@/components/medecin/TextHeader';


/**
 * Page principale pour la prise de rendez-vous patient.
 * Utilise le composant modulaire RendezVousForm.
 */
export default function PriseRendezVousPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br w-screen from-gray-50 to-gray-100 py-8 px-4">
      <TextHeader />
<MedecinList />
      {/* <RendezVousForm /> */}
    </div>
  );
}
