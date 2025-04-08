"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ButtonCTA from "./ButtonCTA";
import ContactFormPopup from "./ContactFormPopup";
import SectionTransition from "./SectionTransition";

interface TarifsCTAProps {
  onContactClick?: () => void;
}

export default function TarifsCTA({ onContactClick }: TarifsCTAProps) {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      setIsContactPopupOpen(true);
    }
  };

  const handleCloseContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  return (
    <section
      className="min-h-screen w-full text-secondary relative flex items-center justify-center"
      aria-labelledby="tarifs-cta-heading"
    >
      <div className="w-full px-4 relative z-10 flex items-center justify-center">
        <SectionTransition direction="up">
          <motion.div
            className="w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-primary/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2
              id="tarifs-cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6 flex flex-col"
            >
              <span className="text-secondary mb-2">Prêt à découvrir</span>
              <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                la Polynésie autrement ?
              </span>
            </h2>

            <p className="text-lg md:text-xl text-secondary/90 max-w-3xl mx-auto mb-8">
              Chaque voyage est une aventure unique qui mérite une préparation
              sur mesure.
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              Que vous recherchiez une consultation personnalisée ou des
              conseils d&apos;experte, je suis là pour transformer votre séjour
              en Polynésie en une expérience inoubliable.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4">
              <ButtonCTA
                size="lg"
                className="bg-secondary text-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 hover:text-secondary shadow-md group"
                onClick={handleContactClick}
                aria-label="Réserver une consultation personnalisée avec Johanna"
              >
                <span className="group-hover:animate-pulse">
                  Réserver ma consultation
                </span>
              </ButtonCTA>

              <Link
                href="/travel-planner"
                aria-label="En savoir plus sur le service Travel Planner"
              >
                <ButtonCTA
                  size="lg"
                  variant="outline"
                  className="text-secondary hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:bg-secondary hover:text-primary border-secondary/30"
                >
                  Découvrir le Travel Planner
                </ButtonCTA>
              </Link>
            </div>

            <p className="mt-2 text-sm text-secondary/70 max-w-2xl mx-auto">
              <span className="inline-block mx-1">
                <strong>Conseils personnalisés</strong>
              </span>{" "}
              •
              <span className="inline-block mx-1">
                <strong>Itinéraires sur mesure</strong>
              </span>{" "}
              •
              <span className="inline-block mx-1">
                Expériences authentiques
              </span>{" "}
              •<span className="inline-block mx-1">Hôtels de charme</span> •
              <span className="inline-block mx-1">Spots secrets</span> •
              <span className="inline-block mx-1">Activités exclusives</span> •
              <span className="inline-block mx-1">Accompagnement complet</span>{" "}
              •
              <span className="inline-block mx-1">Souvenirs impérissables</span>
            </p>
          </motion.div>
        </SectionTransition>
      </div>

      {/* Contact Popup */}
      <ContactFormPopup
        isOpen={isContactPopupOpen}
        onClose={handleCloseContactPopup}
        initialMessage="Bonjour Johanna, je souhaite réserver une consultation pour discuter de mon projet de voyage en Polynésie. Merci de me contacter pour en discuter."
        origin="Section CTA (page Tarifs)"
      />
    </section>
  );
}
