import React from 'react'

interface layoutProps {
    children: React.ReactNode
}

export default function layout({children}: layoutProps) {
  return (
    <div className='min-h-screen flex flex-col w-screen'>
        {children}
    </div>
  )
}
