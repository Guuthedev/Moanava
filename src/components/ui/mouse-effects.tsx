"use client";

import { useEffect, useState } from "react";

export function MouseEffects() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [customMouseEnabled] = useState(true);

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
      });
    };

    // N'ajoute l'événement que si ce n'est pas un mobile et que la souris personnalisée est activée
    if (!isMobile && customMouseEnabled) {
      window.addEventListener("mousemove", handleMouseMove);

      // Appliquer le style cursor-none au body
      if (typeof document !== "undefined") {
        document.body.classList.add("cursor-none");
        document.body.classList.remove("cursor-auto");
      }
    } else {
      // Remettre le curseur normal
      if (typeof document !== "undefined") {
        document.body.classList.remove("cursor-none");
        document.body.classList.add("cursor-auto");
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isMobile, customMouseEnabled]);

  // Ne rien afficher pendant le premier rendu ou sur mobile
  if (!mounted || isMobile) {
    return null;
  }

  return (
    <>
      {/* Curseur personnalisé */}
      {customMouseEnabled && (
        <div
          className="fixed pointer-events-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            left: 0,
            top: 0,
            zIndex: 2147483647, // Valeur maximale de z-index
          }}
          suppressHydrationWarning={true}
        >
          {/* Curseur en forme de flèche avec taille augmentée */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.35))",
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
      )}
    </>
  );
}
