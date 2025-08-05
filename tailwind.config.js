/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#1C1F2A',      // Trust & authority - headers, footer
        'soft-taupe': '#F5F1EC',     // Warmth & comfort - main background
        'cream': '#EFE8DA',          // Approachable - section backgrounds
        'olive-green': '#7A9D54',    // Growth & renewal - primary CTAs
        'sage': '#B0C4A3',           // Calm & reliable - secondary CTAs
        'cool-gray': '#5E5E5E',      // Professional - body text
        'warm-wood': '#A47551',      // Craftsmanship - icons, animations
        'light-oak': '#D1A77A',      // Quality - badges, highlights
        'crisp-white': '#FFFFFF',    // Clean & fresh - button text
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        'wider': '0.05em',
      },
    },
  },
  plugins: [],
}