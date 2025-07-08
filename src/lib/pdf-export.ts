import jsPDF from "jspdf"
import "jspdf-autotable"
import type { User, Patient, Medecin, RendezVous, TypeRendezVous, DashboardStats, Specialite } from "@/types/medical"

// Configuration PDF
const PDF_CONFIG = {
  margin: 20,
  fontSize: {
    title: 18,
    subtitle: 14,
    normal: 10,
    small: 8,
  },
  colors: {
    primary: "#2563eb",
    secondary: "#64748b",
    success: "#16a34a",
    warning: "#d97706",
    danger: "#dc2626",
    muted: "#6b7280",
  },
  pageWidth: 210,
  pageHeight: 297,
}

// Utilitaires de formatage
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR")
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("fr-FR")
}

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

const getSpecialiteLabel = (specialite: Specialite) => {
  const labels = {
    MEDECINE_GENERALE: "Médecine générale",
    CARDIOLOGIE: "Cardiologie",
    DERMATOLOGIE: "Dermatologie",
    PEDIATRIE: "Pédiatrie",
    GYNECOLOGIE: "Gynécologie",
    NEUROLOGIE: "Neurologie",
    OPHTALMOLOGIE: "Ophtalmologie",
    ORTHOPEDIE: "Orthopédie",
  }
  return labels[specialite] || specialite
}

// Composants PDF réutilisables
const createPDFDocument = () => {
  return new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })
}

const PDFHeader = (doc: jsPDF, options: { title: string; subtitle?: string; date?: boolean }) => {
  const { title, subtitle, date = true } = options
  let yPosition = PDF_CONFIG.margin

  // Titre principal
  doc.setFontSize(PDF_CONFIG.fontSize.title)
  doc.setTextColor(PDF_CONFIG.colors.primary)
  doc.text(title, PDF_CONFIG.margin, yPosition)
  yPosition += 10

  // Sous-titre
  if (subtitle) {
    doc.setFontSize(PDF_CONFIG.fontSize.subtitle)
    doc.setTextColor(PDF_CONFIG.colors.secondary)
    doc.text(subtitle, PDF_CONFIG.margin, yPosition)
    yPosition += 8
  }

  // Date de génération
  if (date) {
    doc.setFontSize(PDF_CONFIG.fontSize.small)
    doc.setTextColor(PDF_CONFIG.colors.muted)
    doc.text(`Généré le ${formatDateTime(new Date().toISOString())}`, PDF_CONFIG.margin, yPosition)
    yPosition += 10
  }

  // Ligne de séparation
  doc.setDrawColor(PDF_CONFIG.colors.secondary)
  doc.line(PDF_CONFIG.margin, yPosition, PDF_CONFIG.pageWidth - PDF_CONFIG.margin, yPosition)
  yPosition += 10

  return yPosition
}

const PDFFooter = (doc: jsPDF) => {
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(PDF_CONFIG.fontSize.small)
    doc.setTextColor(PDF_CONFIG.colors.muted)
    doc.text(`Page ${i} sur ${pageCount}`, PDF_CONFIG.pageWidth - PDF_CONFIG.margin, PDF_CONFIG.pageHeight - 10, {
      align: "right",
    })
    doc.text("Système de Gestion Médicale", PDF_CONFIG.margin, PDF_CONFIG.pageHeight - 10)
  }
}

const PDFSection = (doc: jsPDF, title: string, yPosition: number) => {
  doc.setFontSize(PDF_CONFIG.fontSize.subtitle)
  doc.setTextColor(PDF_CONFIG.colors.primary)
  doc.text(title, PDF_CONFIG.margin, yPosition)
  return yPosition + 8
}

const PDFBarChart = (doc: jsPDF, data: { label: string; value: number; color?: string }[], yPosition: number) => {
  const chartWidth = 160
  const chartHeight = 60
  const maxValue = Math.max(...data.map((d) => d.value))
  const barWidth = chartWidth / data.length - 5

  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * chartHeight
    const x = PDF_CONFIG.margin + index * (barWidth + 5)
    const y = yPosition + chartHeight - barHeight

    // Barre
    doc.setFillColor(item.color || PDF_CONFIG.colors.primary)
    doc.rect(x, y, barWidth, barHeight, "F")

    // Valeur
    doc.setFontSize(PDF_CONFIG.fontSize.small)
    doc.setTextColor(PDF_CONFIG.colors.secondary)
    doc.text(item.value.toString(), x + barWidth / 2, y - 2, { align: "center" })

    // Label
    doc.text(item.label, x + barWidth / 2, yPosition + chartHeight + 8, { align: "center" })
  })

  return yPosition + chartHeight + 15
}

const savePDFDocument = (doc: jsPDF, filename: string) => {
  PDFFooter(doc)
  doc.save(filename)
}

// Fonctions d'export spécialisées
export const exportUsersToPDF = (users: User[], options: { includeStats?: boolean } = {}) => {
  const doc = createPDFDocument()
  let yPosition = PDFHeader(doc, {
    title: "Liste des Utilisateurs",
    subtitle: `${users.length} utilisateur(s) enregistré(s)`,
  })

  // Statistiques par rôle
  if (options.includeStats) {
    yPosition = PDFSection(doc, "Répartition par Rôle", yPosition)
    const roleStats = users.reduce(
      (acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const chartData = Object.entries(roleStats).map(([role, count]) => ({
      label: role,
      value: count,
      color: role === "ADMIN" ? "#dc2626" : role === "MEDECIN" ? "#2563eb" : "#16a34a",
    }))

    yPosition = PDFBarChart(doc, chartData, yPosition)
  }

  // Tableau des utilisateurs
  yPosition = PDFSection(doc, "Liste Détaillée", yPosition)

  const tableData = users.map((user) => [
    `${user.nom} ${user.prenom}`,
    user.email,
    user.telephone,
    user.role,
    user.age?.toString() || "N/A",
    formatDate(user.createdAt),
  ])
  ;(doc as any).autoTable({
    head: [["Nom", "Email", "Téléphone", "Rôle", "Âge", "Créé le"]],
    body: tableData,
    startY: yPosition,
    styles: { fontSize: PDF_CONFIG.fontSize.small },
    headStyles: { fillColor: PDF_CONFIG.colors.primary },
    alternateRowStyles: { fillColor: "#f8fafc" },
  })

  savePDFDocument(doc, "utilisateurs.pdf")
}

export const exportPatientsToPDF = (patients: Patient[], options: { includeHistory?: boolean } = {}) => {
  const doc = createPDFDocument()
  let yPosition = PDFHeader(doc, {
    title: "Liste des Patients",
    subtitle: `${patients.length} patient(s) enregistré(s)`,
  })

  // Analyse d'activité
  yPosition = PDFSection(doc, "Analyse d'Activité", yPosition)
  const activityStats = patients.reduce(
    (acc, patient) => {
      const rdvCount = patient.rendezVous?.length || 0
      if (rdvCount === 0) acc.inactifs++
      else if (rdvCount === 1) acc.peuActifs++
      else if (rdvCount < 5) acc.actifs++
      else acc.tresActifs++
      return acc
    },
    { inactifs: 0, peuActifs: 0, actifs: 0, tresActifs: 0 },
  )

  const activityChartData = [
    { label: "Inactifs", value: activityStats.inactifs, color: "#6b7280" },
    { label: "Peu actifs", value: activityStats.peuActifs, color: "#f59e0b" },
    { label: "Actifs", value: activityStats.actifs, color: "#10b981" },
    { label: "Très actifs", value: activityStats.tresActifs, color: "#3b82f6" },
  ]

  yPosition = PDFBarChart(doc, activityChartData, yPosition)

  // Tableau des patients
  yPosition = PDFSection(doc, "Liste Détaillée", yPosition)

  const tableData = patients.map((patient) => [
    `${patient.user.nom} ${patient.user.prenom}`,
    patient.user.email,
    patient.user.telephone,
    calculateAge(patient.user.dateNaissance).toString(),
    (patient.rendezVous?.length || 0).toString(),
    formatDate(patient.user.dateNaissance),
  ])
  ;(doc as any).autoTable({
    head: [["Nom", "Email", "Téléphone", "Âge", "RDV", "Naissance"]],
    body: tableData,
    startY: yPosition,
    styles: { fontSize: PDF_CONFIG.fontSize.small },
    headStyles: { fillColor: PDF_CONFIG.colors.primary },
    alternateRowStyles: { fillColor: "#f8fafc" },
  })

  savePDFDocument(doc, "patients.pdf")
}

export const exportPatientDetailToPDF = (patient: Patient) => {
  const doc = createPDFDocument()
  let yPosition = PDFHeader(doc, {
    title: `Dossier Patient - ${patient.user.nom} ${patient.user.prenom}`,
    subtitle: "Informations détaillées et historique médical",
  })

  // Informations personnelles
  yPosition = PDFSection(doc, "Informations Personnelles", yPosition)
  const personalInfo = [
    ["Nom complet", `${patient.user.nom} ${patient.user.prenom}`],
    ["Email", patient.user.email],
    ["Téléphone", patient.user.telephone],
    ["Date de naissance", formatDate(patient.user.dateNaissance)],
    ["Âge", `${calculateAge(patient.user.dateNaissance)} ans`],
  ]
  ;(doc as any).autoTable({
    body: personalInfo,
    startY: yPosition,
    styles: { fontSize: PDF_CONFIG.fontSize.normal },
    theme: "plain",
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 40 } },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 10

  // Historique des rendez-vous
  if (patient.rendezVous && patient.rendezVous.length > 0) {
    yPosition = PDFSection(doc, "Historique des Rendez-vous", yPosition)

    const rdvData = patient.rendezVous.map((rdv) => [
      formatDate(rdv.dateDebut),
      `Dr. ${rdv.medecin.user.nom}`,
      rdv.type.nom,
      rdv.motif,
      rdv.statut,
    ])
    ;(doc as any).autoTable({
      head: [["Date", "Médecin", "Type", "Motif", "Statut"]],
      body: rdvData,
      startY: yPosition,
      styles: { fontSize: PDF_CONFIG.fontSize.small },
      headStyles: { fillColor: PDF_CONFIG.colors.primary },
      alternateRowStyles: { fillColor: "#f8fafc" },
    })
  }

  savePDFDocument(doc, `patient-${patient.user.nom}-${patient.user.prenom}.pdf`)
}

export const exportMedecinsToPDF = (medecins: Medecin[], options: { includeStats?: boolean } = {}) => {
  const doc = createPDFDocument()
  let yPosition = PDFHeader(doc, {
    title: "Équipe Médicale",
    subtitle: `${medecins.length} médecin(s) dans l'équipe`,
  })

  // Répartition par spécialité
  if (options.includeStats) {
    yPosition = PDFSection(doc, "Répartition par Spécialité", yPosition)
    const specialiteStats = medecins.reduce(
      (acc, medecin) => {
        const label = getSpecialiteLabel(medecin.specialite)
        acc[label] = (acc[label] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const specialiteChartData = Object.entries(specialiteStats).map(([specialite, count]) => ({
      label: specialite,
      value: count,
      color: "#3b82f6",
    }))

    yPosition = PDFBarChart(doc, specialiteChartData, yPosition)
  }

  // Tableau des médecins
  yPosition = PDFSection(doc, "Liste de l'Équipe", yPosition)

  const tableData = medecins.map((medecin) => [
    `Dr. ${medecin.user.nom} ${medecin.user.prenom}`,
    getSpecialiteLabel(medecin.specialite),
    medecin.user.email,
    medecin.user.telephone,
    medecin.disponibilites.length.toString(),
    medecin.description || "N/A",
  ])
  ;(doc as any).autoTable({
    head: [["Médecin", "Spécialité", "Email", "Téléphone", "Créneaux", "Description"]],
    body: tableData,
    startY: yPosition,
    styles: { fontSize: PDF_CONFIG.fontSize.small },
    headStyles: { fillColor: PDF_CONFIG.colors.primary },
    alternateRowStyles: { fillColor: "#f8fafc" },
  })

  savePDFDocument(doc, "medecins.pdf")
}

export const exportAppointmentsToPDF = (appointments: RendezVous[], options: { includeStats?: boolean } = {}) => {
  const doc = createPDFDocument()
  let yPosition = PDFHeader(doc, {
    title: "Planning des Rendez-vous",
    subtitle: `${appointments.length} rendez-vous programmé(s)`,
  })

  // Statistiques par statut
  if (options.includeStats) {
    yPosition = PDFSection(doc, "Répartition par Statut", yPosition)
    const statusStats = appointments.reduce(
      (acc, rdv) => {
        acc[rdv.statut] = (acc[rdv.statut] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const statusChartData = Object.entries(statusStats).map(([status, count]) => ({
      label: status,
      value: count,
      color: status === "confirme" ? "#16a34a" : status === "en_attente" ? "#f59e0b" : "#dc2626",
    }))

    yPosition = PDFBarChart(doc, statusChartData, yPosition)
  }

  // Tableau des rendez-vous
  yPosition = PDFSection(doc, "Liste des Rendez-vous", yPosition)

  const tableData = appointments.map((rdv) => [
    formatDateTime(rdv.dateDebut),
    `${rdv.patient.user.nom} ${rdv.patient.user.prenom}`,
    `Dr. ${rdv.medecin.user.nom}`,
    rdv.type.nom,
    rdv.motif,
    rdv.statut,
  ])
  ;(doc as any).autoTable({
    head: [["Date/Heure", "Patient", "Médecin", "Type", "Motif", "Statut"]],
    body: tableData,
    startY: yPosition,
    styles: { fontSize: PDF_CONFIG.fontSize.small },
    headStyles: { fillColor: PDF_CONFIG.colors.primary },
    alternateRowStyles: { fillColor: "#f8fafc" },
  })

  savePDFDocument(doc, "rendez-vous.pdf")
}

export const exportStatisticsToPDF = (stats: DashboardStats, options: { detailed?: boolean } = {}) => {
  const doc = createPDFDocument()
  let yPosition = PDFHeader(doc, {
    title: "Statistiques du Système",
    subtitle: "Rapport complet d'activité",
  })

  // Statistiques générales
  yPosition = PDFSection(doc, "Vue d'Ensemble", yPosition)
  const generalStats = [
    ["Total Utilisateurs", stats.totalUsers.toString()],
    ["Total Patients", stats.totalPatients.toString()],
    ["Total Médecins", stats.totalMedecins.toString()],
    ["Total Rendez-vous", stats.totalRendezVous.toString()],
  ]
  ;(doc as any).autoTable({
    body: generalStats,
    startY: yPosition,
    styles: { fontSize: PDF_CONFIG.fontSize.normal },
    theme: "striped",
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 60 } },
  })

  yPosition = (doc as any).lastAutoTable.finalY + 15

  // Graphique des statuts de RDV
  yPosition = PDFSection(doc, "Rendez-vous par Statut", yPosition)
  const statusChartData = Object.entries(stats.rendezVousParStatut).map(([status, count]) => ({
    label: status,
    value: count,
    color: status === "confirme" ? "#16a34a" : status === "en_attente" ? "#f59e0b" : "#dc2626",
  }))

  yPosition = PDFBarChart(doc, statusChartData, yPosition)

  // Prochain rendez-vous
  if (stats.prochainRendezVous) {
    yPosition = PDFSection(doc, "Prochain Rendez-vous", yPosition)
    const nextRdvInfo = [
      ["Date", formatDateTime(stats.prochainRendezVous.date)],
      ["Patient", stats.prochainRendezVous.patient],
      ["Médecin", stats.prochainRendezVous.medecin],
      ["Type", stats.prochainRendezVous.type],
    ]
    ;(doc as any).autoTable({
      body: nextRdvInfo,
      startY: yPosition,
      styles: { fontSize: PDF_CONFIG.fontSize.normal },
      theme: "plain",
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 40 } },
    })
  }

  savePDFDocument(doc, "statistiques.pdf")
}

export const exportAppointmentTypesToPDF = (types: TypeRendezVous[], options: { includeUsage?: boolean } = {}) => {
  const doc = createPDFDocument()
  let yPosition = PDFHeader(doc, {
    title: "Types de Consultations",
    subtitle: `${types.length} type(s) de consultation disponible(s)`,
  })

  // Tableau des types
  yPosition = PDFSection(doc, "Liste des Types", yPosition)

  const tableData = types.map((type) => [
    type.nom,
    type.code,
    type.description || "N/A",
    type.couleur || "N/A",
    formatDate(type.createdAt),
  ])
  ;(doc as any).autoTable({
    head: [["Nom", "Code", "Description", "Couleur", "Créé le"]],
    body: tableData,
    startY: yPosition,
    styles: { fontSize: PDF_CONFIG.fontSize.small },
    headStyles: { fillColor: PDF_CONFIG.colors.primary },
    alternateRowStyles: { fillColor: "#f8fafc" },
  })

  savePDFDocument(doc, "types-consultations.pdf")
}
