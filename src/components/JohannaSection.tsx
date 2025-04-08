"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ButtonCTA from "./ButtonCTA";
import SectionTransition from "./SectionTransition";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export default function JohannaSection() {
  const [imageHovered, setImageHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

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

  // Utiliser un conteneur avec une hauteur suffisante pour permettre un scroll plus long
  // uniquement sur desktop
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Nouvelles transitions avec temps de visibilité équilibré pour l'image et le texte
  // L'image est visible du début jusqu'à la moitié du défilement
  const imageTranslateX = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.6],
    ["0%", "-100%", "-100%", "-100%"]
  );
  const imageOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.3, 0.35, 0.4],
    [1, 0.8, 0.4, 0]
  );

  // Le texte apparaît à mi-chemin et reste visible jusqu'à la fin
  // avec une longue période de pleine visibilité (de 0.45 à 0.75)
  const textTranslateX = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.75, 0.85],
    ["100%", "0%", "0%", "-100%"]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.45, 0.75, 0.8, 0.85],
    [0, 0.4, 1, 1, 0.4, 0]
  );

  // Étendre la transition globale du contenu pour couvrir tout le scroll
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.1, 0.9, 0.95],
    [0, 1, 1, 0]
  );

  // Mouvement vertical du contenu également symétrique
  const contentY = useTransform(
    scrollYProgress,
    [0.05, 0.1, 0.9, 0.95],
    ["15px", "0px", "0px", "15px"]
  );

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

            {/* Image avec entrée progressive depuis le haut */}
            <motion.div
              className="w-full max-w-md mx-auto mb-12"
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: "1/1.2" }}
              >
                <Image
                  src="/images/johanna/johanna-main.webp"
                  alt="Johanna, votre Travel Planner professionnelle"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </motion.div>

            {/* Texte avec animation décalée */}
            <motion.div
              className="w-full max-w-xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
            >
              <div className="bg-primary/10 backdrop-blur-sm border border-secondary/10 rounded-2xl p-6 shadow-xl">
                <div className="space-y-4 text-center">
                  <motion.p
                    className="text-base sm:text-lg text-secondary/90 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    Passionnée de voyages et amoureuse de la Polynésie
                    française, je vous accompagne dans la création
                    d&apos;expériences authentiques et personnalisées.
                  </motion.p>
                  <motion.p
                    className="text-base sm:text-lg text-secondary/90 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                  >
                    Mon approche privilégie l&apos;échange, l&apos;écoute et
                    l&apos;adaptation à vos envies pour des souvenirs
                    inoubliables.
                  </motion.p>
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
                      <ButtonCTA size="sm" className="sm:text-base text-sm">
                        Découvrir mon parcours
                      </ButtonCTA>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionTransition>
    );
  }

  // Version desktop avec effets de scroll et apparition progressive
  return (
    <SectionTransition direction="up">
      <div
        ref={sectionRef}
        className="relative min-h-[500vh]" // Hauteur augmentée pour un défilement plus long
      >
        {/* Conteneur sticky qui reste au milieu de l'écran pendant le scroll */}
        <motion.div
          ref={contentRef}
          className="sticky top-0 h-screen flex flex-col items-center justify-center"
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          <div className="container mx-auto px-4">
            {/* Titre centré au-dessus de l'image avec animation progressive */}
            <motion.div
              className="text-center mb-12 w-full overflow-hidden"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            >
              <motion.h2 className="text-4xl lg:text-5xl font-bold font-display flex flex-col items-center">
                <motion.span
                  className="text-secondary mb-2"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.3, // Beaucoup plus tôt
                  }}
                >
                  Bonjour,
                </motion.span>
                <motion.span
                  className="text-primary [text-shadow:_0_1px_0_var(--secondary)]"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.8, // Délai entre "Bonjour" et "je suis Johanna"
                  }}
                >
                  je suis Johanna
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Conteneur principal - adapté pour le scroll et différentes tailles d'écran */}
            <motion.div
              className="relative w-full max-w-2xl mx-auto group"
              style={{ aspectRatio: "1/1.2" }}
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 1.5 }} // Délai plus long pour la photo
            >
              {/* Image qui disparaît vers la gauche au scroll avec transition douce */}
              <motion.div
                className="absolute inset-0 w-full h-full z-10"
                style={{
                  x: imageTranslateX,
                  opacity: imageOpacity,
                }}
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
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

              {/* Texte qui remplace l'image au scroll avec fondu progressif */}
              <motion.div
                className="absolute inset-0 w-full h-full z-20"
                style={{
                  x: textTranslateX,
                  opacity: textOpacity,
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
                      <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                        <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center max-w-md">
                          <CardItem translateZ={30}>
                            <p className="text-base sm:text-lg text-secondary/90 leading-relaxed">
                              Passionnée de voyages et amoureuse de la Polynésie
                              française, je vous accompagne dans la création
                              d&apos;expériences authentiques et personnalisées.
                            </p>
                          </CardItem>

                          <CardItem translateZ={25}>
                            <p className="text-base sm:text-lg text-secondary/90 leading-relaxed">
                              Mon approche privilégie l&apos;échange,
                              l&apos;écoute et l&apos;adaptation à vos envies
                              pour des souvenirs inoubliables.
                            </p>
                          </CardItem>

                          <CardItem translateZ={50}>
                            <div className="pt-2 sm:pt-4 flex justify-center w-full">
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
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionTransition>
  );
}
