/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
       '80': '20rem',
        '96': '24rem',
        '112': '28rem',
        '128': '40rem',
      },
      colors: {
      "dodgerblue": "#1E90FF",
      "dark": "#191414",
      "green": "#1DB954",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}