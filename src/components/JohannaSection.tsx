"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ButtonCTA from "./ButtonCTA";
import SectionTransition from "./SectionTransition";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export default function JohannaSection() {
  return (
    <SectionTransition direction="up">
      <div className="w-full max-w-[2000px] mx-auto px-4 min-h-screen flex items-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 w-full">
          {/* Image avec effet 3D - Moitié gauche */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link
              href="/a-propos"
              aria-label="En savoir plus sur Johanna"
              className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl"
            >
              <CardContainer className="w-full">
                <CardBody className="w-full aspect-square">
                  <CardItem
                    translateZ={20}
                    className="w-full h-full rounded-2xl overflow-hidden"
                  >
                    <Image
                      src="/images/johanna/johanna-main.webp"
                      alt="Johanna, votre Travel Planner professionnelle"
                      fill
                      className="object-cover"
                      priority
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </Link>
          </motion.div>

          {/* Texte - Moitié droite */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left max-w-2xl mx-auto lg:mx-0 lg:pl-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold font-display flex flex-col lg:items-start items-center">
                <span className="text-secondary">Bonjour,</span>
                <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                  je suis Johanna
                </span>
              </h2>

              <p className="text-lg text-secondary/80 leading-relaxed">
                Passionnée de voyages et amoureuse de la Polynésie française, je
                vous accompagne dans la création d&apos;expériences authentiques
                et personnalisées. Entre mon expertise locale et ma connaissance
                des destinations internationales, je crée pour vous des
                itinéraires uniques qui vous ressemblent.
              </p>

              <p className="text-lg text-secondary/80 leading-relaxed">
                Mon approche privilégie l&apos;échange, l&apos;écoute et
                l&apos;adaptation à vos envies pour des souvenirs qui resteront
                gravés dans votre mémoire.
              </p>

              <div className="pt-6 flex lg:justify-start justify-center">
                <Link
                  href="/a-propos"
                  aria-label="En savoir plus sur Johanna et son parcours"
                >
                  <ButtonCTA size="md">Découvrir mon parcours</ButtonCTA>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionTransition>
  );
}
