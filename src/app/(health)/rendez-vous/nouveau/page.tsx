"use client"

import React from 'react'


export default function Page() {


  return (
    <div className="w-full flex flex-col items-center pt-20 h-full">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Nos Spécialités Médicales
        </h1>
    
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