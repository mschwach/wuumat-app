export default {
  plugins: {
    // Ändere 'tailwindcss' zu '@tailwindcss/postcss'
    '@tailwindcss/postcss': {}, // Dies ist der korrekte Weg, Tailwind CSS als PostCSS Plugin zu referenzieren
    autoprefixer: {},
  },
}