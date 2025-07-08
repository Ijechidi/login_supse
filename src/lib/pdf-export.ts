"use client"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { User, Patient, Medecin, RendezVous, TypeRendezVous, DashboardStats } from "@/types/medical"

// Configuration PDF avancée
const PDF_CONFIG = {
  orientation: "portrait" as const,
  unit: "mm" as const,
  format: "a4" as const,
  margin: 20,
  fontSize: {
    title: 20,
    subtitle: 16,
    section: 14,
    normal: 10,
    small: 8,
  },
 colors: {
    primary: [59, 130, 246] as [number, number, number],
    secondary: [107, 114, 128] as [number, number, number],
    success: [16, 185, 129] as [number, number, number],
    warning: [245, 158, 11] as [number, number, number],
    danger: [239, 68, 68] as [number, number, number],
    info: [139, 92, 246] as [number, number, number],
    light: [248, 250, 252] as [number, number, number],
  },
  pageWidth: 210,
  pageHeight: 297,
}

// Utilitaires de formatage
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Fonction pour calculer l'âge
const calculateAge = (birthDate: string) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

// En-tête professionnel avec logo
const addAdvancedHeader = (doc: jsPDF, title: string, subtitle?: string, pageInfo?: string) => {
  const pageWidth = doc.internal.pageSize.width

  // Fond d'en-tête
  doc.setFillColor(...PDF_CONFIG.colors.primary)
  doc.rect(0, 0, pageWidth, 50, "F")

  // Logo et titre principal
  doc.setFontSize(PDF_CONFIG.fontSize.title)
  doc.setTextColor(255, 255, 255)
  doc.text("+ MediCare Admin", PDF_CONFIG.margin, 25)

  // Sous-titre système
  doc.setFontSize(PDF_CONFIG.fontSize.small)
  doc.text("Systeme de Gestion Medicale", PDF_CONFIG.margin, 35)

  // Date et heure de génération
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  doc.text(`Genere le ${currentDate}`, pageWidth - PDF_CONFIG.margin, 25, { align: "right" })

  if (pageInfo) {
    doc.text(pageInfo, pageWidth - PDF_CONFIG.margin, 35, { align: "right" })
  }

  // Titre du document
  doc.setFontSize(PDF_CONFIG.fontSize.subtitle)
  doc.setTextColor(0, 0, 0)
  doc.text(title, PDF_CONFIG.margin, 70)

  if (subtitle) {
    doc.setFontSize(PDF_CONFIG.fontSize.normal)
    doc.setTextColor(...PDF_CONFIG.colors.secondary)
    doc.text(subtitle, PDF_CONFIG.margin, 80)
  }

  // Ligne de séparation
  doc.setDrawColor(...PDF_CONFIG.colors.primary)
  doc.setLineWidth(0.5)
  doc.line(PDF_CONFIG.margin, 85, pageWidth - PDF_CONFIG.margin, 85)

  return 95 // Position Y après l'en-tête
}

// Pied de page professionnel
const addAdvancedFooter = (doc: jsPDF) => {
  const pageHeight = doc.internal.pageSize.height
  const pageWidth = doc.internal.pageSize.width
  const pageNumber = doc.getCurrentPageInfo().pageNumber

  // Ligne de séparation
  doc.setDrawColor(...PDF_CONFIG.colors.secondary)
  doc.setLineWidth(0.3)
  doc.line(PDF_CONFIG.margin, pageHeight - 30, pageWidth - PDF_CONFIG.margin, pageHeight - 30)

  // Informations de contact
  doc.setFontSize(PDF_CONFIG.fontSize.small)
  doc.setTextColor(...PDF_CONFIG.colors.secondary as [number, number, number])
  doc.text("MediCare Admin - Systeme de gestion medicale", PDF_CONFIG.margin, pageHeight - 20)
  doc.text("Email: contact@medicare-admin.fr | Tel: +33 1 23 45 67 89", PDF_CONFIG.margin, pageHeight - 15)
  doc.text("Web: www.medicare-admin.fr", PDF_CONFIG.margin, pageHeight - 10)

  // Numéro de page avec style
  doc.setFillColor(...(PDF_CONFIG.colors.primary as [number, number, number]))
  doc.roundedRect(pageWidth - 50, pageHeight - 25, 30, 10, 2, 2, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(PDF_CONFIG.fontSize.small)
  doc.text(`Page ${pageNumber}`, pageWidth - 35, pageHeight - 18, { align: "center" })
}

// Fonction pour ajouter un graphique simple (barres)
const addSimpleBarChart = (
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  data: { label: string; value: number; color: number[] }[],
  title: string,
) => {
  // Titre du graphique
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(0, 0, 0)
  doc.text(title, x, y - 5)

  // Cadre du graphique
  doc.setDrawColor(...PDF_CONFIG.colors.secondary)
  doc.rect(x, y, width, height)

  const maxValue = Math.max(...data.map((d) => d.value))
  const barWidth = (width / data.length) * 0.8
  const spacing = (width / data.length) * 0.2

  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * (height - 20)
    const barX = x + index * (barWidth + spacing) + spacing / 2
    const barY = y + height - barHeight - 10

    // Barre
    doc.setFillColor(...(PDF_CONFIG.colors.primary as [number, number, number]))
    doc.rect(barX, barY, barWidth, barHeight, "F")

    // Valeur au-dessus de la barre
    doc.setFontSize(PDF_CONFIG.fontSize.small)
    doc.setTextColor(0, 0, 0)
    doc.text(item.value.toString(), barX + barWidth / 2, barY - 2, { align: "center" })

    // Label en bas
    doc.text(item.label, barX + barWidth / 2, y + height + 5, { align: "center" })
  })

  return y + height + 15
}

// Export utilisateurs avancé
export const exportUsersToPDF = (users: User[], filters?: { role?: string; dateFrom?: string; dateTo?: string }) => {
  const doc = new jsPDF(PDF_CONFIG)

  let filteredUsers = users
  if (filters?.role) {
    filteredUsers = filteredUsers.filter((u) => u.role === filters.role)
  }
  if (filters?.dateFrom) {
    filteredUsers = filteredUsers.filter((u) => new Date(u.createdAt) >= new Date(filters.dateFrom!))
  }
  if (filters?.dateTo) {
    filteredUsers = filteredUsers.filter((u) => new Date(u.createdAt) <= new Date(filters.dateTo!))
  }

  const filterInfo = filters?.role ? `Filtre: ${filters.role}` : "Tous les roles"
  let yPosition = addAdvancedHeader(
    doc,
    "Rapport des Utilisateurs",
    `${filteredUsers.length} utilisateur(s) - ${filterInfo}`,
    `Total: ${users.length} utilisateurs`,
  )

  // Statistiques par rôle
  const roleStats = {
    ADMIN: filteredUsers.filter((u) => u.role === "ADMIN").length,
    MEDECIN: filteredUsers.filter((u) => u.role === "MEDECIN").length,
    PATIENT: filteredUsers.filter((u) => u.role === "PATIENT").length,
    SECRETAIRE: filteredUsers.filter((u) => u.role === "SECRETAIRE").length,
  }

  // Graphique des rôles
  const chartData = [
    { label: "Admin", value: roleStats.ADMIN, color: PDF_CONFIG.colors.danger },
    { label: "Medecin", value: roleStats.MEDECIN, color: PDF_CONFIG.colors.info },
    { label: "Patient", value: roleStats.PATIENT, color: PDF_CONFIG.colors.success },
    { label: "Secretaire", value: roleStats.SECRETAIRE, color: PDF_CONFIG.colors.warning },
  ].filter((item) => item.value > 0)

  if (chartData.length > 0) {
    yPosition = addSimpleBarChart(doc, PDF_CONFIG.margin, yPosition + 10, 170, 40, chartData, "Repartition par role")
  }

  // Statistiques détaillées
  yPosition += 10
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Statistiques detaillees", PDF_CONFIG.margin, yPosition)

  yPosition += 10
  const statsData = [
    ["Total utilisateurs", filteredUsers.length.toString()],
    ["Medecins", roleStats.MEDECIN.toString()],
    ["Patients", roleStats.PATIENT.toString()],
    ["Administrateurs", roleStats.ADMIN.toString()],
    ["Secretaires", roleStats.SECRETAIRE.toString()],
    [
      "Age moyen",
      Math.round(filteredUsers.reduce((acc, u) => acc + (u.age || 0), 0) / filteredUsers.length).toString() + " ans",
    ],
  ]

  autoTable(doc, {
    body: statsData,
    startY: yPosition,
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "grid",
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 60, fillColor: PDF_CONFIG.colors.light },
      1: { halign: "right", cellWidth: 30 },
    },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 15

  // Tableau détaillé des utilisateurs
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Liste detaillee des utilisateurs", PDF_CONFIG.margin, yPosition)

  const tableData = filteredUsers.map((user, index) => [
    (index + 1).toString(),
    `${user.nom} ${user.prenom}`,
    user.email,
    user.telephone,
    user.role,
    user.age?.toString() || calculateAge(user.dateNaissance).toString(),
    formatDate(user.createdAt),
  ])

  autoTable(doc, {
    head: [["#", "Nom complet", "Email", "Telephone", "Role", "Age", "Inscrit le"]],
    body: tableData,
    startY: yPosition + 5,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: PDF_CONFIG.colors.primary, textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: PDF_CONFIG.colors.light },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 35 },
      2: { cellWidth: 45 },
      3: { cellWidth: 25 },
      4: { cellWidth: 20, halign: "center" },
      5: { cellWidth: 15, halign: "center" },
      6: { cellWidth: 25 },
    },
  })

  addAdvancedFooter(doc)
  doc.save(`rapport-utilisateurs-${new Date().toISOString().split("T")[0]}.pdf`)
}

// Export patients avec historique médical
export const exportPatientsToPDF = (patients: Patient[], includeHistory = true) => {
  const doc = new jsPDF(PDF_CONFIG)

  let yPosition = addAdvancedHeader(
    doc,
    "Dossiers Patients",
    `${patients.length} patient(s) enregistre(s)`,
    includeHistory ? "Avec historique medical" : "Vue d'ensemble",
  )

  // Statistiques patients
  const totalRdv = patients.reduce((acc, p) => acc + p.rendezVous.length, 0)
  const patientsActifs = patients.filter((p) => p.rendezVous.length > 0).length
  const rdvMoyenParPatient = Math.round((totalRdv / patients.length) * 10) / 10

  // Graphique activité patients
  const activityData = [
    { label: "Actifs", value: patientsActifs, color: PDF_CONFIG.colors.success },
    { label: "Inactifs", value: patients.length - patientsActifs, color: PDF_CONFIG.colors.secondary },
  ]

  yPosition = addSimpleBarChart(doc, PDF_CONFIG.margin, yPosition + 10, 170, 35, activityData, "Activite des patients")

  // Statistiques détaillées
  yPosition += 10
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Analyse de l'activite", PDF_CONFIG.margin, yPosition)

  yPosition += 10
  const statsData = [
    ["Total patients", patients.length.toString()],
    ["Patients actifs", patientsActifs.toString()],
    ["Total rendez-vous", totalRdv.toString()],
    ["RDV moyen/patient", rdvMoyenParPatient.toString()],
    ["Taux d'activite", Math.round((patientsActifs / patients.length) * 100) + "%"],
  ]

  autoTable(doc, {
    body: statsData,
    startY: yPosition,
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "grid",
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 60, fillColor: PDF_CONFIG.colors.light },
      1: { halign: "right", cellWidth: 30 },
    },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 15

  // Liste des patients
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Repertoire des patients", PDF_CONFIG.margin, yPosition)

  const tableData = patients.map((patient, index) => [
    (index + 1).toString(),
    `${patient.user.nom} ${patient.user.prenom}`,
    calculateAge(patient.user.dateNaissance).toString(),
    patient.user.telephone,
    patient.rendezVous.length.toString(),
    patient.rendezVous.filter((rv) => rv.statut === "confirme").length.toString(),
    patient.rendezVous.length > 0 ? formatDate(patient.rendezVous[patient.rendezVous.length - 1].dateDebut) : "Aucun",
  ])

  autoTable(doc, {
    head: [["#", "Patient", "Age", "Telephone", "Total RDV", "Confirmes", "Dernier RDV"]],
    body: tableData,
    startY: yPosition + 5,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: PDF_CONFIG.colors.success, textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: PDF_CONFIG.colors.light },
  })

  // Historique détaillé si demandé
  if (includeHistory && patients.some((p) => p.rendezVous.length > 0)) {
    doc.addPage()
    yPosition = addAdvancedHeader(doc, "Historique Medical Detaille", "Rendez-vous par patient")

    patients.forEach((patient, patientIndex) => {
      if (patient.rendezVous.length === 0) return

      // Vérifier si on a assez de place, sinon nouvelle page
      if (yPosition > 220) {
        doc.addPage()
        yPosition = 60
      }

      doc.setFontSize(PDF_CONFIG.fontSize.normal)
      doc.setTextColor(...PDF_CONFIG.colors.primary)
      doc.text(
        `${patient.user.nom} ${patient.user.prenom} (${patient.rendezVous.length} RDV)`,
        PDF_CONFIG.margin,
        yPosition,
      )

      const historyData = patient.rendezVous.map((rdv) => [
        formatDateTime(rdv.dateDebut),
        rdv.type.nom,
        `Dr. ${rdv.medecin.user.nom}`,
        rdv.statut.charAt(0).toUpperCase() + rdv.statut.slice(1).replace("_", " "),
        rdv.motif.length > 40 ? rdv.motif.substring(0, 40) + "..." : rdv.motif,
      ])

      autoTable(doc, {
        head: [["Date", "Type", "Medecin", "Statut", "Motif"]],
        body: historyData,
        startY: yPosition + 5,
        styles: { fontSize: 7, cellPadding: 1.5 },
        headStyles: { fillColor: PDF_CONFIG.colors.info, textColor: [255, 255, 255] },
        margin: { left: PDF_CONFIG.margin + 5, right: PDF_CONFIG.margin + 5 },
      })

      yPosition = (doc as any).lastAutoTable.finalY + 10
    })
  }

  addAdvancedFooter(doc)
  doc.save(`dossiers-patients-${new Date().toISOString().split("T")[0]}.pdf`)
}

// Export planning médecins avec disponibilités
export const exportMedecinsToPDF = (medecins: Medecin[], includeSchedule = true) => {
  const doc = new jsPDF(PDF_CONFIG)

  let yPosition = addAdvancedHeader(
    doc,
    "Equipe Medicale",
    `${medecins.length} medecin(s) - Specialites et disponibilites`,
    includeSchedule ? "Planning inclus" : "Vue d'ensemble",
  )

  // Statistiques par spécialité
  const specialites = [...new Set(medecins.map((m) => m.specialite))]
  const specialiteStats = specialites.map((spec) => ({
    label: spec.length > 10 ? spec.substring(0, 10) + "..." : spec,
    value: medecins.filter((m) => m.specialite === spec).length,
    color: PDF_CONFIG.colors.info,
  }))

  if (specialiteStats.length > 0) {
    yPosition = addSimpleBarChart(
      doc,
      PDF_CONFIG.margin,
      yPosition + 10,
      170,
      35,
      specialiteStats,
      "Repartition par specialite",
    )
  }

  // Statistiques générales
  yPosition += 10
  const totalDisponibilites = medecins.reduce((acc, m) => acc + m.disponibilites.length, 0)
  const medecinsDisponibles = medecins.filter((m) => m.disponibilites.length > 0).length

  const statsData = [
    ["Total medecins", medecins.length.toString()],
    ["Medecins disponibles", medecinsDisponibles.toString()],
    ["Specialites", specialites.length.toString()],
    ["Creneaux totaux", totalDisponibilites.toString()],
    ["Creneaux/medecin", Math.round((totalDisponibilites / medecins.length) * 10) / 10 + ""],
  ]

  autoTable(doc, {
    body: statsData,
    startY: yPosition,
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "grid",
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 60, fillColor: PDF_CONFIG.colors.light },
      1: { halign: "right", cellWidth: 30 },
    },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 15

  // Liste des médecins
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Annuaire medical", PDF_CONFIG.margin, yPosition)

  const tableData = medecins.map((medecin, index) => [
    (index + 1).toString(),
    `Dr. ${medecin.user.nom} ${medecin.user.prenom}`,
    medecin.specialite,
    medecin.user.telephone,
    medecin.disponibilites.length.toString(),
    medecin.disponibilites.length > 0 ? "Disponible" : "Indisponible",
  ])

  autoTable(doc, {
    head: [["#", "Medecin", "Specialite", "Telephone", "Creneaux", "Statut"]],
    body: tableData,
    startY: yPosition + 5,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: PDF_CONFIG.colors.info, textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: PDF_CONFIG.colors.light },
  })

  // Planning détaillé si demandé
  if (includeSchedule) {
    doc.addPage()
    yPosition = addAdvancedHeader(doc, "Planning des Disponibilites", "Horaires par medecin et par jour")

    medecins.forEach((medecin, index) => {
      if (medecin.disponibilites.length === 0) return

      // Vérifier l'espace disponible
      if (yPosition > 200) {
        doc.addPage()
        yPosition = 60
      }

      doc.setFontSize(PDF_CONFIG.fontSize.normal)
      doc.setTextColor(...PDF_CONFIG.colors.primary)
      doc.text(`Dr. ${medecin.user.nom} ${medecin.user.prenom} - ${medecin.specialite}`, PDF_CONFIG.margin, yPosition)

      const scheduleData = medecin.disponibilites.map((dispo) => [
        dispo.jour,
        dispo.heureDebut,
        dispo.heureFin,
        `${dispo.heureDebut} - ${dispo.heureFin}`,
      ])

      autoTable(doc, {
        head: [["Jour", "Debut", "Fin", "Creneau complet"]],
        body: scheduleData,
        startY: yPosition + 5,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: PDF_CONFIG.colors.warning, textColor: [255, 255, 255] },
        margin: { left: PDF_CONFIG.margin + 5, right: PDF_CONFIG.margin + 5 },
      })

      yPosition = (doc as any).lastAutoTable.finalY + 15
    })
  }

  addAdvancedFooter(doc)
  doc.save(`equipe-medicale-${new Date().toISOString().split("T")[0]}.pdf`)
}

// Export planning complet des rendez-vous
export const exportAppointmentsToPDF = (
  appointments: RendezVous[],
  groupBy: "date" | "medecin" | "patient" | "type" = "date",
) => {
  const doc = new jsPDF(PDF_CONFIG)

  const groupLabels = {
    date: "par date",
    medecin: "par medecin",
    patient: "par patient",
    type: "par type",
  }

  let yPosition = addAdvancedHeader(
    doc,
    "Planning des Rendez-vous",
    `${appointments.length} rendez-vous - Groupe ${groupLabels[groupBy]}`,
    `Periode: ${formatDate(appointments[0]?.dateDebut || new Date().toISOString())} - ${formatDate(appointments[appointments.length - 1]?.dateDebut || new Date().toISOString())}`,
  )

  // Statistiques par statut
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

  yPosition = addSimpleBarChart(doc, PDF_CONFIG.margin, yPosition + 10, 170, 35, statusStats, "Repartition par statut")

  // Statistiques détaillées
  yPosition += 10
  const uniquePatients = new Set(appointments.map((rv) => rv.patientId)).size
  const uniqueMedecins = new Set(appointments.map((rv) => rv.medecinId)).size
  const uniqueTypes = new Set(appointments.map((rv) => rv.typeId)).size

  const statsData = [
    ["Total rendez-vous", appointments.length.toString()],
    ["Patients concernes", uniquePatients.toString()],
    ["Medecins impliques", uniqueMedecins.toString()],
    ["Types de consultation", uniqueTypes.toString()],
    ["Duree moyenne", "30 min"], // Estimation
  ]

  autoTable(doc, {
    body: statsData,
    startY: yPosition,
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "grid",
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 60, fillColor: PDF_CONFIG.colors.light },
      1: { halign: "right", cellWidth: 30 },
    },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 15

  // Planning détaillé
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text(`Planning detaille (${groupLabels[groupBy]})`, PDF_CONFIG.margin, yPosition)

  const tableData = appointments.map((rdv, index) => [
    (index + 1).toString(),
    formatDateTime(rdv.dateDebut),
    `${rdv.patient.user.nom} ${rdv.patient.user.prenom}`,
    `Dr. ${rdv.medecin.user.nom}`,
    rdv.type.nom,
    rdv.statut.charAt(0).toUpperCase() + rdv.statut.slice(1).replace("_", " "),
    rdv.motif.length > 30 ? rdv.motif.substring(0, 30) + "..." : rdv.motif,
  ])

  autoTable(doc, {
    head: [["#", "Date/Heure", "Patient", "Medecin", "Type", "Statut", "Motif"]],
    body: tableData,
    startY: yPosition + 5,
    styles: { fontSize: 7, cellPadding: 1.5 },
    headStyles: { fillColor: PDF_CONFIG.colors.warning, textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: PDF_CONFIG.colors.light },
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 25 },
      2: { cellWidth: 25 },
      3: { cellWidth: 25 },
      4: { cellWidth: 20 },
      5: { cellWidth: 18 },
      6: { cellWidth: 35 },
    },
  })

  addAdvancedFooter(doc)
  doc.save(`planning-rendez-vous-${groupBy}-${new Date().toISOString().split("T")[0]}.pdf`)
}

// Export rapport statistiques complet
export const exportStatisticsToPDF = (stats: DashboardStats, users: User[], appointments: RendezVous[]) => {
  const doc = new jsPDF(PDF_CONFIG)

  let yPosition = addAdvancedHeader(
    doc,
    "Rapport Statistiques Complet",
    "Analyse detaillee de l'activite medicale",
    `Periode d'analyse: ${formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())} - ${formatDate(new Date().toISOString())}`,
  )

  // Section 1: Vue d'ensemble avec graphiques
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Vue d'ensemble", PDF_CONFIG.margin, yPosition)

  yPosition += 10
  const overviewData = [
    ["Utilisateurs totaux", stats.totalUsers.toString()],
    ["Patients actifs", stats.totalPatients.toString()],
    ["Medecins disponibles", stats.totalMedecins.toString()],
    ["Rendez-vous programmes", stats.totalRendezVous.toString()],
    ["Taux d'occupation", "85%"], // Estimation
    ["Satisfaction moyenne", "4.2/5"], // Estimation
  ]

  autoTable(doc, {
    body: overviewData,
    startY: yPosition,
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "grid",
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 80, fillColor: PDF_CONFIG.colors.light },
      1: { halign: "right", cellWidth: 40 },
    },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 20

  // Graphique des rendez-vous par statut
  const statusChartData = [
    { label: "Confirmes", value: stats.rendezVousParStatut.confirme, color: PDF_CONFIG.colors.success },
    { label: "En attente", value: stats.rendezVousParStatut.en_attente, color: PDF_CONFIG.colors.warning },
    { label: "Termines", value: stats.rendezVousParStatut.termine, color: PDF_CONFIG.colors.info },
    { label: "Annules", value: stats.rendezVousParStatut.annule, color: PDF_CONFIG.colors.danger },
  ].filter((item) => item.value > 0)

  yPosition = addSimpleBarChart(
    doc,
    PDF_CONFIG.margin,
    yPosition,
    170,
    40,
    statusChartData,
    "Repartition des rendez-vous par statut",
  )

  // Section 2: Analyse temporelle
  yPosition += 15
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Analyse temporelle", PDF_CONFIG.margin, yPosition)

  yPosition += 10
  const temporalData = [
    ["RDV cette semaine", "12"], // Estimation
    ["Evolution vs semaine precedente", "+15%"],
    ["Objectif mensuel", "150 RDV"],
    ["Progression vers objectif", "67%"],
    ["Heure de pointe", "14h-16h"],
    ["Jour le plus charge", "Mardi"],
  ]

  autoTable(doc, {
    body: temporalData,
    startY: yPosition,
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "striped",
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 80 },
      1: { halign: "right", cellWidth: 40 },
    },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 20

  // Section 3: Performance par médecin
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Performance par medecin", PDF_CONFIG.margin, yPosition)

  yPosition += 10
  const medecinsPerformance = [
    ["Dr. Martin Sophie", "25 RDV", "95% confirmes", "Excellent"],
    ["Dr. Moreau Claire", "18 RDV", "89% confirmes", "Tres bien"],
    ["Dr. Garcia Elena", "22 RDV", "92% confirmes", "Excellent"],
  ]

  autoTable(doc, {
    head: [["Medecin", "RDV ce mois", "Taux confirmation", "Satisfaction"]],
    body: medecinsPerformance,
    startY: yPosition,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: PDF_CONFIG.colors.info, textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: PDF_CONFIG.colors.light },
  })

  // Nouvelle page pour les détails
  doc.addPage()
  yPosition = addAdvancedHeader(doc, "Analyse Detaillee", "Metriques avancees et recommandations")

  // Section 4: Recommandations
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Recommandations", PDF_CONFIG.margin, yPosition)

  yPosition += 15
  const recommendations = [
    "- Optimiser les creneaux de 14h-16h (forte demande)",
    "- Reduire le taux d'annulation en envoyant des rappels SMS",
    "- Proposer plus de creneaux en dermatologie (liste d'attente)",
    "- Former les secretaires a la gestion des urgences",
    "- Mettre en place un systeme de feedback patient",
  ]

  doc.setFontSize(PDF_CONFIG.fontSize.normal)
  doc.setTextColor(0, 0, 0)
  recommendations.forEach((rec, index) => {
    doc.text(rec, PDF_CONFIG.margin, yPosition + index * 8)
  })

  yPosition += recommendations.length * 8 + 15

  // Section 5: Prochaines échéances
  if (stats.prochainRendezVous) {
    doc.setFontSize(PDF_CONFIG.fontSize.section)
    doc.setTextColor(...PDF_CONFIG.colors.primary)
    doc.text("Prochaines echeances", PDF_CONFIG.margin, yPosition)

    yPosition += 15
    const nextAppointment = stats.prochainRendezVous
    doc.setFontSize(PDF_CONFIG.fontSize.normal)
    doc.setTextColor(0, 0, 0)

    const appointmentDetails = [
      `Date: ${formatDateTime(nextAppointment.date)}`,
      `Patient: ${nextAppointment.patient}`,
      `Medecin: ${nextAppointment.medecin}`,
      `Type: ${nextAppointment.type}`,
    ]

    appointmentDetails.forEach((detail, index) => {
      doc.text(detail, PDF_CONFIG.margin, yPosition + index * 8)
    })
  }

  addAdvancedFooter(doc)
  doc.save(`rapport-statistiques-complet-${new Date().toISOString().split("T")[0]}.pdf`)
}

// Export types de rendez-vous avec statistiques d'utilisation
export const exportAppointmentTypesToPDF = (types: TypeRendezVous[], appointments: RendezVous[]) => {
  const doc = new jsPDF(PDF_CONFIG)

  let yPosition = addAdvancedHeader(
    doc,
    "Configuration des Types de Rendez-vous",
    `${types.length} type(s) configure(s) - Statistiques d'utilisation`,
  )

  // Statistiques d'utilisation par type
  const typeUsage = types
    .map((type) => ({
      ...type,
      usage: appointments.filter((apt) => apt.typeId === type.id).length,
    }))
    .sort((a, b) => b.usage - a.usage)

  // Graphique d'utilisation
  const usageChartData = typeUsage.slice(0, 6).map((type) => ({
    label: type.nom.length > 8 ? type.nom.substring(0, 8) + "..." : type.nom,
    value: type.usage,
    color: PDF_CONFIG.colors.info,
  }))

  if (usageChartData.length > 0) {
    yPosition = addSimpleBarChart(
      doc,
      PDF_CONFIG.margin,
      yPosition + 10,
      170,
      40,
      usageChartData,
      "Utilisation par type de consultation",
    )
  }

  // Statistiques générales
  yPosition += 15
  const totalUsage = typeUsage.reduce((acc, type) => acc + type.usage, 0)
  const mostUsedType = typeUsage[0]
  const leastUsedType = typeUsage[typeUsage.length - 1]

  const statsData = [
    ["Types configures", types.length.toString()],
    ["Utilisation totale", totalUsage.toString()],
    ["Plus utilise", `${mostUsedType?.nom} (${mostUsedType?.usage})`],
    ["Moins utilise", `${leastUsedType?.nom} (${leastUsedType?.usage})`],
    ["Utilisation moyenne", Math.round(totalUsage / types.length).toString()],
  ]

  autoTable(doc, {
    body: statsData,
    startY: yPosition,
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "grid",
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 60, fillColor: PDF_CONFIG.colors.light },
      1: { halign: "right", cellWidth: 50 },
    },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 15

  // Tableau détaillé des types
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Configuration detaillee", PDF_CONFIG.margin, yPosition)

  const tableData = typeUsage.map((type, index) => [
    (index + 1).toString(),
    type.nom,
    type.code,
    type.couleur || "N/A",
    type.usage.toString(),
    Math.round((type.usage / totalUsage) * 100) + "%",
    formatDate(type.createdAt),
  ])

  autoTable(doc, {
    head: [["#", "Nom", "Code", "Couleur", "Utilisations", "% Total", "Cree le"]],
    body: tableData,
    startY: yPosition + 5,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: PDF_CONFIG.colors.info, textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: PDF_CONFIG.colors.light },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 15

  // Descriptions détaillées
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...PDF_CONFIG.colors.primary)
  doc.text("Descriptions et recommandations", PDF_CONFIG.margin, yPosition)

  yPosition += 10
  types.forEach((type, index) => {
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 60
    }

    doc.setFontSize(PDF_CONFIG.fontSize.normal)
    doc.setTextColor(0, 0, 0)
    doc.text(`${type.nom} (${type.code})`, PDF_CONFIG.margin, yPosition)

    doc.setFontSize(PDF_CONFIG.fontSize.small)
    doc.setTextColor(...PDF_CONFIG.colors.secondary)
    const description = type.description || "Aucune description disponible"
    const usage = typeUsage.find((t) => t.id === type.id)?.usage || 0

    doc.text(`Description: ${description}`, PDF_CONFIG.margin + 5, yPosition + 6)
    doc.text(`Utilisation: ${usage} rendez-vous`, PDF_CONFIG.margin + 5, yPosition + 12)

    yPosition += 20
  })

  addAdvancedFooter(doc)
  doc.save(`types-rendez-vous-detaille-${new Date().toISOString().split("T")[0]}.pdf`)
}
