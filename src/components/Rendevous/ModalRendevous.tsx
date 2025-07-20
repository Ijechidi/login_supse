"use client"
import Modal from '@/components/ux/Modal'
import React from 'react'
import { CreateVisitWithDispo } from './CreateVisitWithDispo'
import { useRouter } from 'next/navigation'

export default function ModalRendevous({id}: {id: string}) {
    const router = useRouter()
  const handleSucces = () =>{
      router.back()
  }

  return (
    <Modal id={id}>
        <CreateVisitWithDispo onSuccess={handleSucces} disponibiliteId={id} />
    </Modal>
  )
}
