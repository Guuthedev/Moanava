"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Icône TikTok personnalisée
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || "h-8 w-8 text-secondary"}
  >
    <path d="M9 12a4 4 0 1 0 0 8a4 4 0 0 0 0-8z" />
    <path d="M16 8v8" />
    <path d="M12 16v-8a4 4 0 0 1 4-4" />
    <path d="M12 4h2a2 2 0 0 0 2-2" />
    <path d="M22 8a5 5 0 0 1-5-5" />
  </svg>
);

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
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  {
    name: "TikTok",
    icon: TikTokIcon,
    href: "https://tiktok.com",
    isCustomIcon: true,
  },
];

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="fixed bottom-4 right-4 z-[70] sm:bottom-4 sm:right-0 sm:left-0 sm:mx-auto sm:w-fit"
      aria-expanded={isExpanded}
    >
      <div
        className="bg-primary rounded-[1.5rem] shadow-lg group transition-all duration-300 ease-in-out hover:rounded-xl p-1 relative"
        onClick={() => setIsExpanded(!isExpanded)} // Gestion du clic pour mobile
      >
        {/* Texte au-dessus */}
        <div
          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-center transition-opacity duration-200 ${
            isExpanded ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
        >
          <div className="bg-primary text-secondary px-3 py-1 rounded-lg text-xs whitespace-nowrap mx-auto inline-block shadow-md">
            Johanna, créatrice de souvenirs.
          </div>
        </div>

        <div className="flex flex-col items-center">
          {/* Copyright et liens légaux */}
          <div
            className={`transition-all duration-200 text-center mb-1.5 ${
              isExpanded ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
            } group-hover:max-h-10 group-hover:opacity-100`}
          >
            <div className="text-xs text-secondary whitespace-nowrap">
              © {currentYear} moanava.com
              <div className="flex justify-center space-x-2 mt-0.5">
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

          {/* Icônes des réseaux sociaux */}
          <div className="flex items-center justify-center w-full gap-1">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center p-1.5 rounded-full transition-transform duration-300 transform hover:scale-110 group/icon overflow-hidden"
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
                  {link.isCustomIcon ? (
                    <div className="relative z-10">
                      <Icon className="h-8 w-8 text-secondary group-hover/icon:text-primary transition-colors duration-300" />
                    </div>
                  ) : (
                    <Icon
                      className="h-8 w-8 text-secondary group-hover/icon:text-primary relative z-10 transition-colors duration-300"
                      strokeWidth={1}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
