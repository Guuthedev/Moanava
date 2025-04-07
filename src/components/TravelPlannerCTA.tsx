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
    <section className="min-h-screen w-full text-secondary relative flex items-center justify-center">
      <div className="w-full px-4 relative z-10 flex items-center justify-center">
        <SectionTransition direction="up">
          <motion.div
            className="w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-primary/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6 flex flex-col">
              <span className="text-secondary mb-2">Prêt à commencer</span>
              <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                Votre voyage ?
              </span>
            </h2>

            <p className="text-lg md:text-xl text-secondary/90 max-w-3xl mx-auto mb-10">
              Partagez vos envies et vos rêves de voyage. Ensemble, créons une
              expérience inoubliable qui vous ressemble, loin des sentiers
              battus, en harmonie avec votre personnalité.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonCTA
                size="lg"
                className="bg-secondary text-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 hover:text-secondary shadow-md"
                onClick={onContactClick}
                aria-label="Contactez Johanna pour un voyage sur mesure"
              >
                C&apos;est parti !!!
              </ButtonCTA>

              <ButtonCTA
                size="lg"
                variant="outline"
                className="text-secondary hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:bg-secondary hover:text-primary border-secondary/30"
                onClick={() => router.push("/a-propos")}
                aria-label="En savoir plus sur Johanna"
              >
                Apprendre à me connaître
              </ButtonCTA>
            </div>
          </motion.div>
        </SectionTransition>
      </div>
    </section>
  );
}
