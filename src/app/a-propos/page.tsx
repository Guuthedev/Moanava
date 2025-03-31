"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-secondary font-display mb-8">
          À propos de Johanna
        </h1>

        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
          <Image
            src="/images/johanna/johanna-main.webp"
            alt="Johanna, votre Travel Planner professionnelle"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-secondary/80 leading-relaxed mb-6">
            Passionnée de voyages et amoureuse de la Polynésie française, je
            vous accompagne dans la création d&apos;expériences authentiques et
            personnalisées. Mon expertise locale et ma connaissance des
            destinations internationales me permettent de créer pour vous des
            itinéraires uniques qui vous ressemblent.
          </p>

          <p className="text-lg text-secondary/80 leading-relaxed mb-6">
            Mon approche privilégie l&apos;échange, l&apos;écoute et
            l&apos;adaptation à vos envies pour des souvenirs qui resteront
            gravés dans votre mémoire. Je m&apos;engage à vous offrir une
            expérience de voyage sur mesure, en accord avec vos attentes et vos
            rêves.
          </p>

          <p className="text-lg text-secondary/80 leading-relaxed">
            Découvrez comment je peux transformer vos rêves de voyage en
            réalité, que ce soit en Polynésie française ou ailleurs dans le
            monde.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
