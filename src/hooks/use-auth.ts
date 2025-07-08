"use client"

import { useState } from "react"
import type { Role } from "@/types/medical"

// Simulation d'un hook d'authentification
export function useAuth() {
  // En production, ceci viendrait d'un contexte d'authentification réel
  const [currentUser] = useState({
    id: "1",
    role: "ADMIN" as Role,
    nom: "Dupont",
    prenom: "Jean",
  })

  const hasRole = (allowedRoles: Role[]) => {
    return allowedRoles.includes(currentUser.role)
  }

  const canAccess = (requiredRoles: Role[]) => {
    return hasRole(requiredRoles)
  }

  return {
    currentUser,
    hasRole,
    canAccess,
  }
}
