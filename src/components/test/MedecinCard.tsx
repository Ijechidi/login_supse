import Image from 'next/image'
import React from 'react'

export default function MedecinCard() {
  return (
      <div className="bg-card  shadow-md rounded-lg p-6">
        <div className="flex flex-col gap-4 items-center">   

            <Image
                src="https://via.placeholder.com/80"
                alt="Médecin"
                className="w-20 h-20 rounded-full bg-muted border object-cover"
                height={200}
                width={200}
            />
            <div>
                <h2 className="text-xl font-semibold">Dr. Jean Dupont</h2>
                <p className="text-gray-600">Cardiologue</p>
                <p className="text-gray-500">Spécialiste en cardiologie</p>
            </div>
        </div>
    </div>
  )
}
