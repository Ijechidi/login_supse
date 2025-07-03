
import { SpecialiteAccordionCard } from '@/components/ux/SpecialiteAccordionCard'

import { specialites } from '@/data/mockSpecialites'
import React from 'react'

export default function page() {
  return (
    <div className='w-screen flex flex-col items-center h-full pt-20 justify-center'>
     

 <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Nos Spécialités Médicales
      </h1>
      
      
{/* <h1> avec accordion </h1> */}

      <div className="space-y-8 bg-transparent">
        {specialites.map((specialite, index) => (
          <SpecialiteAccordionCard
            key={index}
            specialite={specialite}
            showDescription={true}
            maxMedecinsVisible={4}
            className="hover:shadow-lg"
          />
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