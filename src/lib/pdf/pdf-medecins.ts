"use client"

import type { Medecin } from "@/types/medical"
import {
  createPDFDocument,
  savePDFDocument,
  PDFHeader,
  PDFSectionTitle,
  PDFBarChart,
  PDFStatsGrid,
  PDFTable,
  PDF_CONFIG,
} from "./pdf-utils"

export const exportMedecinsToPDF = (medecins: Medecin[], includeSchedule = true) => {
  // <PDFDocument>
  const doc = createPDFDocument()

  // <Header>
  let yPosition = PDFHeader(doc, {
    title: "Equipe Medicale",
    subtitle: `${medecins.length} medecin(s) - Specialites et disponibilites`,
    pageInfo: includeSchedule ? "Planning inclus" : "Vue d'ensemble",
  })
  // </Header>

  // <SpecialtyAnalysis>
  const specialites = [...new Set(medecins.map((m) => m.specialite))]
  const specialiteStats = specialites.map((spec) => ({
    label: spec.length > 10 ? spec.substring(0, 10) + "..." : spec,
    value: medecins.filter((m) => m.specialite === spec).length,
    color: PDF_CONFIG.colors.info,
  }))

  // <SpecialtyChart>
  if (specialiteStats.length > 0) {
    yPosition = PDFBarChart(doc, {
      x: PDF_CONFIG.margin,
      y: yPosition + 10,
      width: 170,
      height: 35,
      data: specialiteStats,
      title: "Repartition par specialite",
    })
  }
  // </SpecialtyChart>

  // <GeneralStats>
  const totalDisponibilites = medecins.reduce((acc, m) => acc + m.disponibilites.length, 0)
  const medecinsDisponibles = medecins.filter((m) => m.disponibilites.length > 0).length

  const statsData: [string, string][] = [
    ["Total medecins", medecins.length.toString()],
    ["Medecins disponibles", medecinsDisponibles.toString()],
    ["Specialites", specialites.length.toString()],
    ["Creneaux totaux", totalDisponibilites.toString()],
    ["Creneaux/medecin", Math.round((totalDisponibilites / medecins.length) * 10) / 10 + ""],
  ]

  yPosition = PDFStatsGrid(doc, {
    stats: statsData,
    startY: yPosition + 10,
  })
  // </GeneralStats>
  // </SpecialtyAnalysis>

  // <MedicalDirectory>
  yPosition = PDFSectionTitle(doc, {
    title: "Annuaire medical",
    yPosition: yPosition + 15,
  })

  const tableData = medecins.map((medecin, index) => [
    (index + 1).toString(),
    `Dr. ${medecin.user.nom} ${medecin.user.prenom}`,
    medecin.specialite,
    medecin.user.telephone,
    medecin.disponibilites.length.toString(),
    medecin.disponibilites.length > 0 ? "Disponible" : "Indisponible",
  ])

  yPosition = PDFTable(doc, {
    headers: ["#", "Medecin", "Specialite", "Telephone", "Creneaux", "Statut"],
    data: tableData,
    startY: yPosition,
    headerColor: PDF_CONFIG.colors.info,
  })
  // </MedicalDirectory>

  // <ScheduleDetails>
  if (includeSchedule) {
    doc.addPage()
    yPosition = PDFHeader(doc, {
      title: "Planning des Disponibilites",
      subtitle: "Horaires par medecin et par jour",
    })

    medecins.forEach((medecin) => {
      if (medecin.disponibilites.length === 0) return

      // Vérifier l'espace disponible
      if (yPosition > 200) {
        doc.addPage()
        yPosition = 60
      }

      yPosition = PDFSectionTitle(doc, {
        title: `Dr. ${medecin.user.nom} ${medecin.user.prenom} - ${medecin.specialite}`,
        yPosition,
        color: PDF_CONFIG.colors.primary,
      })

      const scheduleData = medecin.disponibilites.map((dispo) => [
        dispo.jour,
        dispo.heureDebut,
        dispo.heureFin,
        `${dispo.heureDebut} - ${dispo.heureFin}`,
      ])

      yPosition = PDFTable(doc, {
        headers: ["Jour", "Debut", "Fin", "Creneau complet"],
        data: scheduleData,
        startY: yPosition,
        headerColor: PDF_CONFIG.colors.warning,
      })

      yPosition += 15
    })
  }
  // </ScheduleDetails>

  // <Footer & Save>
  savePDFDocument(doc, "equipe-medicale")
  // </Footer & Save>
  // </PDFDocument>
}
