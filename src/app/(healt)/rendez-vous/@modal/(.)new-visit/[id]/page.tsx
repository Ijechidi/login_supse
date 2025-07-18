// app/@modal/new-visit/[id]/page.tsx

import ModalRendevous from "@/components/uix/Rendevous/ModalRendevous";



export default function ModalPage({ params }: { params: { id: string } }) {
  return <ModalRendevous id={params.id} />;
}
