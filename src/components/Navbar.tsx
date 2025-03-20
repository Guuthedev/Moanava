"use client";

import ButtonCTA from "@/components/ButtonCTA";
import NavLink from "@/components/NavLink";
import { TransitionLink } from "@/components/TransitionLink";
import { useViewTransition } from "@/hooks/useViewTransition";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContactFormPopup from "./ContactFormPopup";

const menuLinks = [
  { name: "À propos", href: "/a-propos" },
  { name: "Travel Planner", href: "/services" },
];

interface NavbarProps {
  isContactOpen?: boolean;
  setIsContactOpen?: (isOpen: boolean) => void;
}

export default function Navbar({
  isContactOpen: externalIsContactOpen,
  setIsContactOpen: externalSetIsContactOpen,
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
    setIsContactOpen(true);
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
          isScrolled ? "py-1 bg-primary/95 shadow-lg" : "py-2 bg-primary/80"
        } ${isContactOpen ? "pointer-events-none" : ""} overflow-hidden w-full`}
      >
        <div className="container mx-auto px-4">
          {/* Structure en 3 colonnes */}
          <div className="grid grid-cols-3 items-center">
            {/* Logo - Colonne 1 */}
            <div className="flex justify-start">
              <TransitionLink
                href="/"
                className={getTransitionClass(
                  "relative group transition-all duration-300 hover:scale-105 transform-gpu"
                )}
              >
                <div className="relative w-32 h-8">
                  <Image
                    src="/images/logo/logo-big-moanava.webp"
                    alt="Moanava"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </TransitionLink>
            </div>

            {/* Navigation centrale - Colonne 2 - Version desktop */}
            <div className="hidden lg:flex items-center justify-center space-x-10">
              {menuLinks.map((link) => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  className={isSupported ? "nav-item" : ""}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* CTA + Menu mobile - Colonne 3 */}
            <div className="flex items-center justify-end space-x-4">
              <ButtonCTA
                size="sm"
                className="hidden lg:flex"
                onClick={handleOpenContact}
              >
                Mon Voyage sur mesure
              </ButtonCTA>

              {/* Bouton menu pour mobile et tablette */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors text-secondary lg:hidden"
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`lg:hidden ${
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0 overflow-hidden"
          } transition-all duration-300 ease-in-out flex flex-col space-y-2`}
        >
          <div className="flex flex-col space-y-3 mt-2">
            {menuLinks.map((link) => (
              <TransitionLink
                key={link.name}
                href={link.href}
                className="text-secondary font-medium p-2 hover:bg-secondary/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </TransitionLink>
            ))}

            <div className="pt-2">
              <ButtonCTA
                size="sm"
                className="w-full"
                onClick={handleOpenContact}
              >
                Voyage sur-mesure
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
