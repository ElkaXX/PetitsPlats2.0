/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton"],
        manrope: ["Manrope"],
      },
      colors: {
        grey: "#7A7A7A",
      },
    },
  },
  plugins: [],
};
