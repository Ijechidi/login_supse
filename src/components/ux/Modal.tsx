"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface ModalProps {
  id: string;
  children?: ReactNode;
}

export default function Modal({ id, children }: ModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // ferme la modale
  };

  return (
    <div className="border bg-background rounded-xl p-6 shadow-xl w-[500px] max-w-full">

      {/* Contenu injecté */}
      <div className="mb-4">{children}</div>

      <div className="border rounded flex w-fit p-px">
        <Button className="border rounded" onClick={handleClose}>
          Fermer
        </Button>
      </div>
    </div>
  );
}
