"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonCTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  loadingText?: string;
}

export const ButtonCTA = React.forwardRef<HTMLButtonElement, ButtonCTAProps>(
  (
    {
      className,
      children,
      size = "md",
      variant = "primary",
      icon,
      iconPosition = "left",
      isLoading = false,
      loadingText,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          "relative overflow-hidden rounded-full transition-all duration-300 transform-gpu",
          "focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2",
          variant === "primary" &&
            "bg-secondary text-primary hover:bg-primary hover:text-secondary border border-secondary",
          variant === "secondary" &&
            "bg-primary text-secondary hover:bg-secondary hover:text-primary border border-secondary",
          variant === "outline" &&
            "bg-transparent text-secondary hover:bg-secondary/10 border border-secondary/20",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          (disabled || isLoading) && "opacity-70 cursor-not-allowed",
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        onClick={onClick}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}

          {!isLoading && icon && iconPosition === "left" && <span>{icon}</span>}
          <span>{isLoading ? loadingText || "Chargement..." : children}</span>
          {!isLoading && icon && iconPosition === "right" && (
            <span>{icon}</span>
          )}
        </div>
      </button>
    );
  }
);

ButtonCTA.displayName = "ButtonCTA";

export default ButtonCTA;
