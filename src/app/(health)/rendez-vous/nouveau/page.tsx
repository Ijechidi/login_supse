"use client"
import { SpecialiteAccordionCard } from '@/components/ux/SpecialiteAccordionCard'
import React from 'react'
import { useSpecialites } from '@/hooks/useSpecialites'

export default function Page() {
  const { specialites } = useSpecialites();
console.log("specialites :",specialites)
  return (
    <div className="w-full flex flex-col items-center pt-20 h-full">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Nos Spécialités Médicales
        </h1>
        {
          <div className="space-y-8 bg-transparent">
            {specialites.map((specialite, index) => (
              <div key={index} className="lg:flex gap-6">
                {/* Bloc accordéon à gauche */}
                <div className="lg:w-2/3">
                  <SpecialiteAccordionCard
                    specialite={specialite}
                    showDescription={true}
                    maxMedecinsVisible={4}
                    className="hover:shadow-lg"
                  />
                </div>
                {/* Carte explicative à droite */}
                <div className="hidden lg:block lg:w-1/3 h-full p-6 border rounded-xl bg-muted shadow-sm">
                  <h2 className="text-lg font-semibold mb-2">
                    À propos de {specialite.nom}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cette spécialité regroupe des professionnels qualifiés.
                    Choisissez un médecin disponible et réservez un rendez-vous pour discuter de votre santé.
                  </p>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}










