import { TransitionLink } from "@/components/TransitionLink";
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
        "grid grid-cols-1 md:grid-cols-2 gap-6 py-10 max-w-5xl mx-auto",
        className
      )}
    >
      {items.map((item, idx) => (
        <TransitionLink
          key={idx}
          href="/travel-planner"
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-secondary/20 backdrop-blur-md block rounded-3xl"
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
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-secondary/10 p-3 rounded-xl group-hover:bg-secondary/20 transition-all duration-300">
                <item.icon className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </div>
          </Card>
        </TransitionLink>
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
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-primary/95 backdrop-blur-sm border border-secondary/20 group-hover:border-secondary/40 relative z-20 transition-all duration-300",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
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
        "mt-2 text-secondary/70 tracking-wide leading-relaxed text-base",
        className
      )}
    >
      {children}
    </p>
  );
};
