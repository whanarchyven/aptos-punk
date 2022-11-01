/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,js,tsx,jsx}",
    "./pages/**/*.{ts,js,tsx,jsx}",
    "./components/**/*.{ts,js,tsx,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'game': ['"Game Of Squids"'],
        'jost': ['"Jost"'],
        'player': ['"Press Start 2P"'],
      }
    },
  },
  plugins: [],
}