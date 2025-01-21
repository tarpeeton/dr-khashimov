/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#0E3963",
        customDots: "#487096",
      },
      fontFamily: {
        dela: ["Dela Gothics", "sans-serif", "monospace"],
        montserrat: ["Montserrat", "sans-serif", "monospace"],
      },
    },
  },
  plugins: [],
};
