/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'deep-charcoal': '#1A1A1A',  // Headers, primary text
        'midnight-navy': '#1B2838',  // Footer, trust sections
        'slate-gray': '#2E3A47',     // Secondary headers, accents
        
        // Background Colors
        'warm-taupe': '#F5F1EC',     // Main background (keeping original)
        'light-gray': '#F8F8F8',     // Alternate sections
        'crisp-white': '#FFFFFF',    // Cards, clean spaces
        
        // Accent Colors
        'burnt-sienna': '#A0522D',   // Primary CTAs (warmer than green)
        'terracotta': '#C67544',     // Hover states, highlights
        'dusty-gold': '#D4A574',     // Badges, special elements
        
        // Supporting Colors
        'medium-gray': '#5A5A5A',    // Body text
        'light-charcoal': '#404040', // Subheadings
        'soft-beige': '#E8E2DA',     // Borders, dividers
        
        // Functional Colors
        'success-green': '#4A7C59',  // Success messages
        'error-red': '#B85450',      // Error states
        'info-blue': '#4A6FA5',      // Information alerts
        
        // Legacy mappings for gradual migration
        'deep-navy': '#1B2838',      // Maps to midnight-navy
        'cream': '#E8E2DA',          // Maps to soft-beige
        'olive-green': '#A0522D',    // Maps to burnt-sienna
        'sage': '#C67544',           // Maps to terracotta
        'cool-gray': '#5A5A5A',      // Maps to medium-gray
        'warm-wood': '#A0522D',      // Maps to burnt-sienna
        'light-oak': '#D4A574',      // Maps to dusty-gold
        'soft-taupe': '#F5F1EC',     // Alias for warm-taupe
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'], // Default for everything
        'inter': ['Inter', 'system-ui', 'sans-serif'], // Modern primary font
        'logo': ['Montserrat', 'sans-serif'], // Logo ONLY
      },
      fontWeight: {
        'light': 300,
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
        'black': 900,
      },
      letterSpacing: {
        'header': '0.05em',
        'wider': '0.05em',
      },
    },
  },
  plugins: [],
}