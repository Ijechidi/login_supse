



export default async function ModalPage({ params }: { params: Promise<{ id: string }> }) {
  const param = await params
  // return <ModalRendevous id={param.id} />;
  return null
}
