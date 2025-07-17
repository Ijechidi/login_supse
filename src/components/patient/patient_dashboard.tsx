'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  Bell, 
  Plus, 
  Search,
  Phone,
  Mail,
  MapPin,
  Activity,
  Stethoscope,
  CalendarDays,
  UserCircle,
  Settings,
  ChevronRight,
  Star,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import Linky from 'next/link';


// Types basés sur le schéma Prisma
interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  avatarUrl?: string;
  telephone: string;
  age?: number;
  role: 'PATIENT' | 'MEDECIN' | 'ADMIN' | 'SECRETAIRE';
}

interface Patient {
  id: string;
  userId: string;
  meta?: any;
  user: User;
}

interface Medecin {
  id: string;
  userId: string;
  specialite: string;
  description?: string;
  user: User;
}

interface TypeRendezVous {
  id: string;
  nom: string;
  code: string;
  couleur?: string;
  description?: string;
}

interface RendezVous {
  id: string;
  patientId: string;
  medecinId: string;
  dateDebut: string;
  dateFin?: string;
  motif: string;
  statut: 'en_attente' | 'confirme' | 'annule' | 'termine';
  historique?: any;
  meta?: any;
  type: TypeRendezVous;
  medecin: Medecin;
}

interface MedecinFavori {
  id: string;
  nom: string;
  specialite: string;
  note: number;
  prochaineDispo: string;
}

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Données simulées basées sur le schéma
  const patientData: User = {
    id: "patient-1",
    email: "marie.dupont@email.com",
    nom: "Dupont",
    prenom: "Marie",
    telephone: "01 23 45 67 89",
    age: 32,
    role: 'PATIENT',
    avatarUrl: undefined
  };

  const prochainRdv: RendezVous = {
    id: "1",
    patientId: "patient-1",
    medecinId: "medecin-1",
    type: "type-1",
    dateDebut: "2025-07-15T10:00:00",
    motif: "Consultation générale",
    statut: "confirme",
    medecin: {
      id: "medecin-1",
      userId: "user-medecin-1",
      specialite: "Médecine générale",
      user: {
        id: "user-medecin-1",
        email: "dr.martin@clinic.com",
        nom: "Martin",
        prenom: "Dr.",
        telephone: "01 23 45 67 90",
        role: 'MEDECIN'
      }
    },
    type: {
      id: "type-1",
      nom: "Consultation",
      code: "consultation",
      couleur: "#00b894"
    }
  };

  const rdvRecents: RendezVous[] = [
    {
      id: "2",
      patientId: "patient-1",
      medecinId: "medecin-2",
      dateDebut: "2025-07-01T14:30:00",
      motif: "Suivi post-opératoire",
      statut: "termine",
      medecin: {
        id: "medecin-2",
        userId: "user-medecin-2",
        specialite: "Chirurgie",
        user: {
          id: "user-medecin-2",
          email: "dr.bernard@clinic.com",
          nom: "Bernard",
          prenom: "Dr.",
          telephone: "01 23 45 67 91",
          role: 'MEDECIN'
        }
      },
      type: SUIVI
    },
    {
      id: "3",
      patientId: "patient-1",
      medecinId: "medecin-1",
      type: "type-1",
      dateDebut: "2025-06-15T09:15:00",
      motif: "Contrôle de routine",
      statut: "termine",
      medecin: {
        id: "medecin-1",
        userId: "user-medecin-1",
        specialite: "Médecine générale",
        user: {
          id: "user-medecin-1",
          email: "dr.martin@clinic.com",
          nom: "Martin",
          prenom: "Dr.",
          telephone: "01 23 45 67 90",
          role: 'MEDECIN'
        }
      },
      type: {
        id: "type-1",
        nom: "Consultation",
        code: "consultation",
        couleur: "#00b894"
      }
    }
  ];

  const medecinsFavoris: MedecinFavori[] = [
    {
      id: "1",
      nom: "Dr. Martin",
      specialite: "Médecine générale",
      note: 4.8,
      prochaineDispo: "Demain 14h"
    },
    {
      id: "2", 
      nom: "Dr. Bernard",
      specialite: "Chirurgie",
      note: 4.9,
      prochaineDispo: "Vendredi 16h"
    }
  ];

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (statut: RendezVous['statut']): string => {
    switch(statut) {
      case 'confirme': return 'bg-secondary/20 text-secondary-foreground border-secondary/30';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'annule': return 'bg-destructive/20 text-destructive-foreground border-destructive/30';
      case 'termine': return 'bg-muted text-muted-foreground border-muted-foreground/30';
      default: return 'bg-muted text-muted-foreground border-muted-foreground/30';
    }
  };

  const getStatusIcon = (statut: RendezVous['statut']) => {
    switch(statut) {
      case 'confirme': return <CheckCircle className="w-4 h-4" />;
      case 'en_attente': return <Clock className="w-4 h-4" />;
      case 'annule': return <AlertCircle className="w-4 h-4" />;
      case 'termine': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (statut: RendezVous['statut']): string => {
    return statut.replace('_', ' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bonjour {patientData.prenom} ! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Voici un aperçu de votre suivi médical
            </p>
          </div>
          <Linky href="/rendez-vous/nouveau"  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Nouveau RDV
          </Linky>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/70 text-sm font-medium">Prochain RDV</p>
                <p className="text-2xl font-bold">8 jours</p>
              </div>
              <Calendar className="w-8 h-8 text-primary-foreground/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-foreground/70 text-sm font-medium">RDV cette année</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Activity className="w-8 h-8 text-secondary-foreground/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-accent to-accent/90 text-accent-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/70 text-sm font-medium">Médecins consultés</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Stethoscope className="w-8 h-8 text-accent-foreground/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-destructive-foreground/70 text-sm font-medium">Satisfaction</p>
                <p className="text-2xl font-bold">4.8/5</p>
              </div>
              <Star className="w-8 h-8 text-destructive-foreground/70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert for next appointment */}
      <Alert className="mb-8 border-primary/20 bg-primary/10">
        <Calendar className="w-4 h-4 text-primary" />
        <AlertDescription className="text-primary">
          <strong>Rappel:</strong> Vous avez un rendez-vous le {formatDate(prochainRdv.dateDebut)} à {formatTime(prochainRdv.dateDebut)} avec {prochainRdv.medecin.user.prenom} {prochainRdv.medecin.user.nom}
        </AlertDescription>
      </Alert>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prochain RDV */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <CalendarDays className="w-5 h-5 mr-2 text-primary" />
                Prochain Rendez-vous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {prochainRdv.motif}
                    </h3>
                    <p className="text-muted-foreground">
                      {formatDate(prochainRdv.dateDebut)} à {formatTime(prochainRdv.dateDebut)}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(prochainRdv.statut)} flex items-center gap-1`}>
                    {getStatusIcon(prochainRdv.statut)}
                    {getStatusText(prochainRdv.statut)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {prochainRdv.medecin.user.nom.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {prochainRdv.medecin.user.prenom} {prochainRdv.medecin.user.nom}
                      </p>
                      <p className="text-sm text-muted-foreground">{prochainRdv.medecin.specialite}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler
                    </Button>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historique RDV */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Clock className="w-5 h-5 mr-2 text-secondary" />
                Rendez-vous récents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rdvRecents.map((rdv: RendezVous) => (
                  <div key={rdv.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <div>
                        <p className="font-medium text-foreground">{rdv.motif}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(rdv.dateDebut)} • {rdv.medecin.user.prenom} {rdv.medecin.user.nom}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(rdv.statut)}>
                      {getStatusText(rdv.statut)}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary/80">
                Voir tout l'historique
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Profil Patient */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <UserCircle className="w-5 h-5 mr-2 text-accent" />
                Mon Profil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarImage src={patientData.avatarUrl} />
                  <AvatarFallback className="bg-accent/10 text-accent text-lg">
                    {patientData.prenom.charAt(0)}{patientData.nom.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-foreground">
                  {patientData.prenom} {patientData.nom}
                </h3>
                <p className="text-sm text-muted-foreground">{patientData.age} ans</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">{patientData.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">{patientData.telephone}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Modifier le profil
              </Button>
            </CardContent>
          </Card>

          {/* Médecins Favoris */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Heart className="w-5 h-5 mr-2 text-destructive" />
                Mes Médecins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medecinsFavoris.map((medecin: MedecinFavori) => (
                  <div key={medecin.id} className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{medecin.nom}</h4>
                      <div className="flex items-center text-sm text-yellow-600">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {medecin.note}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{medecin.specialite}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-secondary font-medium">
                        Dispo: {medecin.prochaineDispo}
                      </span>
                      <Button size="sm" variant="outline" className="text-xs">
                        Contacter
                      </Button>
                    </div>
                  </div>
                ))}

              </div>
              <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary/80">
                <Search className="w-4 h-4 mr-2" />
                Rechercher un médecin
              </Button>
            </CardContent>
          </Card>

          {/* Santé Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <TrendingUp className="w-5 h-5 mr-2 text-secondary" />
                Suivi Santé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Objectif annuel</span>
                    <span className="font-medium">8/12 RDV</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="text-center py-2">
                  <p className="text-sm text-gray-600">
                    Vous êtes sur la bonne voie ! 🎯
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}