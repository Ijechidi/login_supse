"use client"

import HeroSection from "@/components/hero/HeroSection";
import FeaturesSection from "@/components/hero/FeaturesSection";
import SpecialtiesSection from "@/components/hero/SpecialtiesSection";
import TestimonialsSection from "@/components/hero/TestimonialsSection";
import CallToActionSection from "@/components/hero/CallToActionSection";
import Link from "next/link";
import { Heart, Phone, MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <HeroSection />
      <FeaturesSection />
      <SpecialtiesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <footer className="bg-background text-foreground py-16 px-6 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Heart className="w-6 h-6" />
                CareConnect
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Votre plateforme de confiance pour la prise de rendez-vous
                médicaux en ligne.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Informations</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/protected/patient/info/about"
                    className="hover:text-foreground transition-colors"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/protected/patient/info/faq"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +228 90 00 00 00
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Avedji , Lomé-Togo
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 text-center text-sm text-muted-foreground">
            © 2025 CareConnect. Tous droits réservés.
          </div>
        </div>
      </footer>
    </main>
  )
}
