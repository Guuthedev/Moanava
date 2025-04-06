"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ButtonCTA from "./ButtonCTA";
import SectionTransition from "./SectionTransition";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export default function JohannaSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SectionTransition direction="up">
      <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center py-16">
        {/* Titre centré au-dessus de l'image */}
        <motion.div
          className="text-center mb-12 w-full"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-display flex flex-col items-center">
            <span className="text-secondary">Bonjour,</span>
            <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
              je suis Johanna
            </span>
          </h2>
        </motion.div>

        {/* Conteneur principal avec interaction au survol */}
        <div
          className="relative w-full max-w-xl mx-auto group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(!isHovered)}
          style={{ aspectRatio: "1/1" }}
        >
          {/* Image qui disparaît vers la gauche au survol */}
          <motion.div
            className="absolute inset-0 w-full h-full z-10"
            animate={{
              x: isHovered ? "-100%" : "0%",
              opacity: isHovered ? 0 : 1,
              transition: { duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] },
            }}
          >
            <CardContainer
              containerClassName="!p-0 h-full"
              className="!m-0 !p-0 h-full"
            >
              <CardBody className="w-full h-full">
                <CardItem
                  translateZ={40}
                  className="w-full h-full rounded-2xl overflow-hidden"
                >
                  <Image
                    src="/images/johanna/johanna-main.webp"
                    alt="Johanna, votre Travel Planner professionnelle"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Texte qui remplace l'image au survol */}
          <motion.div
            className="absolute inset-0 w-full h-full z-20"
            animate={{
              x: isHovered ? "0%" : "100%",
              opacity: isHovered ? 1 : 0,
              transition: {
                duration: 0.5,
                ease: [0.19, 1.0, 0.22, 1.0],
                opacity: { duration: 0.3 },
              },
            }}
            initial={{ x: "100%", opacity: 0 }}
          >
            <CardContainer
              containerClassName="!p-0 h-full"
              className="!m-0 !p-0 h-full"
            >
              <CardBody className="w-full h-full">
                <CardItem
                  translateZ={0}
                  className="w-full h-full rounded-2xl overflow-hidden bg-primary/10 backdrop-blur-sm border border-secondary/10 group-hover:border-secondary/20 shadow-xl transition-all duration-300"
                >
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="space-y-6 text-center max-w-md">
                      <CardItem translateZ={30}>
                        <p className="text-lg text-secondary/90 leading-relaxed">
                          Passionnée de voyages et amoureuse de la Polynésie
                          française, je vous accompagne dans la création
                          d&apos;expériences authentiques et personnalisées.
                        </p>
                      </CardItem>

                      <CardItem translateZ={25}>
                        <p className="text-lg text-secondary/90 leading-relaxed">
                          Mon approche privilégie l&apos;échange, l&apos;écoute
                          et l&apos;adaptation à vos envies pour des souvenirs
                          inoubliables.
                        </p>
                      </CardItem>

                      <CardItem translateZ={50}>
                        <div className="pt-4 flex justify-center w-full">
                          <Link
                            href="/a-propos"
                            aria-label="En savoir plus sur Johanna et son parcours"
                          >
                            <ButtonCTA size="md">
                              Découvrir mon parcours
                            </ButtonCTA>
                          </Link>
                        </div>
                      </CardItem>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Indicateur de survol pour améliorer l'UX */}
          <motion.div
            className="absolute bottom-4 right-4 bg-secondary/30 backdrop-blur-sm px-3 py-2 rounded-lg pointer-events-none z-30"
            animate={{
              opacity: isHovered ? 0 : 0.9,
              y: isHovered ? 10 : 0,
              transition: { duration: 0.3 },
            }}
          >
            <span className="text-secondary text-sm whitespace-nowrap">
              Survolez pour en savoir plus
            </span>
          </motion.div>
        </div>
      </div>
    </SectionTransition>
  );
}
