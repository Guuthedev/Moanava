"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function InfoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Afficher le popup après 15 secondes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay opaque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsVisible(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <motion.div
              className="bg-primary rounded-2xl p-8 shadow-2xl relative overflow-hidden"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              animate={{
                scale: isHovered ? 1.02 : 1,
                transition: { duration: 0.2 },
              }}
            >
              {/* Effet de brillance au survol */}
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />

              {/* Contenu */}
              <div className="flex flex-col gap-6 relative">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Le saviez-vous ?
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed">
                      En moyenne, mes clients économisent 15% sur leur voyage
                      tout en profitant d&apos;expériences de qualité
                      supérieure.
                    </p>
                  </div>
                </div>

                {/* Bouton Instagram */}
                <Link
                  href="https://www.instagram.com/moanava_travel.planner/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="font-medium">
                    Suivez-moi sur Instagram pour plus d&apos;actualités
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
