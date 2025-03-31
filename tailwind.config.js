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
        primary: "#00aed1", // Cyan-500
        secondary: "#c9fbff", // Cyan très clair (anciennement tertiary)
        tertiary: "#e3dcd4", // Beige clair (anciennement secondary)
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
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
  plugins: [],
};
