"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down";
}

export default function SectionTransition({
  children,
  className = "",
  direction = "up",
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [100, -100] : [-100, 100]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={`relative w-full ${className}`}
      style={{
        y,
        opacity,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
