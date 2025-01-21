/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {

        // NEW Font (sekarang dengan fallback!)
        body: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],

      },
      colors: {

        // NEW Colour Palette (tolong ikuti ISO - ISCO Standarized Options LOL )
        primary: "#004BAA",
        secondary: "#031D40",
        text: "#4F4F4F",
        accent: "#005FCC",
        border: "#C3C5C7",
      },
    },
  },
  plugins: [],
}
