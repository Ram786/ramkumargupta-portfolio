/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { 'muted-foreground': 'hsl(var(--muted-foreground))' },
      boxShadow: { glow: '0 8px 30px rgba(0,0,0,0.12)' },
      backgroundImage: {}, // keep empty to avoid inline data URLs
    },
  },
  plugins: [],
};
