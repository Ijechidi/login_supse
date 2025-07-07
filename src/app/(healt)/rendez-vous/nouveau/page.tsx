import { SpecialiteAccordionCard } from '@/components/ux/SpecialiteAccordionCard'
import { specialites } from '@/data/mockSpecialites'
import React from 'react'

export default function page() {
  return (
    <div className="w-full flex flex-col items-center pt-20 h-full">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Nos Spécialités Médicales
        </h1>

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
                 choisiser un médecins disponibles et réserver un rendevous pour discutez de votre santee.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}










  {/* Exemple avec personnalisation */}
      {/* <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Affichage compact</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {specialites.map((specialite, index) => (
            <SpecialiteCard
              key={index}
              specialite={specialite}
              showDescription={false}
              maxMedecinsVisible={2}
              className="h-fit"
            />
          ))}
        </div>
      </div> */}