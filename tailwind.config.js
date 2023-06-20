/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
      dodgerblue: '#1E90FF',
      },
      width: {  
        '80': '20rem',
        '160': '40rem',
      }
    },
  },
  plugins: [],
}
