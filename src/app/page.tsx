"use client";

import ContactFormPopup from "@/components/ContactFormPopup";
import Hero from "@/components/Hero";
import HomeCTA from "@/components/HomeCTA";
import HomeSEO from "@/components/HomeSEO";
import JohannaSection from "@/components/JohannaSection";
import Navbar from "@/components/Navbar";
import TravelPlannerSection from "@/components/TravelPlannerSection";
import { InfoPopup } from "@/components/ui/info-popup";
import { useState } from "react";

export default function Home() {
  // État pour gérer l'ouverture/fermeture du formulaire de contact
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Fonction pour ouvrir le formulaire de contact
  const handleOpenContact = () => {
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
      />

      {/* Conteneur principal */}
      <div className="relative max-w-[2000px] mx-auto">
        <main className="relative">
          {/* Héro principal avec ouverture du formulaire de contact */}
          <section className="min-h-screen flex items-center justify-center">
            <Hero
              subtitle="Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier."
              onContactClick={handleOpenContact}
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

          {/* Call to Action avec ouverture du formulaire de contact */}
          <section className="min-h-screen flex items-center justify-center">
            <HomeCTA onContactClick={handleOpenContact} />
          </section>
        </main>
      </div>

      {/* Popup de formulaire de contact centralisé */}
      <ContactFormPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <InfoPopup />
    </>
  );
}
