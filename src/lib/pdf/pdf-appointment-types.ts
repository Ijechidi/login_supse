"use client"

import type { TypeRendezVous, RendezVous } from "@/types/medical"
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
} from "./pdf-utils"

export const exportAppointmentTypesToPDF = (types: TypeRendezVous[], appointments: RendezVous[]) => {
  // <PDFDocument>
  const doc = createPDFDocument()

  // <Header>
  let yPosition = PDFHeader(doc, {
    title: "Configuration des Types de Rendez-vous",
    subtitle: `${types.length} type(s) configure(s) - Statistiques d'utilisation`,
  })
  // </Header>

  // <UsageAnalysis>
  const typeUsage = types
    .map((type) => ({
      ...type,
      usage: appointments.filter((apt) => apt.typeId === type.id).length,
    }))
    .sort((a, b) => b.usage - a.usage)

  // <UsageChart>
  const usageChartData = typeUsage.slice(0, 6).map((type) => ({
    label: type.nom.length > 8 ? type.nom.substring(0, 8) + "..." : type.nom,
    value: type.usage,
    color: PDF_CONFIG.colors.info,
  }))

  if (usageChartData.length > 0) {
    yPosition = PDFBarChart(doc, {
      x: PDF_CONFIG.margin,
      y: yPosition + 10,
      width: 170,
      height: 40,
      data: usageChartData,
      title: "Utilisation par type de consultation",
    })
  }
  // </UsageChart>

  // <GeneralStats>
  const totalUsage = typeUsage.reduce((acc, type) => acc + type.usage, 0)
  const mostUsedType = typeUsage[0]
  const leastUsedType = typeUsage[typeUsage.length - 1]

  const statsData: [string, string][] = [
    ["Types configures", types.length.toString()],
    ["Utilisation totale", totalUsage.toString()],
    ["Plus utilise", `${mostUsedType?.nom} (${mostUsedType?.usage})`],
    ["Moins utilise", `${leastUsedType?.nom} (${leastUsedType?.usage})`],
    ["Utilisation moyenne", Math.round(totalUsage / types.length).toString()],
  ]

  yPosition = PDFStatsGrid(doc, {
    stats: statsData,
    startY: yPosition + 15,
  })
  // </GeneralStats>
  // </UsageAnalysis>

  // <TypesConfiguration>
  yPosition = PDFSectionTitle(doc, {
    title: "Configuration detaillee",
    yPosition: yPosition + 15,
  })

  const tableData = typeUsage.map((type, index) => [
    (index + 1).toString(),
    type.nom,
    type.code,
    type.couleur || "N/A",
    type.usage.toString(),
    Math.round((type.usage / totalUsage) * 100) + "%",
    formatDate(type.createdAt),
  ])

  yPosition = PDFTable(doc, {
    headers: ["#", "Nom", "Code", "Couleur", "Utilisations", "% Total", "Cree le"],
    data: tableData,
    startY: yPosition,
    headerColor: PDF_CONFIG.colors.info,
  })
  // </TypesConfiguration>

  // <TypesDescriptions>
  yPosition = PDFSectionTitle(doc, {
    title: "Descriptions et recommandations",
    yPosition: yPosition + 15,
  })

  types.forEach((type) => {
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 60
    }

    // <TypeDetail>
    yPosition = PDFSectionTitle(doc, {
      title: `${type.nom} (${type.code})`,
      yPosition,
      color: [0, 0, 0],
    })

    const description = type.description || "Aucune description disponible"
    const usage = typeUsage.find((t) => t.id === type.id)?.usage || 0

    const typeDetails = [`Description: ${description}`, `Utilisation: ${usage} rendez-vous`]

    yPosition = PDFTextBlock(doc, {
      text: typeDetails,
      yPosition: yPosition + 5,
      fontSize: PDF_CONFIG.fontSize.small,
      color: PDF_CONFIG.colors.secondary,
    })
    // </TypeDetail>

    yPosition += 10
  })
  // </TypesDescriptions>

  // <Footer & Save>
  savePDFDocument(doc, "types-rendez-vous-detaille")
  // </Footer & Save>
  // </PDFDocument>
}
