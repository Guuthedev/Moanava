import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AdvantageCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export const AdvantageCard = ({
  title,
  description,
  icon: Icon,
  index,
}: AdvantageCardProps) => {
  return (
    <motion.div
      className="relative group block h-full w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="rounded-xl h-full w-full p-4 overflow-hidden bg-primary/5 border border-primary/10 group-hover:border-primary/20 group-hover:bg-primary/10 relative z-20 transition-all duration-300">
        <div className="relative z-50">
          <div className="flex flex-col items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary text-base group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-secondary/70 mt-1 text-sm group-hover:text-secondary/90 transition-colors duration-300">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
