"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MouseEffectsProps {
  className?: string;
}

export function MouseEffects({ className }: MouseEffectsProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
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

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Fond avec dégradé */}
      <div
        className={cn(
          "fixed inset-0",
          "bg-fixed bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),_rgb(0,174,209,0.7)_0%,_rgb(201,251,255,0.4)_15%,_transparent_50%)]",
          "view-transition-name: mouse-effects",
          "[&:not(.next-error)]:pointer-events-none backdrop-blur-[0.8px]",
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

      {/* Cursor */}
      <div
        className="fixed w-3 h-3 rounded-full pointer-events-none z-[9999] bg-gradient-to-br from-secondary to-secondary/50"
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
        }}
      />
    </>
  );
}
