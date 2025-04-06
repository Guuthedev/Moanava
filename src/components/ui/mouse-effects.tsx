"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MouseEffectsProps {
  className?: string;
}

export function MouseEffects({ className }: MouseEffectsProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Marquer le composant comme monté après le premier rendu côté client
    setMounted(true);

    // Détecte si l'appareil est mobile/tablette
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // Vérifie immédiatement
    checkIfMobile();

    // Ajoute un écouteur pour le redimensionnement
    window.addEventListener("resize", checkIfMobile);

    const handleMouseMove = (e: MouseEvent) => {
      // Mise à jour instantanée de la position
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };

    // N'ajoute l'événement que si ce n'est pas un mobile
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isMobile]);

  // Ne rien afficher pendant le premier rendu ou sur mobile
  if (!mounted || isMobile) {
    return null;
  }

  return (
    <>
      {/* Fond avec dégradé */}
      <div
        className={cn(
          "fixed inset-0",
          "bg-fixed bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),_rgb(0,174,209,0.7)_0%,_rgb(201,251,255,0.4)_15%,_transparent_50%)]",
          "view-transition-name: mouse-effects",
          "pointer-events-none backdrop-blur-[0.8px]",
          className
        )}
        style={
          {
            zIndex: 0,
            "--mouse-x": `${mousePosition.x}%`,
            "--mouse-y": `${mousePosition.y}%`,
          } as React.CSSProperties
        }
      />

      {/* Curseur */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: 0,
          top: 0,
        }}
      >
        {/* Curseur en forme de flèche */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3))",
          }}
        >
          <path
            d="M4 3L20 12L13 13.5L11.5 20.5L4 3Z"
            fill="#00aed1"
            stroke="#c9fbff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
