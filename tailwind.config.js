/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,liquid,11ty.jsx,jsx,tsx,astro}"],
  theme: {
    extend: {
      colors: {
        blanco: "#fff5e8",
        naranja: "#ff4e1f",
        celeste: "#b9d7ea",
        amarillo: "#f9af39",
        violeta: "#dda7dd",
      },
      fontFamily: {
        sans: [
          "PP Fraktion Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
