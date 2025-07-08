import Link from "next/link"
import type { UserInfo } from "@/types/userInfo"

interface NavLinkProps {
  role: UserInfo["role"]
}

export function NavLink({ role }: NavLinkProps) {
  let links: { href: string; label: string }[] = []

  if (role === "PATIENT") {
    links = [
      { href: "/rendez-vous/", label: "rendez-vous" },
      { href: "/rendez-vous/nouveau", label: "Nos médecins" },
      { href: "/patient", label: "profile" },
      { href: "/contact", label: "Contact" },
    ]
  } else if (role === "MEDECIN") {
    links = [
      { href: "/medecin", label: "medecin" },
      { href: "/medecin/patients", label: "Mes patients" },
      { href: "/medecin/rendez-vous", label: "Rendez-vous" },
    ]
  } else if (role === "ADMIN") {
    links = [
      { href: "/protected/dashboard", label: "Dashboard" },
    ]
  } else if (role === "SECRETAIRE") {
    links = [
      { href: "/secretaire/rendez-vous", label: "Rendez-vous" },
      { href: "/secretaire/patients", label: "Patients" },
    ]
  }

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="transition-colors hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
