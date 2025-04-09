"use client";

import ButtonCTA from "@/components/ButtonCTA";
import NavLink from "@/components/NavLink";
import { TransitionLink } from "@/components/TransitionLink";
import { useViewTransition } from "@/hooks/useViewTransition";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContactFormPopup from "./ContactFormPopup";

const menuLinks = [
  { name: "À propos", href: "/a-propos" },
  { name: "Travel Planner", href: "/travel-planner" },
  { name: "Tarifs", href: "/tarifs" },
];

interface NavbarProps {
  isContactOpen?: boolean;
  setIsContactOpen?: (isOpen: boolean) => void;
  onContactClick?: () => void;
}

export default function Navbar({
  isContactOpen: externalIsContactOpen,
  setIsContactOpen: externalSetIsContactOpen,
  onContactClick,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [internalIsContactOpen, setInternalIsContactOpen] = useState(false);
  const { isSupported } = useViewTransition();

  // Détermine si nous utilisons l'état interne ou externe pour isContactOpen
  const isContactOpen =
    externalIsContactOpen !== undefined
      ? externalIsContactOpen
      : internalIsContactOpen;
  const setIsContactOpen = externalSetIsContactOpen || setInternalIsContactOpen;

  // Détection du scroll pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ouvrir le formulaire de contact
  const handleOpenContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      setIsContactOpen(true);
    }

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Classe conditionnelle pour les éléments avec transition
  const getTransitionClass = (baseClass: string) => {
    return `${baseClass} ${isSupported ? "nav-item" : ""}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-1 bg-primary shadow-lg"
            : "py-4 bg-primary shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]"
        } ${isContactOpen ? "pointer-events-none" : ""} overflow-hidden w-full`}
      >
        <div className="container mx-auto px-4">
          {/* Structure en 3 colonnes */}
          <div className="grid grid-cols-3 items-center">
            {/* Logo - Colonne 1 */}
            <div className="flex justify-start lg:justify-start items-center">
              <TransitionLink
                href="/"
                className={getTransitionClass(
                  "relative group flex items-center mx-auto lg:mx-0"
                )}
              >
                <div className="relative w-48 h-12 transition-all duration-300 hover:scale-105 transform-gpu">
                  <Image
                    src="/images/logo/logo-big-moanava.webp"
                    alt="Moanava"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <motion.div
                  className="relative group/logo-text overflow-hidden rounded-lg -ml-1 hidden sm:block"
                  whileHover="hover"
                  initial="initial"
                >
                  {/* Animation de remplissage de fond */}
                  <motion.div
                    className="absolute inset-0 bg-secondary opacity-0 rounded-lg"
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
                  <span className="text-secondary group-hover/logo-text:text-primary font-medium text-lg px-1 py-0.5 relative z-10 transition-colors duration-300">
                    MOANAVA.COM
                  </span>
                </motion.div>
              </TransitionLink>
            </div>

            {/* Navigation centrale - Colonne 2 - Version desktop */}
            <div className="hidden lg:flex items-center justify-center space-x-10">
              {menuLinks.map((link) => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  className={
                    isSupported
                      ? `nav-item-${link.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      : ""
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* CTA + Menu mobile - Colonne 3 */}
            <div className="flex items-center justify-end lg:justify-end">
              <ButtonCTA
                size="sm"
                className="hidden lg:flex text-base font-normal h-auto py-1.5 px-4"
                onClick={handleOpenContact}
              >
                Votre voyage sur mesure
              </ButtonCTA>

              {/* Bouton menu pour mobile et tablette */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-4 sm:p-5 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors text-secondary lg:hidden touch-manipulation"
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isMenuOpen ? (
                  <X className="h-7 w-7 sm:h-8 sm:w-8" />
                ) : (
                  <Menu className="h-7 w-7 sm:h-8 sm:w-8" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`lg:hidden fixed inset-0 bg-primary backdrop-blur-sm ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          } transition-transform duration-300 ease-in-out flex flex-col items-center justify-center`}
        >
          {/* Bouton de fermeture - On le positionne à la même position que le bouton d'ouverture */}
          <div className="absolute top-0 left-0 right-0 py-4 px-4 w-full">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-3 items-center">
                <div className="col-span-2"></div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-4 sm:p-5 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors text-secondary touch-manipulation"
                    aria-label="Fermer le menu"
                  >
                    <X className="h-7 w-7 sm:h-8 sm:w-8" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6 mt-20 w-full">
            {menuLinks.map((link) => (
              <TransitionLink
                key={link.name}
                href={link.href}
                className="text-secondary font-medium p-5 hover:bg-secondary/10 rounded-md transition-colors text-center w-full text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </TransitionLink>
            ))}

            <div className="pt-4 w-5/6 sm:w-2/3">
              <ButtonCTA
                size="lg"
                className="w-full py-4"
                onClick={handleOpenContact}
              >
                Votre voyage sur mesure
              </ButtonCTA>
            </div>
          </div>
        </div>
      </nav>

      {/* Popup de formulaire de contact - Utilisé seulement si on gère l'état en interne */}
      {!externalSetIsContactOpen && (
        <ContactFormPopup
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </>
  );
}
