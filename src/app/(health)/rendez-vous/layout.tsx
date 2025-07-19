
export default function RootLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
    return (
      <html lang="fr">
        <body>
          {children}
          {modal} 
        </body>
      </html>
    );
  }
  