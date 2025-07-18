"use client"
import Modal from '@/components/ux/Modal'
import React from 'react'
import { CreateVisitWithDispo } from './CreateVisitWithDispo'

export default function ModalRendevous({id}: {id: string}) {
  return (
    <Modal id={id}>
        <CreateVisitWithDispo disponibiliteId={id} />
    </Modal>
  )
}
