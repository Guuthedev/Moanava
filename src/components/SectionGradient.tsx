"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionGradientProps {
  colorClass?: string;
  topHeight?: string;
  bottomHeight?: string;
  opacity?: number;
}

export default function SectionGradient({
  colorClass = "from-primary/30 to-transparent",
  topHeight = "h-32",
  bottomHeight = "h-32",
  opacity = 0.8,
}: SectionGradientProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transformations pour l'entrée et la sortie du viewport
  const topOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, opacity, opacity, 0]
  );

  const bottomOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, opacity, opacity, 0]
  );

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    >
      {/* Gradient du haut */}
      <motion.div
        className={`absolute top-0 left-0 right-0 ${topHeight} bg-gradient-to-b ${colorClass}`}
        style={{ opacity: topOpacity }}
      />

      {/* Gradient du bas */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 ${bottomHeight} bg-gradient-to-t ${colorClass}`}
        style={{ opacity: bottomOpacity }}
      />
    </div>
  );
}
