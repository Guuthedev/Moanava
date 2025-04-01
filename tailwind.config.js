/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00aed1",
          rgb: "0, 174, 209",
        },
        secondary: {
          DEFAULT: "#c9fbff",
          rgb: "201, 251, 255",
        },
        tertiary: {
          DEFAULT: "#e3dcd4",
          rgb: "227, 220, 212",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      typography: {
        h1: {
          css: {
            fontSize: "3.5rem",
            lineHeight: "1.2",
            fontWeight: "700",
            fontFamily: "Montserrat, sans-serif",
            color: "var(--tw-colors-secondary)",
            "@media (min-width: 768px)": {
              fontSize: "4rem",
            },
            "@media (min-width: 1024px)": {
              fontSize: "4.5rem",
            },
          },
        },
        h2: {
          css: {
            fontSize: "2.5rem",
            lineHeight: "1.3",
            fontWeight: "700",
            fontFamily: "Montserrat, sans-serif",
            color: "var(--tw-colors-secondary)",
            "@media (min-width: 768px)": {
              fontSize: "3rem",
            },
            "@media (min-width: 1024px)": {
              fontSize: "3.5rem",
            },
          },
        },
        h3: {
          css: {
            fontSize: "2rem",
            lineHeight: "1.4",
            fontWeight: "600",
            fontFamily: "Montserrat, sans-serif",
            color: "var(--tw-colors-secondary)",
            "@media (min-width: 768px)": {
              fontSize: "2.25rem",
            },
            "@media (min-width: 1024px)": {
              fontSize: "2.5rem",
            },
          },
        },
        h4: {
          css: {
            fontSize: "1.5rem",
            lineHeight: "1.5",
            fontWeight: "600",
            fontFamily: "Montserrat, sans-serif",
            color: "var(--tw-colors-secondary)",
            "@media (min-width: 768px)": {
              fontSize: "1.75rem",
            },
            "@media (min-width: 1024px)": {
              fontSize: "2rem",
            },
          },
        },
        h5: {
          css: {
            fontSize: "1.25rem",
            lineHeight: "1.6",
            fontWeight: "600",
            fontFamily: "Montserrat, sans-serif",
            color: "var(--tw-colors-secondary)",
            "@media (min-width: 768px)": {
              fontSize: "1.5rem",
            },
            "@media (min-width: 1024px)": {
              fontSize: "1.75rem",
            },
          },
        },
        h6: {
          css: {
            fontSize: "1rem",
            lineHeight: "1.6",
            fontWeight: "600",
            fontFamily: "Montserrat, sans-serif",
            color: "var(--tw-colors-secondary)",
            "@media (min-width: 768px)": {
              fontSize: "1.25rem",
            },
            "@media (min-width: 1024px)": {
              fontSize: "1.5rem",
            },
          },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-intense":
          "pulse-intense 7s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ripple: "ripple 1s linear forwards",
        "gradient-x": "gradient-x 3s ease infinite",
        "particle-float": "particle-float 8s ease-in-out infinite",
        "button-click": "button-click 0.6s ease-out forwards",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(0.98)" },
        },
        "pulse-intense": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(0.97)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: 0.7 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "particle-float": {
          "0%, 100%": {
            transform: "translateY(0) translateX(0) rotate(0deg)",
            opacity: 0.6,
          },
          "25%": {
            transform: "translateY(-20px) translateX(10px) rotate(45deg)",
            opacity: 0.8,
          },
          "50%": {
            transform: "translateY(-40px) translateX(20px) rotate(90deg)",
            opacity: 0.6,
          },
          "75%": {
            transform: "translateY(-20px) translateX(30px) rotate(135deg)",
            opacity: 0.4,
          },
        },
        "button-click": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
      transitionDuration: {
        700: "700ms",
        1500: "1500ms",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
