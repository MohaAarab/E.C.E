/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        fond: "#0b1220",
        surface: "#121e30",
        "surface-elevee": "#19283d",
        bordure: "#2a3a50",

        // Text
        creme: "#f4ebdd",
        secondaire: "#a4b0c0",

        // Gold / accents
        empereur: "#d8b46a",
        survivant: "#e9c984",
        pioche: "#f4dca4",

        // Roles & states
        citoyen: "#78a9e8",
        esclave: "#f08b88",
        victoire: "#88ccaa",
      },
      fontFamily: {
        titre: ["Cinzel", "serif"],
        texte: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};