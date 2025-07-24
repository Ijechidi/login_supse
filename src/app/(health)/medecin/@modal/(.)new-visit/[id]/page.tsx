import ModalRendevous from "@/components/Rendevous/ModalRendevous";
import Modal from "@/components/ux/Modal";





export default async function ModalPage({ params }: { params: Promise<{ id: string }> }) {
  const param = await params
  return <Modal id="1">
bite
  </Modal>
  // return <ModalRendevous id={param.id} />;
}
