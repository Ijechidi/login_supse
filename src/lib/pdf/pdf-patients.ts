"use client"

import type { Patient } from "@/types/medical"
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
  calculateAge,
} from "./pdf-utils"

export const exportPatientsToPDF = (patients: Patient[], includeHistory = true) => {
  // <PDFDocument>
  const doc = createPDFDocument()

  // <Header>
  let yPosition = PDFHeader(doc, {
    title: "Dossiers Patients",
    subtitle: `${patients.length} patient(s) enregistre(s)`,
    pageInfo: includeHistory ? "Avec historique medical" : "Vue d'ensemble",
  })
  // </Header>

  // <ActivityAnalysis>
  const totalRdv = patients.reduce((acc, p) => acc + p.rendezVous.length, 0)
  const patientsActifs = patients.filter((p) => p.rendezVous.length > 0).length
  const rdvMoyenParPatient = Math.round((totalRdv / patients.length) * 10) / 10

  // <ActivityChart>
  const activityData = [
    { label: "Actifs", value: patientsActifs, color: PDF_CONFIG.colors.success },
    { label: "Inactifs", value: patients.length - patientsActifs, color: PDF_CONFIG.colors.secondary },
  ]

  yPosition = PDFBarChart(doc, {
    x: PDF_CONFIG.margin,
    y: yPosition + 10,
    width: 170,
    height: 35,
    data: activityData,
    title: "Activite des patients",
  })
  // </ActivityChart>

  // <ActivityStats>
  const statsData: [string, string][] = [
    ["Total patients", patients.length.toString()],
    ["Patients actifs", patientsActifs.toString()],
    ["Total rendez-vous", totalRdv.toString()],
    ["RDV moyen/patient", rdvMoyenParPatient.toString()],
    ["Taux d'activite", Math.round((patientsActifs / patients.length) * 100) + "%"],
  ]

  yPosition = PDFStatsGrid(doc, {
    stats: statsData,
    startY: yPosition + 10,
    title: "Analyse de l'activite",
  })
  // </ActivityStats>
  // </ActivityAnalysis>

  // <PatientsDirectory>
  yPosition = PDFSectionTitle(doc, {
    title: "Repertoire des patients",
    yPosition: yPosition + 15,
  })

  const tableData = patients.map((patient, index) => [
    (index + 1).toString(),
    `${patient.user.nom} ${patient.user.prenom}`,
    calculateAge(patient.user.dateNaissance).toString(),
    patient.user.telephone,
    patient.rendezVous.length.toString(),
    patient.rendezVous.filter((rv) => rv.statut === "confirme").length.toString(),
    patient.rendezVous.length > 0 ? formatDate(patient.rendezVous[patient.rendezVous.length - 1].dateDebut) : "Aucun",
  ])

  yPosition = PDFTable(doc, {
    headers: ["#", "Patient", "Age", "Telephone", "Total RDV", "Confirmes", "Dernier RDV"],
    data: tableData,
    startY: yPosition,
    headerColor: PDF_CONFIG.colors.success,
  })
  // </PatientsDirectory>

  // <MedicalHistory>
  if (includeHistory && patients.some((p) => p.rendezVous.length > 0)) {
    doc.addPage()
    yPosition = PDFHeader(doc, {
      title: "Historique Medical Detaille",
      subtitle: "Rendez-vous par patient",
    })

    patients.forEach((patient) => {
      if (patient.rendezVous.length === 0) return

      // Vérifier si on a assez de place, sinon nouvelle page
      if (yPosition > 220) {
        doc.addPage()
        yPosition = 60
      }

      yPosition = PDFSectionTitle(doc, {
        title: `${patient.user.nom} ${patient.user.prenom} (${patient.rendezVous.length} RDV)`,
        yPosition,
        color: PDF_CONFIG.colors.primary,
      })

      const historyData = patient.rendezVous.map((rdv) => [
        formatDateTime(rdv.dateDebut),
        rdv.type.nom,
        `Dr. ${rdv.medecin.user.nom}`,
        rdv.statut.charAt(0).toUpperCase() + rdv.statut.slice(1).replace("_", " "),
        rdv.motif.length > 40 ? rdv.motif.substring(0, 40) + "..." : rdv.motif,
      ])

      yPosition = PDFTable(doc, {
        headers: ["Date", "Type", "Medecin", "Statut", "Motif"],
        data: historyData,
        startY: yPosition,
        headerColor: PDF_CONFIG.colors.info,
      })

      yPosition += 10
    })
  }
  // </MedicalHistory>

  // <Footer & Save>
  savePDFDocument(doc, "dossiers-patients")
  // </Footer & Save>
  // </PDFDocument>
}

export const exportPatientDetailToPDF = (patient: Patient, includeFullHistory = true) => {
  // <PDFDocument>
  const doc = createPDFDocument()

  const age = calculateAge(patient.user.dateNaissance)

  // <Header>
  let yPosition = PDFHeader(doc, {
    title: `Dossier Patient - ${patient.user.nom} ${patient.user.prenom}`,
    subtitle: `${age} ans • ${patient.rendezVous.length} rendez-vous`,
    pageInfo: `Dossier genere le ${new Date().toLocaleDateString("fr-FR")}`,
  })
  // </Header>

  // <PersonalInfo>
  const personalData: [string, string][] = [
    ["Nom complet", `${patient.user.nom} ${patient.user.prenom}`],
    ["Date de naissance", formatDate(patient.user.dateNaissance)],
    ["Age", `${age} ans`],
    ["Email", patient.user.email],
    ["Telephone", patient.user.telephone],
    ["Adresse", patient.user.adresse || "Non renseignee"],
    ["Date d'inscription", formatDate(patient.user.createdAt)],
  ]

  yPosition = PDFStatsGrid(doc, {
    stats: personalData,
    startY: yPosition,
    title: "Informations personnelles",
  })
  // </PersonalInfo>

  // <MedicalSummary>
  const rdvStats = {
    total: patient.rendezVous.length,
    confirmes: patient.rendezVous.filter((rv) => rv.statut === "confirme").length,
    termines: patient.rendezVous.filter((rv) => rv.statut === "termine").length,
    annules: patient.rendezVous.filter((rv) => rv.statut === "annule").length,
  }

  const medicalSummary: [string, string][] = [
    ["Total rendez-vous", rdvStats.total.toString()],
    ["RDV confirmes", rdvStats.confirmes.toString()],
    ["RDV termines", rdvStats.termines.toString()],
    ["RDV annules", rdvStats.annules.toString()],
    ["Taux de completion", rdvStats.total > 0 ? Math.round((rdvStats.termines / rdvStats.total) * 100) + "%" : "0%"],
    ["Statut patient", rdvStats.total > 0 ? "Actif" : "Inactif"],
  ]

  yPosition = PDFStatsGrid(doc, {
    stats: medicalSummary,
    startY: yPosition + 20,
    title: "Resume medical",
  })
  // </MedicalSummary>

  // <AppointmentHistory>
  if (patient.rendezVous.length > 0) {
    yPosition = PDFSectionTitle(doc, {
      title: "Historique des rendez-vous",
      yPosition: yPosition + 20,
    })

    const historyData = patient.rendezVous
      .sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime())
      .map((rdv, index) => [
        (index + 1).toString(),
        formatDateTime(rdv.dateDebut),
        rdv.type.nom,
        `Dr. ${rdv.medecin.user.nom} ${rdv.medecin.user.prenom}`,
        rdv.statut.charAt(0).toUpperCase() + rdv.statut.slice(1).replace("_", " "),
        rdv.motif.length > 50 ? rdv.motif.substring(0, 50) + "..." : rdv.motif,
      ])

    yPosition = PDFTable(doc, {
      headers: ["#", "Date/Heure", "Type", "Medecin", "Statut", "Motif"],
      data: historyData,
      startY: yPosition,
      headerColor: PDF_CONFIG.colors.success,
    })
  }
  // </AppointmentHistory>

  // <Footer & Save>
  savePDFDocument(doc, `dossier-${patient.user.nom}-${patient.user.prenom}`)
  // </Footer & Save>
  // </PDFDocument>
}
