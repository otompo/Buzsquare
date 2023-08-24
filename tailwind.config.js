/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/screens/**/*.{js,jsx,ts,tsx}",
    "./app/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      literata: ["Literata", ...defaultTheme.fontFamily.sans],
      dmsans: ["DM Sans", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: "#1bc10d",
        secondary: "#ededed",

      },
    },
  },
  plugins: [],
};
