"use client";

import ContactFormPopup from "@/components/ContactFormPopup";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import HomeCTA from "@/components/HomeCTA";
import HomeSEO from "@/components/HomeSEO";
import JohannaSection from "@/components/JohannaSection";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import TravelPlannerSection from "@/components/TravelPlannerSection";
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

      <main className="min-h-screen">
        {/* Héro principal avec ouverture du formulaire de contact */}
        <Hero
          subtitle="Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier."
          videoUrl="/videos/vol-avion-opti.webm"
          videoFallbackImage="/videos/vol-avion-opti.webp"
          onContactClick={handleOpenContact}
        />

        {/* Section de présentation de Johanna */}
        <JohannaSection />

        {/* Section Travel Planner */}
        <TravelPlannerSection />

        {/* Témoignages de clients */}
        <Testimonials />

        {/* Call to Action avec ouverture du formulaire de contact */}
        <HomeCTA onContactClick={handleOpenContact} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Popup de formulaire de contact centralisé */}
      <ContactFormPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
