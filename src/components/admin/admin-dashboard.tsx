"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Stethoscope, Calendar, TrendingUp, AlertTriangle } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPatients: 0,
    totalMedecins: 0,
    totalRendezVous: 0,
    rendezVousAujourdhui: 0,
    enAttente: 0,
  })

  useEffect(() => {
    // Mock stats - in real app, fetch from API
    setStats({
      totalUsers: 127,
      totalPatients: 98,
      totalMedecins: 24,
      totalRendezVous: 456,
      rendezVousAujourdhui: 23,
      enAttente: 8,
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord Administrateur</h1>
          <p className="text-gray-600">Vue d'ensemble de la plateforme CareConnect</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Total inscrits</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">Patients actifs</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Médecins</CardTitle>
              <Stethoscope className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.totalMedecins}</div>
              <p className="text-xs text-muted-foreground">Praticiens</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
              <Calendar className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalRendezVous}</div>
              <p className="text-xs text-muted-foreground">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.rendezVousAujourdhui}</div>
              <p className="text-xs text-muted-foreground">Consultations</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.enAttente}</div>
              <p className="text-xs text-muted-foreground">À valider</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Dernières actions sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau médecin inscrit</p>
                    <p className="text-xs text-gray-500">Dr. Sophie Martin - Cardiologie</p>
                  </div>
                  <span className="text-xs text-gray-400">Il y a 2h</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau patient inscrit</p>
                    <p className="text-xs text-gray-500">Jean Dupont</p>
                  </div>
                  <span className="text-xs text-gray-400">Il y a 4h</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Rendez-vous confirmé</p>
                    <p className="text-xs text-gray-500">Marie Dubois avec Dr. Bernard</p>
                  </div>
                  <span className="text-xs text-gray-400">Il y a 6h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle>Spécialités populaires</CardTitle>
              <CardDescription>Répartition des consultations par spécialité</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Médecine générale</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">80%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cardiologie</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dermatologie</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">40%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pédiatrie</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-6 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">30%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>État du système</CardTitle>
            <CardDescription>Statut des services de la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">API Principale</p>
                  <p className="text-xs text-gray-500">Opérationnelle</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Base de données</p>
                  <p className="text-xs text-gray-500">Opérationnelle</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-gray-500">Maintenance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
