const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Readex: ["Readex Pro", "sans-serif"],
      },
      colors: {
        mainColorBackground: 'rgb(var(--main-color-background))',
        mainColor: 'rgb(var(--main-color))',
        mainColorHover: 'rgb(var(--main-color-hover))',
        sectionColor: 'rgb(var(--section-color))',
        sectionColorFocus: 'rgb(var(--section-color-focus))',
        sectionColorHover: 'rgb(var(--section-color-hover))',
        colorText1: 'rgb(var(--color-text-1))',
        colorText2: 'rgb(var(--color-text-2))',
        colorBorder: 'rgb(var(--color-border))',
      },
    },
  },
  plugins: [],
});
