/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // Permite alternância entre temas claro e escuro
  theme: {
    extend: {
      colors: {
        recifeBlue: "#0033A0",
        recifeWhite: "#FFFFFF",
        recifeGold: "#FFD700",
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
