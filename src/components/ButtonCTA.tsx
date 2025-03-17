import { cn } from "@/lib/utils";
import React from "react";

interface ButtonCTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export const ButtonCTA = React.forwardRef<HTMLButtonElement, ButtonCTAProps>(
  ({ className, children, size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "p-[3px] relative",
          size === "sm" && "rounded-full",
          size === "md" && "rounded-full",
          size === "lg" && "rounded-full",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Effet de bordure éclairée */}
        <div className="absolute inset-0 bg-secondary rounded-full" />

        <div
          className={cn(
            // Fond du bouton
            "relative group transition-all duration-300",
            "bg-primary rounded-[calc(2rem-3px)] text-secondary z-10",
            "hover:bg-transparent hover:text-primary",
            "active:scale-95 focus:outline-none",

            // Tailles
            size === "sm" && "px-4 py-2 text-sm",
            size === "md" && "px-6 py-3 text-base",
            size === "lg" && "px-8 py-4 text-lg"
          )}
        >
          {children}
        </div>
      </button>
    );
  }
);

ButtonCTA.displayName = "ButtonCTA";

export default ButtonCTA;
