"use client"

import type { RendezVous } from "@/types/medical"
import {
  createPDFDocument,
  savePDFDocument,
  PDFHeader,
  PDFSectionTitle,
  PDFBarChart,
  PDFStatsGrid,
  PDFTable,
  PDF_CONFIG,
  formatDate,
  formatDateTime,
} from "./pdf-utils"

export const exportAppointmentsToPDF = (
  appointments: RendezVous[],
  groupBy: "date" | "medecin" | "patient" | "type" = "date",
) => {
  // <PDFDocument>
  const doc = createPDFDocument()

  const groupLabels = {
    date: "par date",
    medecin: "par medecin",
    patient: "par patient",
    type: "par type",
  }

  // <Header>
  let yPosition = PDFHeader(doc, {
    title: "Planning des Rendez-vous",
    subtitle: `${appointments.length} rendez-vous - Groupe ${groupLabels[groupBy]}`,
    pageInfo: `Periode: ${formatDate(appointments[0]?.dateDebut || new Date().toISOString())} - ${formatDate(appointments[appointments.length - 1]?.dateDebut || new Date().toISOString())}`,
  })
  // </Header>

  // <StatusAnalysis>
  const statusStats = [
    {
      label: "Confirmes",
      value: appointments.filter((rv) => rv.statut === "confirme").length,
      color: PDF_CONFIG.colors.success,
    },
    {
      label: "En attente",
      value: appointments.filter((rv) => rv.statut === "en_attente").length,
      color: PDF_CONFIG.colors.warning,
    },
    {
      label: "Termines",
      value: appointments.filter((rv) => rv.statut === "termine").length,
      color: PDF_CONFIG.colors.info,
    },
    {
      label: "Annules",
      value: appointments.filter((rv) => rv.statut === "annule").length,
      color: PDF_CONFIG.colors.danger,
    },
  ].filter((item) => item.value > 0)

  // <StatusChart>
  yPosition = PDFBarChart(doc, {
    x: PDF_CONFIG.margin,
    y: yPosition + 10,
    width: 170,
    height: 35,
    data: statusStats,
    title: "Repartition par statut",
  })
  // </StatusChart>

  // <DetailedStats>
  const uniquePatients = new Set(appointments.map((rv) => rv.patientId)).size
  const uniqueMedecins = new Set(appointments.map((rv) => rv.medecinId)).size
  const uniqueTypes = new Set(appointments.map((rv) => rv.typeId)).size

  const statsData: [string, string][] = [
    ["Total rendez-vous", appointments.length.toString()],
    ["Patients concernes", uniquePatients.toString()],
    ["Medecins impliques", uniqueMedecins.toString()],
    ["Types de consultation", uniqueTypes.toString()],
    ["Duree moyenne", "30 min"], // Estimation
  ]

  yPosition = PDFStatsGrid(doc, {
    stats: statsData,
    startY: yPosition + 10,
  })
  // </DetailedStats>
  // </StatusAnalysis>

  // <AppointmentsList>
  yPosition = PDFSectionTitle(doc, {
    title: `Planning detaille (${groupLabels[groupBy]})`,
    yPosition: yPosition + 15,
  })

  const tableData = appointments.map((rdv, index) => [
    (index + 1).toString(),
    formatDateTime(rdv.dateDebut),
    `${rdv.patient.user.nom} ${rdv.patient.user.prenom}`,
    `Dr. ${rdv.medecin.user.nom}`,
    rdv.type.nom,
    rdv.statut.charAt(0).toUpperCase() + rdv.statut.slice(1).replace("_", " "),
    rdv.motif.length > 30 ? rdv.motif.substring(0, 30) + "..." : rdv.motif,
  ])

  yPosition = PDFTable(doc, {
    headers: ["#", "Date/Heure", "Patient", "Medecin", "Type", "Statut", "Motif"],
    data: tableData,
    startY: yPosition,
    headerColor: PDF_CONFIG.colors.warning,
  })
  // </AppointmentsList>

  // <Footer & Save>
  savePDFDocument(doc, `planning-rendez-vous-${groupBy}`)
  // </Footer & Save>
  // </PDFDocument>
}
