/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#162850",
        main2: "#F6F7FF",
        main3: "#F6F7FF",
      },
      fontFamily: {
        instrumentSans: ["Instrument Sans"],
        joan: ["Joan"],
        josefinSans: ["Josefin Sans"],
        kantumruyPro: ["Kantumruy Pro"],
        rubikGlitch: ["Rubik Glitch"],
      },
    },
  },
  plugins: [],
};
