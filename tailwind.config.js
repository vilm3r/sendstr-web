/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "custom-green-light": "#6b9370",
        "custom-green-dark": "#4D6A51",
        "custom-black": "#3C3744",
      },
    },
  },
  plugins: [],
}
