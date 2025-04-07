"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      {/* Fond avec image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}

      {/* Contenu au premier plan */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Élément décoratif (vague) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-10">
        <svg
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 74L48 66.3C96 58.7 192 43.3 288 32.7C384 22 480 16 576 21.3C672 26.7 768 43.3 864 53.3C960 63.3 1056 66.7 1152 61.3C1248 56 1344 42 1392 35L1440 28V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V74Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
