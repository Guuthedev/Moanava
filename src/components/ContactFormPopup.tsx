import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ButtonCTA from "./ButtonCTA";

interface ContactFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  origin?: string; // Origine du formulaire (bouton et emplacement)
}

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  origin?: string; // Ajout du champ origin
}

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({
  isOpen,
  onClose,
  initialMessage = "",
  origin = "Formulaire de contact standard",
}) => {
  // États pour le formulaire séquentiel
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    message: initialMessage,
    origin: origin, // Initialiser avec l'origine fournie
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Références pour les champs de formulaire
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const whatsappInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Fonction pour gérer les changements d'étape
  const focusCurrentField = () => {
    setTimeout(() => {
      if (step === 0 && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (step === 1 && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (step === 2 && whatsappInputRef.current) {
        whatsappInputRef.current.focus();
      } else if (step === 3 && messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }, 100);
  };

  // Focus sur le champ courant à chaque changement d'étape
  useEffect(() => {
    if (isOpen) {
      focusCurrentField();
    }
  }, [step, isOpen]);

  // Empêcher le défilement quand le popup est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden"; // Bloquer aussi l'élément HTML
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
      document.documentElement.style.overflow = "unset";
    }

    // Nettoyage lors du démontage
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Empêcher la propagation des clics à l'intérieur du popup
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Gestion des champs de formulaire
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation de l'étape actuelle
  const validateCurrentStep = (): boolean => {
    if (step === 0 && formData.name.trim().length < 2) {
      return false;
    }
    if (
      step === 1 &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      return false;
    }
    if (
      step === 2 &&
      !/^\+[1-9]\d{1,14}$/.test(formData.whatsapp.replace(/\s/g, ""))
    ) {
      return false;
    }
    if (step === 3 && formData.message.trim().length < 10) {
      return false;
    }
    return true;
  };

  // Passer à l'étape précédente
  const handlePrevious = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  // Soumettre à l'étape finale
  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  // Gérer les touches Tab et Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && validateCurrentStep()) {
      e.preventDefault();
      handleNext();
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Appel direct à l'API avec indication d'envoyer un email de confirmation
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sendConfirmation: true,
        }),
      });

      const result = await response.json();

      setFormStatus({
        success: result.success,
        message: result.success
          ? "Je reviens vers vous au plus vite !"
          : "Une erreur est survenue. Veuillez réessayer ultérieurement.",
      });

      if (result.success) {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setFormStatus({
        success: false,
        message:
          "Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Réinitialiser le formulaire
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      message: "",
      origin: origin,
    });
    setStep(0);
    setFormStatus({});
    setFormSubmitted(false);
    focusCurrentField();
  };

  // Titre selon l'étape
  const getStepTitle = (): string => {
    if (formSubmitted) return "Merci pour votre message !";
    switch (step) {
      case 0:
        return "Commençons par votre nom";
      case 1:
        return "Votre adresse email";
      case 2:
        return "Votre numéro WhatsApp";
      case 3:
        return "Quel est votre message ?";
      default:
        return "Contactez-nous";
    }
  };

  // Texte du bouton selon l'étape
  const getButtonText = (): string => {
    if (formSubmitted) return "Nouveau message";
    if (step === 3) return "Envoyer";
    return "Continuer";
  };

  // Mettre à jour le message et l'origine lorsque les props changent
  useEffect(() => {
    if (initialMessage || origin) {
      setFormData((prev) => ({
        ...prev,
        message: initialMessage || prev.message,
        origin: origin || prev.origin,
      }));
    }
  }, [initialMessage, origin]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-xl bg-primary/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-xl max-h-[90vh] overflow-auto rounded-xl bg-primary backdrop-blur-lg shadow-2xl border border-secondary/10"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={handleContentClick}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors text-secondary z-10"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Contenu du popup */}
            <div className="p-8">
              <motion.h2
                key={`title-${step}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold mb-8 text-center text-secondary"
              >
                {getStepTitle()}
              </motion.h2>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="bg-secondary/20 rounded-full p-4"
                    >
                      <Check className="h-12 w-12 text-secondary" />
                    </motion.div>
                  </div>
                  <p className="text-secondary text-lg mb-8">
                    {formStatus.message}
                  </p>
                  <p className="text-secondary text-sm mb-4">
                    Un email de confirmation vous a été envoyé.
                  </p>
                  <ButtonCTA onClick={handleReset}>{getButtonText()}</ButtonCTA>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {/* Champs qui s'affichent de manière séquentielle */}
                  <div className="flex flex-col items-center space-y-6">
                    {/* Champ Nom */}
                    <AnimatePresence>
                      {step >= 0 && (
                        <motion.div
                          key="name-field"
                          initial={
                            step === 0
                              ? { opacity: 0, y: 20 }
                              : { opacity: 1, y: 0 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`w-full ${
                            step > 0 ? "opacity-70 scale-90" : ""
                          }`}
                        >
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-secondary mb-2"
                          >
                            Nom
                          </label>
                          <input
                            ref={nameInputRef}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-3 rounded-md border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-secondary bg-primary/40 text-secondary placeholder-secondary/50"
                            placeholder="Votre nom"
                            disabled={step !== 0}
                          />
                          {step === 0 &&
                            formData.name.trim().length < 2 &&
                            formData.name.trim().length > 0 && (
                              <p className="text-red-400 text-sm mt-1">
                                Le nom doit contenir au moins 2 caractères
                              </p>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Champ Email */}
                    <AnimatePresence>
                      {step >= 1 && (
                        <motion.div
                          key="email-field"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`w-full ${
                            step > 1 ? "opacity-70 scale-90" : ""
                          }`}
                        >
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-secondary mb-2"
                          >
                            Email
                          </label>
                          <input
                            ref={emailInputRef}
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-3 rounded-md border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-secondary bg-primary/40 text-secondary placeholder-secondary/50"
                            placeholder="votre.email@example.com"
                            disabled={step !== 1}
                          />
                          {step === 1 &&
                            formData.email &&
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                              formData.email
                            ) && (
                              <p className="text-red-400 text-sm mt-1">
                                Adresse email invalide
                              </p>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Champ WhatsApp */}
                    <AnimatePresence>
                      {step >= 2 && (
                        <motion.div
                          key="whatsapp-field"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`w-full ${
                            step > 2 ? "opacity-70 scale-90" : ""
                          }`}
                        >
                          <label
                            htmlFor="whatsapp"
                            className="block text-sm font-medium text-secondary mb-2"
                          >
                            Numéro WhatsApp (avec indicatif)
                          </label>
                          <input
                            ref={whatsappInputRef}
                            id="whatsapp"
                            name="whatsapp"
                            type="tel"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-3 rounded-md border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-secondary bg-primary/40 text-secondary placeholder-secondary/50"
                            placeholder="Ex: +33 6 12 34 56 78"
                            disabled={step !== 2}
                          />
                          {step === 2 &&
                            formData.whatsapp &&
                            !/^\+[1-9]\d{1,14}$/.test(
                              formData.whatsapp.replace(/\s/g, "")
                            ) && (
                              <p className="text-red-400 text-sm mt-1">
                                Format invalide. Utilisez le format
                                international (ex: +33 6 12 34 56 78)
                              </p>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Champ Message */}
                    <AnimatePresence>
                      {step >= 3 && (
                        <motion.div
                          key="message-field"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full"
                        >
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-secondary mb-2"
                          >
                            Message
                          </label>
                          <textarea
                            ref={messageInputRef}
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                              // Permettre le saut de ligne avec Shift+Enter
                              if (e.key === "Enter" && !e.shiftKey) {
                                handleKeyDown(e);
                              }
                            }}
                            rows={4}
                            className="w-full px-4 py-3 rounded-md border border-secondary/20 focus:outline-none focus:ring-2 focus:ring-secondary bg-primary/40 text-secondary placeholder-secondary/50"
                            placeholder="Votre message"
                          ></textarea>
                          {step === 3 &&
                            formData.message.trim().length < 10 &&
                            formData.message.trim().length > 0 && (
                              <p className="text-red-400 text-sm mt-1">
                                Le message doit contenir au moins 10 caractères
                              </p>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message d'erreur */}
                  {formStatus.message && !formStatus.success && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-4 rounded-md bg-red-50 text-red-700 border border-red-200"
                    >
                      {formStatus.message}
                    </motion.div>
                  )}

                  {/* Boutons de navigation */}
                  <motion.div
                    className="flex justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {step > 0 && (
                      <ButtonCTA
                        type="button"
                        onClick={handlePrevious}
                        variant="outline"
                        size="sm"
                        className="group relative"
                      >
                        <span className="group-hover:opacity-0 transition-opacity duration-200">
                          Précédent
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <ArrowLeft className="h-4 w-4" />
                        </span>
                      </ButtonCTA>
                    )}
                    <ButtonCTA
                      type="button"
                      onClick={handleNext}
                      disabled={!validateCurrentStep() || isSubmitting}
                      isLoading={isSubmitting}
                      loadingText="Envoi en cours..."
                    >
                      {getButtonText()}
                    </ButtonCTA>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactFormPopup;
