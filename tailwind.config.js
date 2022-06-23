/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green-light': '#6b9370',
        'custom-green-dark': '#4D6A51',
        'custom-black': '#3C3744'
      }
    }
  },
  plugins: [],
}
