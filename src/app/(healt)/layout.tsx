import React from 'react'

interface layoutProps {
    children: React.ReactNode
}

export default function layout({children}: layoutProps) {
  return (
    <div>
        {children}
    </div>
  )
}
