import Link from "next/link";
import * as React from "react";

interface HoverSlideOverlayProps {
  text: string;
  className?: string;
  children: React.ReactNode;
  href?: string;
  withHover?: boolean; // <-- nouveau prop
}

export function HoverSlideOverlay({
  text,
  className = "",
  children,
  href,
  withHover = true, // par défaut on active le hover
}: HoverSlideOverlayProps) {
  if (!withHover) {
    // Aucun effet de survol, juste les enfants rendus
    return <div className={`flex justify-center items-center ${className}`}>{children}</div>;
  }

  return (
    <div
      className={`relative overflow-hidden group inline-flex items-center justify-center ${className}`}
    >
      {/* Contenu principal */}
      <div className="relative z-10 pointer-events-none">{children}</div>

      {/* Overlay au hover */}
      <div
        className="
          absolute inset-0 z-20 flex items-center justify-center bg-primary-foreground/70
          translate-x-full group-hover:translate-x-0
          transition-transform duration-500 ease-out
          pointer-events-auto
        "
      >
        {href ? (
          <Link href={href} className="text-sm font-semibold text-primary">
            {text}
          </Link>
        ) : (
          <span className="text-sm font-semibold text-primary">{text}</span>
        )}
      </div>
    </div>
  );
}
