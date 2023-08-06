/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
],
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
        // card colors
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
        whitesmoke: "#F5F5F5",
        
        // Placeholder colors, make sure to replace or remove them
        primary: "#YOUR_PRIMARY_COLOR",
        "primary-foreground": "#YOUR_PRIMARY_FOREGROUND_COLOR",
        accent: "#YOUR_ACCENT_COLOR",
        "accent-foreground": "#YOUR_ACCENT_FOREGROUND_COLOR",
        "muted-foreground": "#YOUR_MUTED_FOREGROUND_COLOR",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
