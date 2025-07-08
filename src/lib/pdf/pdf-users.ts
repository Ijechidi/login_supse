"use client"

import type { User } from "@/types/medical"
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
  calculateAge,
} from "./pdf-utils"

export const exportUsersToPDF = (users: User[], filters?: { role?: string; dateFrom?: string; dateTo?: string }) => {
  // <PDFDocument>
  const doc = createPDFDocument()

  // Filtrage des données
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

  // <Header>
  const filterInfo = filters?.role ? `Filtre: ${filters.role}` : "Tous les roles"
  let yPosition = PDFHeader(doc, {
    title: "Rapport des Utilisateurs",
    subtitle: `${filteredUsers.length} utilisateur(s) - ${filterInfo}`,
    pageInfo: `Total: ${users.length} utilisateurs`,
  })
  // </Header>

  // <RoleAnalysis>
  const roleStats = {
    ADMIN: filteredUsers.filter((u) => u.role === "ADMIN").length,
    MEDECIN: filteredUsers.filter((u) => u.role === "MEDECIN").length,
    PATIENT: filteredUsers.filter((u) => u.role === "PATIENT").length,
    SECRETAIRE: filteredUsers.filter((u) => u.role === "SECRETAIRE").length,
  }

  // <RoleChart>
  const chartData = [
    { label: "Admin", value: roleStats.ADMIN, color: PDF_CONFIG.colors.danger },
    { label: "Medecin", value: roleStats.MEDECIN, color: PDF_CONFIG.colors.info },
    { label: "Patient", value: roleStats.PATIENT, color: PDF_CONFIG.colors.success },
    { label: "Secretaire", value: roleStats.SECRETAIRE, color: PDF_CONFIG.colors.warning },
  ].filter((item) => item.value > 0)

  if (chartData.length > 0) {
    yPosition = PDFBarChart(doc, {
      x: PDF_CONFIG.margin,
      y: yPosition + 10,
      width: 170,
      height: 40,
      data: chartData,
      title: "Repartition par role",
    })
  }
  // </RoleChart>

  // <DetailedStats>
  const statsData: [string, string][] = [
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

  yPosition = PDFStatsGrid(doc, {
    stats: statsData,
    startY: yPosition + 10,
    title: "Statistiques detaillees",
  })
  // </DetailedStats>
  // </RoleAnalysis>

  // <UsersTable>
  yPosition = PDFSectionTitle(doc, {
    title: "Liste detaillee des utilisateurs",
    yPosition: yPosition + 15,
  })

  const tableData = filteredUsers.map((user, index) => [
    (index + 1).toString(),
    `${user.nom} ${user.prenom}`,
    user.email,
    user.telephone,
    user.role,
    user.age?.toString() || calculateAge(user.dateNaissance).toString(),
    formatDate(user.createdAt),
  ])

  yPosition = PDFTable(doc, {
    headers: ["#", "Nom complet", "Email", "Telephone", "Role", "Age", "Inscrit le"],
    data: tableData,
    startY: yPosition,
    headerColor: PDF_CONFIG.colors.primary,
  })
  // </UsersTable>

  // <Footer & Save>
  savePDFDocument(doc, "rapport-utilisateurs")
  // </Footer & Save>
  // </PDFDocument>
}
