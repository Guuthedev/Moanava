"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonCTA from "./ButtonCTA";
import SectionTransition from "./SectionTransition";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export default function JohannaSection() {
  const [imageHovered, setImageHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si l'appareil est mobile ou tablette
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Considère tout ce qui est inférieur à 1024px comme mobile/tablette
    };

    // Vérifier à l'initialisation
    checkMobile();

    // Ajouter un event listener pour le redimensionnement
    window.addEventListener("resize", checkMobile);

    // Nettoyer l'event listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Version mobile et tablette : animation progressive des éléments
  if (isMobile) {
    return (
      <SectionTransition direction="up">
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Titre avec animation progressive */}
            <motion.div
              className="text-center mb-12 w-full overflow-hidden"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.h2
                className="text-4xl lg:text-5xl font-bold font-display flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }} // Plus rapide
              >
                <motion.span
                  className="text-secondary mb-2"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-30% 0px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Bonjour,
                </motion.span>
                <motion.span
                  className="text-primary [text-shadow:_0_1px_0_var(--secondary)]"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-25% 0px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                  je suis Johanna
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Image avec carte 3D et effet hover */}
            <motion.div
              className="w-full max-w-md mx-auto mb-12"
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              <CardContainer
                containerClassName="w-full mx-auto h-auto aspect-[1/1.2]"
                className="w-full h-full"
              >
                <CardBody className="w-full h-full">
                  <CardItem
                    translateZ={40}
                    className="w-full h-full rounded-2xl overflow-hidden"
                  >
                    <motion.div
                      className="w-full h-full"
                      animate={{
                        scale: imageHovered ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src="/images/johanna/johanna-main.webp"
                        alt="Johanna, votre Travel Planner professionnelle"
                        fill
                        className="object-cover object-center transition-all duration-500"
                        priority
                      />
                    </motion.div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>

            {/* Texte avec carte 3D */}
            <motion.div
              className="w-full max-w-xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
            >
              <CardContainer
                containerClassName="!p-0 w-full h-auto"
                className="!m-0 !p-0 w-full"
              >
                <CardBody className="w-full">
                  <CardItem
                    translateZ={0}
                    className="w-full rounded-2xl overflow-hidden bg-primary/10 border border-secondary/10 hover:border-secondary/20 shadow-xl transition-all duration-300 p-6"
                  >
                    <div className="space-y-4 text-center">
                      <CardItem translateZ={30}>
                        <p className="text-base sm:text-lg text-secondary/90 leading-relaxed">
                          Passionnée de voyages et amoureuse de la Polynésie
                          française, je vous accompagne dans la création
                          d&apos;expériences authentiques et personnalisées.
                        </p>
                      </CardItem>

                      <CardItem translateZ={25}>
                        <p className="text-base sm:text-lg text-secondary/90 leading-relaxed">
                          Mon approche privilégie l&apos;échange, l&apos;écoute
                          et l&apos;adaptation à vos envies pour des souvenirs
                          inoubliables.
                        </p>
                      </CardItem>

                      <CardItem translateZ={25}>
                        <p className="text-base sm:text-lg text-secondary/90 leading-relaxed italic">
                          Johanna, fondatrice de Moanava.com
                        </p>
                      </CardItem>

                      <CardItem translateZ={50}>
                        <motion.div
                          className="pt-4 flex justify-center"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 1.6 }}
                        >
                          <Link
                            href="/a-propos"
                            aria-label="En savoir plus sur Johanna et son parcours"
                          >
                            <ButtonCTA
                              size="sm"
                              className="sm:text-base text-sm"
                            >
                              Découvrir mon parcours
                            </ButtonCTA>
                          </Link>
                        </motion.div>
                      </CardItem>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          </div>
        </section>
      </SectionTransition>
    );
  }

  // Version desktop avec une approche sans scroll-animation
  return (
    <SectionTransition direction="up">
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Titre centré avec animation progressive */}
          <motion.div
            className="text-center mb-16 w-full overflow-hidden"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h2 className="text-4xl lg:text-5xl font-bold font-display flex flex-col items-center">
              <motion.span
                className="text-secondary mb-2"
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Bonjour,
              </motion.span>
              <motion.span
                className="text-primary [text-shadow:_0_1px_0_var(--secondary)]"
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.5,
                }}
              >
                je suis Johanna
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Grille responsive avec l'image à gauche et le texte à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Colonne de gauche avec l'image */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              <CardContainer
                containerClassName="w-full max-w-md mx-auto h-auto aspect-[1/1.2]"
                className="w-full h-full"
              >
                <CardBody className="w-full h-full">
                  <CardItem
                    translateZ={40}
                    className="w-full h-full rounded-2xl overflow-hidden"
                  >
                    <motion.div
                      className="w-full h-full"
                      animate={{
                        scale: imageHovered ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src="/images/johanna/johanna-main.webp"
                        alt="Johanna, votre Travel Planner professionnelle"
                        fill
                        className="object-cover object-center transition-all duration-500"
                        priority
                      />
                    </motion.div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>

            {/* Colonne de droite avec le texte */}
            <motion.div
              className="w-full h-full flex items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              <CardContainer
                containerClassName="!p-0 w-full h-auto"
                className="!m-0 !p-0 w-full"
              >
                <CardBody className="w-full">
                  <CardItem
                    translateZ={0}
                    className="w-full rounded-2xl overflow-hidden bg-primary/10 border border-secondary/10 hover:border-secondary/20 shadow-xl transition-all duration-300 p-6"
                  >
                    <div className="space-y-5 text-center lg:text-left">
                      <CardItem translateZ={30}>
                        <p className="text-base lg:text-lg text-secondary/90 leading-relaxed">
                          Passionnée de voyages et amoureuse de la Polynésie
                          française, je vous accompagne dans la création
                          d&apos;expériences authentiques et personnalisées.
                        </p>
                      </CardItem>

                      <CardItem translateZ={25}>
                        <p className="text-base lg:text-lg text-secondary/90 leading-relaxed">
                          Mon approche privilégie l&apos;échange, l&apos;écoute
                          et l&apos;adaptation à vos envies pour des souvenirs
                          inoubliables.
                        </p>
                      </CardItem>

                      <CardItem translateZ={25}>
                        <p className="text-base lg:text-lg text-secondary/90 leading-relaxed italic">
                          Johanna, fondatrice de Moanava.com
                        </p>
                      </CardItem>

                      <CardItem translateZ={50}>
                        <div className="pt-4 flex justify-center lg:justify-start">
                          <Link
                            href="/a-propos"
                            aria-label="En savoir plus sur Johanna et son parcours"
                          >
                            <ButtonCTA
                              size="sm"
                              className="sm:text-base text-sm"
                            >
                              Découvrir mon parcours
                            </ButtonCTA>
                          </Link>
                        </div>
                      </CardItem>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
