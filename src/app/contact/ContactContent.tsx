"use client";

import ButtonCTA from "@/components/ButtonCTA";
import ContactFormPopup from "@/components/ContactFormPopup";
import { useState } from "react";
import { Toaster } from "sonner";

export default function ContactContent() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-secondary/80 max-w-2xl mx-auto mb-8">
            N&apos;hésitez pas à nous contacter pour toute question ou demande
            d&apos;information. Notre équipe se fera un plaisir de vous
            répondre.
          </p>

          <ButtonCTA onClick={() => setIsPopupOpen(true)}>
            Ouvrir le formulaire de contact
          </ButtonCTA>
        </div>

        <ContactFormPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </div>
    </>
  );
}
