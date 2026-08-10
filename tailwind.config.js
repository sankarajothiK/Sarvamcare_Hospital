/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          bgSecondary: {
            light: '#FAF7FF',
            DEFAULT: '#F3EDFA',
            dark: '#EDE4F7',
          },
          purple: {
            light: '#7E3DB5', // purple accent light
            DEFAULT: '#6D2FA0', // purple accent
            dark: '#4B1B78', // deep royal purple 3
            deep: '#3D176E', // deep royal purple 2
            royal: '#32105F', // deep royal purple 1
          },
          gold: {
            light: '#F3D98A', // premium gold highlight
            DEFAULT: '#D8B35A', // gold 2
            dark: '#C89B3C', // gold 1
          },
          text: {
            DEFAULT: '#24152F', // main text
            secondary: '#665A70', // secondary text
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
