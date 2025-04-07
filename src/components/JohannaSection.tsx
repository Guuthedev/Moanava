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

        {/* Conteneur principal avec interaction au survol - agrandi */}
        <div
          className="relative w-full max-w-2xl mx-auto group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(!isHovered)}
          style={{ aspectRatio: "1/1.2" }}
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

          {/* Bulle de bande dessinée pour inciter au survol */}
          <motion.div
            className="absolute top-10 right-0 transform translate-x-1/2 z-30 pointer-events-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isHovered ? 0 : [0.95, 1.05, 0.95],
              opacity: isHovered ? 0 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 3,
              },
              opacity: { duration: 0.3 },
            }}
          >
            <div className="relative">
              <svg
                width="130"
                height="80"
                viewBox="0 0 130 80"
                className="fill-primary/80"
              >
                <path d="M10,40 C10,17.909 27.909,0 50,0 L70,0 C92.092,0 110,17.909 110,40 C110,62.091 92.092,80 70,80 L30,80 L10,90 L15,80 C12.791,77.792 10,62.091 10,40 Z" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-secondary text-sm font-medium p-5 pb-8">
                <span>Découvrez mon histoire</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionTransition>
  );
}
