/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        80: "20rem",
        96: "24rem",
        112: "28rem",
        128: "40rem",
        144: "48rem",
      },
      colors: {
        purpur: "#E6DFF1",
        blub: "#C0DEDD",
        pch: "#F1DFDE",
        antiquewhite: "#faebd7",
        beige: "#F5F5DC",
        azure: "#F0FFFF",
        aliceblue: "#F0F8FF",
        bisque: "#FFE4C4",

        // backgrounds
        gry: "#363636",
        drk: "#151515",
        ghost: "#F5F5F5",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
