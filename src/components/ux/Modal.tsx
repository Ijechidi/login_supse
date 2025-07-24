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
    <div className=" flex flex-col px-4 py-8 border bg-background rounded-xl gap-8  shadow-xl w-[500px] md:w-full max-w-4xl">

      {/* Contenu injecté */}
      <div className="flex justify-center items-center mt-4">{children}</div>

    
        <Button className="border w-fit flex mx-12 rounded" onClick={handleClose}>
          Fermer
        </Button>

    </div>
  );
}
