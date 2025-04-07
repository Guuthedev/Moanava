"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Instagram, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function InfoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Marquer le composant comme monté après le premier rendu côté client
    setMounted(true);

    // Définir le mode de développement seulement côté client
    if (typeof window !== "undefined") {
      if (process.env.NODE_ENV === "development") {
        // Utiliser cette approche plutôt que setIsDev
        const devElement = document.getElementById("dev-mode");
        if (devElement) {
          devElement.style.display = "block";
        }
      }
    }

    // Vérifier si le popup a déjà été affiché (seulement côté client)
    if (typeof window !== "undefined") {
      const hasShownPopup = localStorage.getItem("popupShown");

      if (!hasShownPopup) {
        // Fonction pour vérifier la position de défilement
        const checkScrollPosition = () => {
          // Hauteur totale de la page - hauteur visible
          const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          // Position actuelle de défilement
          const scrollTop =
            window.scrollY || document.documentElement.scrollTop;

          // Si la position de défilement dépasse 50% de la hauteur totale scrollable
          if (scrollHeight > 0 && scrollTop / scrollHeight >= 0.5) {
            setIsVisible(true);
            // Marquer le popup comme affiché
            localStorage.setItem("popupShown", "true");
            // Supprimer l'écouteur d'événement
            window.removeEventListener("scroll", checkScrollPosition);
          }
        };

        // Ajouter l'écouteur d'événement de défilement
        window.addEventListener("scroll", checkScrollPosition);

        // Vérifier immédiatement au cas où la page est déjà scrollée
        checkScrollPosition();

        // Nettoyer l'écouteur d'événement lors du démontage
        return () => window.removeEventListener("scroll", checkScrollPosition);
      }
    }
  }, [mounted]);

  // Fonction pour réinitialiser le popup (utile pour les tests en développement)
  const resetPopupState = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("popupShown");
      setIsVisible(true);
    }
  };

  // Ne rien afficher pendant le premier rendu côté client
  if (!mounted) {
    return null;
  }

  return (
    <>
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
              suppressHydrationWarning={true}
            />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4 sm:px-6 md:px-8"
              suppressHydrationWarning={true}
            >
              <motion.div
                className="bg-primary rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mx-auto"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={{
                  scale: isHovered ? 1.02 : 1,
                  transition: { duration: 0.2 },
                }}
                suppressHydrationWarning={true}
              >
                {/* Effet de brillance au survol */}
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  suppressHydrationWarning={true}
                />

                {/* Contenu */}
                <div
                  className="flex flex-col gap-6 relative"
                  suppressHydrationWarning={true}
                >
                  <div
                    className="flex flex-col items-center gap-4 text-center"
                    suppressHydrationWarning={true}
                  >
                    <h3 className="text-xl font-bold text-white">
                      Restez connecté !
                    </h3>
                    <div
                      className="bg-white/20 p-3 rounded-full"
                      suppressHydrationWarning={true}
                    >
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1" suppressHydrationWarning={true}>
                      <p className="text-lg text-white/90 leading-relaxed">
                        Suivez-moi sur les réseaux sociaux pour découvrir mes
                        dernières destinations, des conseils de voyage exclusifs
                        et des offres privilégiées.
                      </p>
                    </div>
                  </div>

                  {/* Boutons des réseaux sociaux */}
                  <div
                    className="flex flex-col gap-3"
                    suppressHydrationWarning={true}
                  >
                    <Link
                      href="https://www.instagram.com/moanava_travel.planner/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-colors duration-200 overflow-hidden group"
                      onMouseEnter={() => setHoveredSocial("instagram")}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          scale: hoveredSocial === "instagram" ? 1.2 : 1,
                          opacity: hoveredSocial === "instagram" ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        suppressHydrationWarning={true}
                      >
                        <Instagram className="h-8 w-8" />
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-center gap-2"
                        animate={{
                          opacity: hoveredSocial === "instagram" ? 0 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        suppressHydrationWarning={true}
                      >
                        <Instagram className="h-5 w-5" />
                        <span className="font-medium">
                          Suivez-moi sur Instagram
                        </span>
                      </motion.div>
                    </Link>
                    <Link
                      href="https://www.facebook.com/520849857787552"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-colors duration-200 overflow-hidden group"
                      onMouseEnter={() => setHoveredSocial("facebook")}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          scale: hoveredSocial === "facebook" ? 1.2 : 1,
                          opacity: hoveredSocial === "facebook" ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        suppressHydrationWarning={true}
                      >
                        <Facebook className="h-8 w-8" />
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-center gap-2"
                        animate={{
                          opacity: hoveredSocial === "facebook" ? 0 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        suppressHydrationWarning={true}
                      >
                        <Facebook className="h-5 w-5" />
                        <span className="font-medium">
                          Rejoignez-moi sur Facebook
                        </span>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bouton de réinitialisation du popup (visible uniquement en développement) */}
      <div
        id="dev-mode"
        style={{ display: "none" }}
        suppressHydrationWarning={true}
      >
        <button
          onClick={resetPopupState}
          className="fixed bottom-4 right-4 bg-secondary text-white text-xs px-2 py-1 rounded-md opacity-50 hover:opacity-100 z-50"
          title="Réinitialiser le popup (mode développement uniquement)"
        >
          Reset Popup
        </button>
      </div>
    </>
  );
}
