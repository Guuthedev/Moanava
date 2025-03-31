"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ButtonCTA from "./ButtonCTA";

export default function JohannaSection() {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleImageClick = () => {
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 1000);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-full">
        {/* Image avec effet 3D */}
        <Link
          href="/a-propos"
          className="lg:order-1"
          onClick={handleImageClick}
        >
          <CardContainer>
            <CardBody
              className={`bg-white/10 backdrop-blur-sm relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/[0.1] dark:bg-black/20 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border transition-all duration-300 ${
                isHighlighted ? "ring-4 ring-primary" : ""
              }`}
            >
              <CardItem
                translateZ="50"
                className="w-full h-[600px] relative rounded-xl overflow-hidden"
              >
                <Image
                  src="/images/johanna/johanna-main.webp"
                  alt="Johanna, votre Travel Planner professionnelle près d'un arbre tropical"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </Link>

        {/* Texte de présentation */}
        <motion.div
          className="lg:order-2 flex flex-col justify-center min-h-[600px] text-left lg:pl-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary font-display">
              <span className="block">Johanna,</span>
              <span className="text-primary">Votre Travel Planner</span>
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

            <div className="pt-6">
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
  );
}
