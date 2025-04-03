"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Direction = "up" | "down" | "left" | "right";

interface SectionTransitionProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

const getTransitionValues = (
  direction: Direction
): { initial: { y?: number; x?: number; opacity: number } } => {
  switch (direction) {
    case "up":
      return { initial: { y: 30, opacity: 0 } };
    case "down":
      return { initial: { y: -30, opacity: 0 } };
    case "left":
      return { initial: { x: 30, opacity: 0 } };
    case "right":
      return { initial: { x: -30, opacity: 0 } };
    default:
      return { initial: { y: 30, opacity: 0 } };
  }
};

export default function SectionTransition({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  id,
}: SectionTransitionProps) {
  const { initial } = getTransitionValues(direction);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détecte si l'appareil est mobile/tablette
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Vérifie immédiatement
    checkIfMobile();

    // Ajoute un écouteur pour le redimensionnement
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Pas d'animation sur mobile
  if (isMobile) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      id={id}
      initial={initial}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.06, 0.9, 0.15, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
