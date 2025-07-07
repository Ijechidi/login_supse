
import { Heart } from "lucide-react"
import Link from "next/link"
import { ThemeSwitcher } from "./theme-switcher"
import { AuthButton } from "./auth-button"
import VisitStatus from "./VisitStatus"

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo & Menu */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Heart className="h-6 w-6" />
            CareConnect
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/protected/patient/specialites"
              className="transition-colors hover:text-foreground"
            >
              Spécialités
            </Link>
            <Link
              href="/rendez-vous/nouveau"
              className="transition-colors hover:text-foreground"
            >
              Nos médecins
            </Link>
            <Link
              href="/protected/patient/contact"
              className="transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
        <VisitStatus/>
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </div>
    </header>
  )
}
