"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, Plane } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface TarifsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TarifsPopup({ isOpen, onClose }: TarifsPopupProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay opaque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl px-4 sm:px-6 md:px-8"
          >
            <motion.div
              className="bg-primary rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mx-auto"
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
              <div className="flex flex-col gap-8 relative">
                <div className="flex flex-col items-center gap-4 text-center">
                  <h3 className="text-2xl font-bold text-white">
                    Découvrez nos formules
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Des tarifs transparents et adaptés à chaque projet
                  </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {/* Option Travel Planner */}
                  <Link
                    href="/tarifs-voyage-sur-mesure"
                    className="relative group h-[400px] w-full"
                    onMouseEnter={() => setHoveredOption("travel")}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <motion.div
                      className="bg-white/20 hover:bg-white/30 rounded-xl p-8 transition-all duration-300 h-full flex flex-col justify-center items-center"
                      whileHover={{ scale: 1 }}
                    >
                      <div className="flex flex-col items-center gap-6 text-center">
                        <motion.div
                          className="bg-white/20 p-6 rounded-full"
                          animate={{
                            scale: hoveredOption === "travel" ? 1.2 : 1,
                            rotate: hoveredOption === "travel" ? 360 : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <Plane className="h-12 w-12 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-white">
                          Création de voyage sur mesure
                        </h4>
                        <motion.div
                          className="space-y-6 w-full"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: hoveredOption === "travel" ? 1 : 0,
                            height: hoveredOption === "travel" ? "auto" : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-white/90 text-lg">
                            Pour la Polynésie
                            <br />
                            et partout ailleurs !
                          </p>
                          <p className="text-white/90 text-lg">
                            Je crée votre voyage de rêve sur mesure,
                            <br />
                            avec des tarifs transparents
                            <br />
                            et des formules adaptées à chaque projet.
                          </p>
                        </motion.div>
                      </div>
                      <motion.span
                        className="text-white font-medium mt-8 flex items-center gap-2 justify-center text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredOption === "travel" ? 1 : 0,
                          y: hoveredOption === "travel" ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Explorer les formules
                        <motion.span
                          animate={{
                            x: hoveredOption === "travel" ? 5 : 0,
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.5,
                          }}
                        >
                          →
                        </motion.span>
                      </motion.span>
                    </motion.div>
                  </Link>

                  {/* Option Création Vidéo */}
                  <Link
                    href="/tarifs#video-creator"
                    className="relative group h-[400px] w-full"
                    onMouseEnter={() => setHoveredOption("video")}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <motion.div
                      className="bg-white/20 hover:bg-white/30 rounded-xl p-8 transition-all duration-300 h-full flex flex-col justify-center items-center"
                      whileHover={{ scale: 1 }}
                    >
                      <div className="flex flex-col items-center gap-6 text-center">
                        <motion.div
                          className="bg-white/20 p-6 rounded-full"
                          animate={{
                            scale: hoveredOption === "video" ? 1.2 : 1,
                            rotate: hoveredOption === "video" ? 360 : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <Camera className="h-12 w-12 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-white">
                          Création de vidéo promotionnelle
                        </h4>
                        <motion.div
                          className="space-y-6 w-full"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: hoveredOption === "video" ? 1 : 0,
                            height: hoveredOption === "video" ? "auto" : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-white/90 text-lg">
                            Pour mettre en valeur votre hébergement
                            <br />
                            ou votre activité en Polynésie
                          </p>
                          <p className="text-white/90 text-lg">
                            Je crée des vidéos professionnelles
                            <br />
                            qui captent l&apos;essence de votre établissement
                            <br />
                            et attirent les voyageurs du monde entier.
                          </p>
                        </motion.div>
                      </div>
                      <motion.span
                        className="text-white font-medium mt-8 flex items-center gap-2 justify-center text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredOption === "video" ? 1 : 0,
                          y: hoveredOption === "video" ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Explorer les formules
                        <motion.span
                          animate={{
                            x: hoveredOption === "video" ? 5 : 0,
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.5,
                          }}
                        >
                          →
                        </motion.span>
                      </motion.span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
