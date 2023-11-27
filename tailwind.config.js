/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl'), fontWeight: 800 },
        'h2': { fontSize: theme('fontSize.xl'), fontWeight: 700 },
        'h3': { fontSize: theme('fontSize.lg'), fontWeight: 600 },
      })
    })
  ],
}

