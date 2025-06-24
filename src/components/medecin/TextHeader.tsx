import React from 'react'

interface TextHeaderProps {
    title?: string;
    subtitle?: string;
    }

export default function TextHeader({ title="Prise de Rendez-vous", subtitle="Veuillez remplir le formulaire ci-dessous pour prendre un rendez-vous." }: TextHeaderProps ) {
  return (
    <div className='my-8 text-center flex flex-col border-border  border-4 rounded-lg p-6 bg-white shadow-md'>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  )
}
