"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ButtonCTA from "./ButtonCTA";
import SectionTransition from "./SectionTransition";

interface TravelPlannerCTAProps {
  onContactClick?: () => void;
}

export default function TravelPlannerCTA({
  onContactClick,
}: TravelPlannerCTAProps) {
  const router = useRouter();

  return (
    <section
      className="min-h-screen w-full text-secondary relative flex items-center justify-center"
      aria-labelledby="travel-cta-heading"
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
              id="travel-cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6 flex flex-col"
            >
              <span className="text-secondary mb-2">Voyages sur mesure</span>
              <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                partout dans le monde
              </span>
            </h2>

            <p className="text-lg md:text-xl text-secondary/90 max-w-3xl mx-auto mb-8">
              De la Polynésie à l&apos;autre bout du monde, je crée des voyages
              uniques grâce à mon expertise de terrain.
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              Vivez une aventure personnalisée où chaque détail est pensé pour
              transformer vos rêves en réalité.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4">
              <ButtonCTA
                size="lg"
                className="bg-secondary text-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 hover:text-secondary shadow-md group"
                onClick={onContactClick}
                aria-label="Demander un devis personnalisé pour votre voyage sur mesure international"
              >
                <span className="group-hover:animate-pulse">
                  Planifier mon voyage
                </span>
              </ButtonCTA>

              <ButtonCTA
                size="lg"
                variant="outline"
                className="text-secondary hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:bg-secondary hover:text-primary border-secondary/30"
                onClick={() => router.push("/a-propos")}
                aria-label="Découvrir Johanna, votre Travel Planner internationale spécialiste de la Polynésie"
              >
                Découvrir mon expertise
              </ButtonCTA>
            </div>

            <p className="mt-2 text-sm text-secondary/70 max-w-2xl mx-auto">
              <span className="inline-block mx-1">
                <strong>Spécialiste Polynésie française</strong>
              </span>{" "}
              •
              <span className="inline-block mx-1">
                <strong>Voyages internationaux sur mesure</strong>
              </span>{" "}
              •<span className="inline-block mx-1">Séjours authentiques</span> •
              <span className="inline-block mx-1">Destinations exotiques</span>{" "}
              •
              <span className="inline-block mx-1">
                Circuits hors des sentiers battus
              </span>{" "}
              •<span className="inline-block mx-1">Aventures culturelles</span>{" "}
              •<span className="inline-block mx-1">Expériences locales</span> •
              <span className="inline-block mx-1">
                Itinéraires personnalisés
              </span>
            </p>
          </motion.div>
        </SectionTransition>
      </div>
    </section>
  );
}
