"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/520849857787552",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/moanava_travel.planner",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/johannatravelplanner/",
  },
];

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStaticFooter, setShowStaticFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileFooter, setShowMobileFooter] = useState(false);
  const currentYear = new Date().getFullYear();
  const { scrollYProgress } = useScroll();

  // Détecter si on est sur smartphone ou tablette
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640); // sm breakpoint dans Tailwind
      setIsTablet(width >= 640 && width < 768); // entre sm et md breakpoint
    };

    // Vérifier à l'initialisation
    checkDeviceType();

    // Ajouter un event listener pour le redimensionnement
    window.addEventListener("resize", checkDeviceType);

    // Nettoyer l'event listener
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  // Utiliser Framer Motion pour suivre le scroll de manière plus fluide
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculer si on est près du bas de la page
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = latest * documentHeight;
    const distanceFromBottom = documentHeight - scrollPosition - viewportHeight;

    // Calculer le pourcentage de progression vers le bas (limité entre 0 et 1)
    const progress = Math.min(1, Math.max(0, 1 - distanceFromBottom / 200));
    setScrollProgress(progress);

    // Sur mobile/tablette, vérifier si on a scrollé au moins 25% de la page
    if (isMobile || isTablet) {
      setShowMobileFooter(latest >= 0.25);
    } else {
      setShowMobileFooter(true); // Toujours visible sur desktop
    }

    // Définir si on montre le footer statique
    if (progress > 0.9) {
      setShowStaticFooter(true);
    } else if (progress < 0.1) {
      setShowStaticFooter(false);
    }
  });

  // Vérifier si on est sur mobile ou tablette
  const isSmallScreen = isMobile || isTablet;

  return (
    <>
      {/* Footer flottant (visible quand pas en bas de page) */}
      {(!isSmallScreen || (isSmallScreen && showMobileFooter)) && (
        <motion.footer
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[70]`}
          aria-expanded={isExpanded}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1 - scrollProgress,
            y: scrollProgress * 20,
            pointerEvents: scrollProgress > 0.8 ? "none" : "auto",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            className={`${
              isSmallScreen ? "bg-primary/80" : "bg-primary"
            } rounded-[1.5rem] shadow-lg group transition-all duration-300 ease-in-out hover:rounded-xl p-0.5 relative`}
            onClick={() => !isSmallScreen && setIsExpanded(!isExpanded)}
          >
            {/* Texte au-dessus - masqué sur mobile/tablette */}
            {!isSmallScreen && (
              <div
                className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-0.5 text-center transition-opacity duration-200 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                } group-hover:opacity-100`}
              >
                <div className="bg-primary/40 backdrop-blur-sm text-secondary px-2 py-0.5 rounded-lg text-xs whitespace-nowrap mx-auto inline-block shadow-md text-center">
                  Johanna,
                  <br />
                  Travel planner & Créatrice de souvenir
                </div>
              </div>
            )}

            <div className="flex flex-col items-center">
              {/* Copyright et liens légaux - masqués sur mobile/tablette */}
              {!isSmallScreen && (
                <div
                  className={`transition-all duration-200 text-center mb-0.5 ${
                    isExpanded ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
                  } group-hover:max-h-8 group-hover:opacity-100`}
                >
                  <div className="text-xs text-secondary whitespace-nowrap">
                    © {currentYear}{" "}
                    <Link
                      href="/"
                      className="text-secondary hover:underline transition-all duration-200"
                    >
                      moanava.com
                    </Link>
                    <div className="flex justify-center space-x-1.5 mt-0.5">
                      <Link
                        href="/cgv"
                        className="text-secondary hover:underline transition-all duration-200"
                      >
                        CGV
                      </Link>
                      <Link
                        href="/mentions-legales"
                        className="text-secondary hover:underline transition-all duration-200"
                      >
                        Mentions Légales
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Icônes des réseaux sociaux */}
              <div className="flex items-center justify-center w-full gap-1 p-1">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative flex items-center justify-center ${
                        isSmallScreen ? "p-1.5" : "p-2"
                      } rounded-full transition-transform duration-300 transform hover:scale-110 group/icon overflow-hidden`}
                      aria-label={link.name}
                      whileHover="hover"
                      initial="initial"
                    >
                      {/* Animation de remplissage de fond */}
                      <motion.div
                        className="absolute inset-0 bg-secondary opacity-0 rounded-full"
                        variants={{
                          initial: { opacity: 0, scale: 0 },
                          hover: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                              duration: 0.3,
                              ease: [0.25, 0.1, 0.25, 1],
                            },
                          },
                        }}
                      />

                      {/* Icône */}
                      <Icon
                        className={`${
                          isSmallScreen ? "h-5 w-5" : "h-7 w-7"
                        } text-secondary group-hover/icon:text-primary relative z-10 transition-colors duration-300`}
                        strokeWidth={isSmallScreen ? 1.25 : 1}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.footer>
      )}

      {/* Footer statique (fixé en bas de page avec épaisseur minimale) */}
      {showStaticFooter && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-primary py-2 will-change-transform z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: scrollProgress,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-1">
              {/* Partie gauche: Copyright */}
              <div className="text-xs text-secondary">
                © {currentYear}{" "}
                <Link
                  href="/"
                  className="text-secondary hover:underline transition-all duration-200"
                >
                  moanava.com
                </Link>
              </div>

              {/* Partie centrale: Signature - masquée sur mobile/tablette */}
              {!isSmallScreen && (
                <div className="text-secondary italic font-medium text-xs text-center">
                  Johanna,
                  <br />
                  Travel planner & Créatrice de souvenir
                </div>
              )}

              {/* Partie droite: Liens et réseaux sociaux */}
              <div className="flex items-center gap-3">
                {/* Liens légaux - masqués sur mobile */}
                {!isMobile && (
                  <div className="flex flex-col items-end space-y-0.5 text-xs">
                    <Link
                      href="/cgv"
                      className="text-secondary hover:underline transition-all duration-200"
                    >
                      CGV
                    </Link>
                    <Link
                      href="/mentions-legales"
                      className="text-secondary hover:underline transition-all duration-200"
                    >
                      Mentions légales
                    </Link>
                  </div>
                )}

                {/* Réseaux sociaux */}
                <div className="flex items-center space-x-1">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-center p-1 rounded-full transition-transform duration-300 transform hover:scale-110 overflow-hidden group/icon"
                        aria-label={link.name}
                        whileHover="hover"
                        initial="initial"
                      >
                        {/* Animation de remplissage de fond */}
                        <motion.div
                          className="absolute inset-0 bg-secondary opacity-0 rounded-full"
                          variants={{
                            initial: { opacity: 0, scale: 0 },
                            hover: {
                              opacity: 1,
                              scale: 1,
                              transition: {
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                              },
                            },
                          }}
                        />

                        {/* Icône */}
                        <Icon
                          className="h-4 w-4 text-secondary group-hover/icon:text-primary relative z-10 transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
