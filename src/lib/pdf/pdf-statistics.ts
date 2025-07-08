"use client"

import type { DashboardStats, User, RendezVous } from "@/types/medical"
import {
  createPDFDocument,
  savePDFDocument,
  PDFHeader,
  PDFSectionTitle,
  PDFBarChart,
  PDFStatsGrid,
  PDFTable,
  PDFTextBlock,
  PDF_CONFIG,
  formatDate,
  formatDateTime,
} from "./pdf-utils"

export const exportStatisticsToPDF = (stats: DashboardStats, users: User[], appointments: RendezVous[]) => {
  // <PDFDocument>
  const doc = createPDFDocument()

  // <Header>
  let yPosition = PDFHeader(doc, {
    title: "Rapport Statistiques Complet",
    subtitle: "Analyse detaillee de l'activite medicale",
    pageInfo: `Periode d'analyse: ${formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())} - ${formatDate(new Date().toISOString())}`,
  })
  // </Header>

  // <Overview>
  const overviewData: [string, string][] = [
    ["Utilisateurs totaux", stats.totalUsers.toString()],
    ["Patients actifs", stats.totalPatients.toString()],
    ["Medecins disponibles", stats.totalMedecins.toString()],
    ["Rendez-vous programmes", stats.totalRendezVous.toString()],
    ["Taux d'occupation", "85%"], // Estimation
    ["Satisfaction moyenne", "4.2/5"], // Estimation
  ]

  yPosition = PDFStatsGrid(doc, {
    stats: overviewData,
    startY: yPosition,
    title: "Vue d'ensemble",
  })
  // </Overview>

  // <StatusChart>
  const statusChartData = [
    { label: "Confirmes", value: stats.rendezVousParStatut.confirme, color: PDF_CONFIG.colors.success },
    { label: "En attente", value: stats.rendezVousParStatut.en_attente, color: PDF_CONFIG.colors.warning },
    { label: "Termines", value: stats.rendezVousParStatut.termine, color: PDF_CONFIG.colors.info },
    { label: "Annules", value: stats.rendezVousParStatut.annule, color: PDF_CONFIG.colors.danger },
  ].filter((item) => item.value > 0)

  yPosition = PDFBarChart(doc, {
    x: PDF_CONFIG.margin,
    y: yPosition + 20,
    width: 170,
    height: 40,
    data: statusChartData,
    title: "Repartition des rendez-vous par statut",
  })
  // </StatusChart>

  // <TemporalAnalysis>
  const temporalData: [string, string][] = [
    ["RDV cette semaine", "12"], // Estimation
    ["Evolution vs semaine precedente", "+15%"],
    ["Objectif mensuel", "150 RDV"],
    ["Progression vers objectif", "67%"],
    ["Heure de pointe", "14h-16h"],
    ["Jour le plus charge", "Mardi"],
  ]

  yPosition = PDFStatsGrid(doc, {
    stats: temporalData,
    startY: yPosition + 15,
    title: "Analyse temporelle",
  })
  // </TemporalAnalysis>

  // <DoctorPerformance>
  yPosition = PDFSectionTitle(doc, {
    title: "Performance par medecin",
    yPosition: yPosition + 20,
  })

  const medecinsPerformance = [
    ["Dr. Martin Sophie", "25 RDV", "95% confirmes", "Excellent"],
    ["Dr. Moreau Claire", "18 RDV", "89% confirmes", "Tres bien"],
    ["Dr. Garcia Elena", "22 RDV", "92% confirmes", "Excellent"],
  ]

  yPosition = PDFTable(doc, {
    headers: ["Medecin", "RDV ce mois", "Taux confirmation", "Satisfaction"],
    data: medecinsPerformance,
    startY: yPosition,
    headerColor: PDF_CONFIG.colors.info,
  })
  // </DoctorPerformance>

  // <NewPage>
  doc.addPage()
  yPosition = PDFHeader(doc, {
    title: "Analyse Detaillee",
    subtitle: "Metriques avancees et recommandations",
  })
  // </NewPage>

  // <Recommendations>
  yPosition = PDFSectionTitle(doc, {
    title: "Recommandations",
    yPosition,
  })

  const recommendations = [
    "- Optimiser les creneaux de 14h-16h (forte demande)",
    "- Reduire le taux d'annulation en envoyant des rappels SMS",
    "- Proposer plus de creneaux en dermatologie (liste d'attente)",
    "- Former les secretaires a la gestion des urgences",
    "- Mettre en place un systeme de feedback patient",
  ]

  yPosition = PDFTextBlock(doc, {
    text: recommendations,
    yPosition: yPosition + 5,
    fontSize: PDF_CONFIG.fontSize.normal,
  })
  // </Recommendations>

  // <NextAppointments>
  if (stats.prochainRendezVous) {
    yPosition = PDFSectionTitle(doc, {
      title: "Prochaines echeances",
      yPosition: yPosition + 15,
    })

    const nextAppointment = stats.prochainRendezVous
    const appointmentDetails = [
      `Date: ${formatDateTime(nextAppointment.date)}`,
      `Patient: ${nextAppointment.patient}`,
      `Medecin: ${nextAppointment.medecin}`,
      `Type: ${nextAppointment.type}`,
    ]

    yPosition = PDFTextBlock(doc, {
      text: appointmentDetails,
      yPosition: yPosition + 5,
      fontSize: PDF_CONFIG.fontSize.normal,
    })
  }
  // </NextAppointments>

  // <Footer & Save>
  savePDFDocument(doc, "rapport-statistiques-complet")
  // </Footer & Save>
  // </PDFDocument>
}
