"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface CardHoverEffectProps {
  items: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  className?: string;
}

export const CardHoverEffect = ({ items, className }: CardHoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary/80 backdrop-blur-xl block rounded-3xl z-10"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex flex-col items-center text-center h-full min-h-[160px] relative">
              {/* Contenu normal (visible quand pas survolé) */}
              <motion.div
                className="flex flex-col items-center absolute inset-0 w-full flex-1 justify-center"
                animate={{
                  opacity: hoveredIndex === idx ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-secondary/10 p-3 rounded-xl group-hover:bg-secondary/20 transition-all duration-300">
                  <item.icon className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </motion.div>

              {/* Description (visible au survol) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredIndex === idx ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <CardDescription>{item.description}</CardDescription>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-primary/10 backdrop-blur-sm border border-secondary/10 group-hover:border-secondary/20 relative z-20 transition-all duration-300",
        className
      )}
    >
      <div className="relative z-30 h-full">
        <div className="p-4 h-full">{children}</div>
      </div>
    </div>
  );
};

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-secondary font-bold tracking-wide mt-4 text-lg",
        className
      )}
    >
      {children}
    </h4>
  );
};

const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-secondary tracking-wide leading-relaxed text-base",
        className
      )}
    >
      {children}
    </p>
  );
};
