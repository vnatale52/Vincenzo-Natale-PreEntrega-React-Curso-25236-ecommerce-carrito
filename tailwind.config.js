/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#00baff',
        panel: '#0b1220'
      },
      fontFamily: {
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: [],
}
