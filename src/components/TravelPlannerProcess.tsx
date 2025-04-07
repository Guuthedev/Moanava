import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  altText?: string;
}

interface TimelineComponentProps {
  steps: TimelineStep[];
  title?: string;
  subtitle?: string;
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({
  steps,
  title = "Votre voyage avec Johanna",
  subtitle = "De la première rencontre jusqu'à votre aventure, découvrez comment nous travaillons ensemble pour créer votre voyage sur mesure.",
}) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Fonction pour gérer le défilement et activer les étapes
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculer la progression du défilement dans la section
      const scrollProgress =
        (scrollY - sectionTop + windowHeight / 2) / sectionHeight;

      // Déterminer l'étape active en fonction de la progression
      if (scrollProgress > 0 && scrollProgress < 1) {
        const stepIndex = Math.min(
          Math.floor(scrollProgress * steps.length),
          steps.length - 1
        );
        setActiveStep(stepIndex + 1);
      } else if (scrollProgress <= 0) {
        setActiveStep(null);
      } else if (scrollProgress >= 1) {
        setActiveStep(steps.length);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialiser

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      id="process"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* En-tête de section avec animations */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-display mb-4">
            <span className="text-secondary">{title.split(" ")[0]}</span>{" "}
            <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Frise chronologique */}
        <div className="relative">
          {/* Ligne verticale centrale avec animation de progression */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full">
            <div className="w-1 h-full bg-gray-200 rounded-full">
              <motion.div
                className="w-1 bg-gradient-to-b from-primary to-secondary rounded-full origin-top"
                style={{
                  height: activeStep
                    ? `${(activeStep / steps.length) * 100}%`
                    : "0%",
                  transition: "height 0.5s ease-out",
                }}
              />
            </div>
          </div>

          {/* Étapes */}
          <div className="space-y-16 md:space-y-32 lg:space-y-40 relative">
            {steps.map((step, index) => (
              <TimelineItem
                key={step.id}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
                isActive={activeStep === step.id}
                isPast={activeStep !== null && activeStep > step.id}
              />
            ))}
          </div>
        </div>

        {/* Ajouter un margin-bottom pour compenser l'absence de l'appel à l'action */}
        <div className="mt-16"></div>
      </div>
    </section>
  );
};

const TimelineItem: React.FC<{
  step: TimelineStep;
  index: number;
  isLast: boolean;
  isActive: boolean;
  isPast: boolean;
}> = ({ step, index, isLast, isActive, isPast }) => {
  const isEven = index % 2 === 0;
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (isActive) {
      controls.start("active");
    } else if (isPast) {
      controls.start("past");
    } else {
      controls.start("inactive");
    }
  }, [controls, isActive, isPast]);

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      x: isEven ? -20 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2,
      },
    },
    active: {
      scale: 1.02,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    past: {
      opacity: 0.8,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    inactive: {
      opacity: 0.7,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.5,
      },
    },
    active: {
      scale: 1.2,
      boxShadow: "0px 0px 20px rgba(0, 174, 209, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    past: {
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    inactive: {
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  // Icônes pour chaque étape
  const icons = [
    <svg
      key="1"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>,
    <svg
      key="2"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>,
    <svg
      key="3"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
    </svg>,
    <svg
      key="4"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clipRule="evenodd"
      />
    </svg>,
    <svg
      key="5"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
    </svg>,
    <svg
      key="6"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>,
  ];

  return (
    <div
      id={`step-${step.id}`}
      ref={ref}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Contenu de l'étape */}
      <motion.div
        className={`md:w-5/12 ${
          isEven
            ? "md:text-right md:pr-12 lg:pr-16"
            : "md:text-left md:pl-12 lg:pl-16"
        } z-10 
          ${
            isActive
              ? "bg-white/80 backdrop-blur-sm md:bg-transparent p-6 md:p-0 rounded-xl shadow-lg md:shadow-none"
              : ""
          }`}
        initial="hidden"
        animate={controls}
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <span
          className={`inline-block py-1 px-3 rounded-full text-sm font-semibold mb-2
          ${
            isActive
              ? "bg-primary/20 text-primary"
              : "bg-secondary/20 text-secondary"
          }`}
        >
          Étape {step.id}
        </span>
        <h3
          className={`text-2xl font-bold mb-3 transition-colors duration-300
          ${isActive ? "text-primary" : "text-secondary"}`}
        >
          {step.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{step.description}</p>

        {step.imageUrl && (
          <motion.div
            className="mt-6 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img
              src={step.imageUrl}
              alt={step.altText || `Illustration de l'étape ${step.id}`}
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Cercle central avec icône */}
      <div className="md:w-2/12 flex justify-center items-center relative">
        <motion.div
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center z-10 shadow-lg transition-all duration-300
            ${
              isActive
                ? "bg-primary text-white ring-4 ring-primary/20"
                : isPast
                ? "bg-secondary text-primary"
                : "bg-gray-400 text-white"
            }`}
          initial="hidden"
          animate={controls}
          variants={iconVariants}
          whileHover={{ scale: 1.1 }}
        >
          {icons[index]}
        </motion.div>

        {/* Ligne verticale animée pour mobile */}
        {!isLast && (
          <motion.div
            className="absolute top-12 md:top-16 w-1 bg-gradient-to-b from-primary/70 to-secondary/70 md:hidden"
            style={{ height: "100%" }}
            initial="hidden"
            animate={controls}
            variants={lineVariants}
          />
        )}
      </div>

      {/* Espace vide pour l'autre côté */}
      <div className="md:w-5/12" />
    </div>
  );
};

export default TimelineComponent;
