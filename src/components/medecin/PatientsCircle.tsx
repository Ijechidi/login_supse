import React from 'react'
import { AvatarsToolTip } from './patients/AvatarsToolTip'

export default function PatientsCircle() {
  return (
    <div className='rounded-full flex justify-center overflow-hidden items-center border-4 size-52'>
      <AvatarsToolTip/>
    </div>
  )
}
