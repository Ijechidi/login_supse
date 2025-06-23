import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ThemeSwitcher } from './theme-switcher'
import { AuthButton } from './auth-button'

export default function NavBar() {
  return (
    <div>
            <nav className="w-full border-b border-b-foreground/10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-4 px-6">
          <div className="flex gap-6 items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-black">
              <Heart className="w-8 h-8" />
              CareConnect
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/protected/patient/specialites" className="hover:text-black transition-colors">
                Spécialités
              </Link>
              <Link href="/protected/patient/medecins" className="hover:text-black transition-colors">
                Nos médecins
              </Link>
              <Link href="/protected/patient/contact" className="hover:text-black transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <AuthButton />
          </div>
        </div>
      </nav>
    </div>
  )
}
