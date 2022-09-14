/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },

    extend: {
      colors: {
      },

      backgroundImage: {
        galaxy: "url('/fundo-galaxia.png')",
        "nlw-gradient": "linear-gradient(89.86deg, #9572FC 30.00%, #43E7AD 40.00%, #E1D55D 10.00%)",
        "game-gradient": "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)"
      }
    },
  },
  plugins: [],
}