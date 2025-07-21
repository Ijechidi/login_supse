import React from 'react';
import { getPatientsByMedecinId } from '@/lib/actions/medecins';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Heart, Clock, Users, TrendingUp } from 'lucide-react';
import PatientSearch from './PatientSearch'; // Importer le composant client

const PatientsPage = async ({ medecinId }) => {
  const patientsData = await getPatientsByMedecinId(medecinId);
  const initialPatients = patientsData.map(pm => ({
    ...pm.patient.user,
    suiviDepuis: pm.suiviDepuis,
  }));
  
  // Statistiques calculées côté serveur
  const stats = {
    total: initialPatients.length,
    nouveaux: initialPatients.filter(p => {
      const suiviDepuis = new Date(p.suiviDepuis);
      const unMoisAgo = new Date();
      unMoisAgo.setMonth(unMoisAgo.getMonth() - 1);
      return suiviDepuis > unMoisAgo;
    }).length,
    anciens: initialPatients.filter(p => {
      const suiviDepuis = new Date(p.suiviDepuis);
      const unAnAgo = new Date();
      unAnAgo.setFullYear(unAnAgo.getFullYear() - 1);
      return suiviDepuis < unAnAgo;
    }).length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-3 rounded-lg">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Mes Patients</h1>
                <p className="text-muted-foreground mt-1">
                  Gestion et suivi de vos {initialPatients.length} patient{initialPatients.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Button variant="ghost" className='border font-semibold'>
              <Link href={"/medecin/rendez-vous"} >
                Planning
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Patients</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats.total}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Nouveaux (30j)</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats.nouveaux}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Suivi Long (1an+)</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats.anciens}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Composant de recherche et de liste (Client Component) */}
        <PatientSearch initialPatients={initialPatients} />

      </div>
    </div>
  );
};

export default PatientsPage;