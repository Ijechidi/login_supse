export default function ModalLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        {children}
      </div>
    );
  }