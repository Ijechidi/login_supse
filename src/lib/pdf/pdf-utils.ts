"use client"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

// Configuration PDF avancée
export const PDF_CONFIG = {
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
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Fonction pour calculer l'âge
export const calculateAge = (birthDate: string) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

// Créer un document PDF
export const createPDFDocument = () => {
  return new jsPDF(PDF_CONFIG)
}

// Sauvegarder le document PDF
export const savePDFDocument = (doc: jsPDF, filename: string) => {
  addAdvancedFooter(doc)
  doc.save(`${filename}-${new Date().toISOString().split("T")[0]}.pdf`)
}

// En-tête professionnel avec logo
export const PDFHeader = (
  doc: jsPDF,
  options: {
    title: string
    subtitle?: string
    pageInfo?: string
  },
) => {
  const pageWidth = doc.internal.pageSize.width

  // Fond d'en-tête
  doc.setFillColor(...PDF_CONFIG.colors.primary)
  doc.rect(0, 0, pageWidth, 50, "F")

  // Logo et titre principal
  doc.setFontSize(PDF_CONFIG.fontSize.title)
  doc.setTextColor(255, 255, 255)
  doc.text("+ Careconnect Admin", PDF_CONFIG.margin, 25)

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

  if (options.pageInfo) {
    doc.text(options.pageInfo, pageWidth - PDF_CONFIG.margin, 35, { align: "right" })
  }

  // Titre du document
  doc.setFontSize(PDF_CONFIG.fontSize.subtitle)
  doc.setTextColor(0, 0, 0)
  doc.text(options.title, PDF_CONFIG.margin, 70)

  if (options.subtitle) {
    doc.setFontSize(PDF_CONFIG.fontSize.normal)
    doc.setTextColor(...PDF_CONFIG.colors.secondary)
    doc.text(options.subtitle, PDF_CONFIG.margin, 80)
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
  doc.setTextColor(...PDF_CONFIG.colors.secondary)
  doc.text("Careconnect Admin - Systeme de gestion medicale", PDF_CONFIG.margin, pageHeight - 20)
  doc.text("Email: contact@careconnect-admin.fr | Tel: +33 1 23 45 67 89", PDF_CONFIG.margin, pageHeight - 15)
  doc.text("Web: www.careconnect-admin.fr", PDF_CONFIG.margin, pageHeight - 10)

  // Numéro de page avec style
  doc.setFillColor(...PDF_CONFIG.colors.primary)
  doc.roundedRect(pageWidth - 50, pageHeight - 25, 30, 10, 2, 2, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(PDF_CONFIG.fontSize.small)
  doc.text(`Page ${pageNumber}`, pageWidth - 35, pageHeight - 18, { align: "center" })
}

// Titre de section
export const PDFSectionTitle = (
  doc: jsPDF,
  options: {
    title: string
    yPosition: number
    color?: [number, number, number]
  },
) => {
  doc.setFontSize(PDF_CONFIG.fontSize.section)
  doc.setTextColor(...(options.color || PDF_CONFIG.colors.primary))
  doc.text(options.title, PDF_CONFIG.margin, options.yPosition)
  return options.yPosition + 10
}

// Graphique en barres simple
export const PDFBarChart = (
  doc: jsPDF,
  options: {
    x: number
    y: number
    width: number
    height: number
    data: { label: string; value: number; color: number[] }[]
    title: string
  },
) => {
  const { x, y, width, height, data, title } = options

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
    const barHeight = maxValue > 0 ? (item.value / maxValue) * (height - 20) : 0
    const barX = x + index * (barWidth + spacing) + spacing / 2
    const barY = y + height - barHeight - 10

    // Barre
    doc.setFillColor(...(item.color as [number, number, number]))
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

// Grille de statistiques
export const PDFStatsGrid = (
  doc: jsPDF,
  options: {
    stats: [string, string][]
    startY: number
    title?: string
  },
) => {
  let yPosition = options.startY

  if (options.title) {
    yPosition = PDFSectionTitle(doc, {
      title: options.title,
      yPosition,
      color: PDF_CONFIG.colors.primary,
    })
  }

  autoTable(doc, {
    body: options.stats,
    startY: yPosition,
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "grid",
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 60, fillColor: PDF_CONFIG.colors.light },
      1: { halign: "right", cellWidth: 30 },
    },
  })

  return (doc as any).lastAutoTable.finalY + 15
}

// Tableau
export const PDFTable = (
  doc: jsPDF,
  options: {
    headers: string[]
    data: string[][]
    startY: number
    headerColor?: [number, number, number]
    columnStyles?: any
    theme?: "striped" | "grid" | "plain"
  },
) => {
  autoTable(doc, {
    head: [options.headers],
    body: options.data,
    startY: options.startY,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: {
      fillColor: options.headerColor || PDF_CONFIG.colors.primary,
      textColor: [255, 255, 255],
    },
    alternateRowStyles: { fillColor: PDF_CONFIG.colors.light },
    columnStyles: options.columnStyles || {},
    theme: options.theme || "striped",
  })

  return (doc as any).lastAutoTable.finalY + 15
}

// Bloc de texte
export const PDFTextBlock = (
  doc: jsPDF,
  options: {
    text: string[]
    yPosition: number
    fontSize?: number
    color?: [number, number, number]
  },
) => {
  doc.setFontSize(options.fontSize || PDF_CONFIG.fontSize.normal)
  doc.setTextColor(...(options.color || [0, 0, 0]))

  let currentY = options.yPosition
  options.text.forEach((line) => {
    doc.text(line, PDF_CONFIG.margin, currentY)
    currentY += 8
  })

  return currentY + 5
}
