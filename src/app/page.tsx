"use client";

import ContactFormPopup from "@/components/ContactFormPopup";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import HomeCTA from "@/components/HomeCTA";
import HomeSEO from "@/components/HomeSEO";
import JohannaSection from "@/components/JohannaSection";
import Navbar from "@/components/Navbar";
import TravelPlannerSection from "@/components/TravelPlannerSection";
import { InfoPopup } from "@/components/ui/info-popup";
import { useEffect, useState } from "react";

export default function Home() {
  // État pour gérer l'ouverture/fermeture du formulaire de contact
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Fonction pour ouvrir le formulaire de contact
  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  // Configuration du défilement fluide
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.scrollIntoView({ behavior: "smooth" });
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Balises Schema.org pour le SEO */}
      <HomeSEO />

      {/* Navbar avec état partagé */}
      <Navbar
        isContactOpen={isContactOpen}
        setIsContactOpen={setIsContactOpen}
      />

      {/* Conteneur principal avec défilement fluide */}
      <div className="relative">
        <main className="relative">
          {/* Héro principal avec ouverture du formulaire de contact */}
          <section className="min-h-screen flex items-center justify-center">
            <Hero
              subtitle="Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier."
              videoUrl="/videos/vol-avion-opti.webm"
              videoFallbackImage="/videos/vol-avion-opti.webp"
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

      {/* Footer */}
      <Footer />

      {/* Popup de formulaire de contact centralisé */}
      <ContactFormPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <InfoPopup />
    </>
  );
}
