"use client"
import React from 'react'
import DisponibiliteList, { DisponibiliteListProps } from './DisponibiliteList'

export default function Dispo({
    disponibilites,
  }: DisponibiliteListProps) {


  return (
    <div>

        <DisponibiliteList disponibilites={disponibilites} onDelete={()=>{}} />
    </div>
  )
}
