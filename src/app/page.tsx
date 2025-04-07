"use client";

import ContactFormPopup from "@/components/ContactFormPopup";
import Hero from "@/components/Hero";
import HomeCTA from "@/components/HomeCTA";
import HomeSEO from "@/components/HomeSEO";
import InstagramFeed from "@/components/InstagramFeed";
import JohannaSection from "@/components/JohannaSection";
import Navbar from "@/components/Navbar";
import TravelPlannerSection from "@/components/TravelPlannerSection";
import { useState } from "react";

export default function Home() {
  // État pour gérer l'ouverture/fermeture du formulaire de contact
  const [isContactOpen, setIsContactOpen] = useState(false);
  // État pour suivre l'origine du formulaire de contact
  const [contactOrigin, setContactOrigin] = useState("Page d'accueil");

  // Fonction pour ouvrir le formulaire de contact avec l'origine spécifiée
  const handleOpenContact = (source: string = "Bouton non spécifié") => {
    setContactOrigin(`Bouton "${source}" (Page d'accueil)`);
    setIsContactOpen(true);
  };

  return (
    <>
      {/* Balises Schema.org pour le SEO */}
      <HomeSEO />

      {/* Navbar avec état partagé */}
      <Navbar
        isContactOpen={isContactOpen}
        setIsContactOpen={setIsContactOpen}
        onContactClick={() => handleOpenContact("Menu Contact")}
      />

      {/* Conteneur principal */}
      <div className="relative max-w-[2000px] mx-auto">
        <main className="relative">
          {/* Héro principal avec ouverture du formulaire de contact */}
          <section className="min-h-screen flex items-center justify-center">
            <Hero
              subtitle="Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier."
              onContactClick={() => handleOpenContact("Commencez votre voyage")}
            />
          </section>

          {/* Section de présentation de Johanna */}
          <section className="min-h-screen flex items-center justify-center">
            <JohannaSection />
          </section>

          {/* Section Travel Planner */}
          <section className="min-h-screen flex items-center justify-center">
            <TravelPlannerSection />
          </section>

          {/* Section Instagram Feed */}
          <section className="min-h-screen flex items-center justify-center py-20">
            <div className="w-full">
              <h2 className="text-4xl lg:text-5xl font-bold font-display text-center mb-12">
                <span className="text-secondary">Suivez-moi sur</span>{" "}
                <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                  Instagram
                </span>
              </h2>
              <InstagramFeed />
            </div>
          </section>

          {/* Call to Action avec ouverture du formulaire de contact */}
          <section className="min-h-screen flex items-center justify-center">
            <HomeCTA onContactClick={() => handleOpenContact("Me contacter")} />
          </section>
        </main>
      </div>

      {/* Popup de formulaire de contact centralisé */}
      <ContactFormPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        origin={contactOrigin}
      />
    </>
  );
}
