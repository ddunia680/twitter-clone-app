/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '450px',
        'md': '576px',
        'lg': '768px',
        'xl': '1300px',
        '2xl': '1680px'
      },
      colors: {
        primary: '#000000',
        closestToPrimary: '#0d0d0d',
        darkClose: '#1a1919',
        darkComponent: '#16181c',
        darkComponentVar: '#1f2227',
        iconsColor: '#d6d9db',
        blueSpecial: '#1d9bf0',
        blueLight: '#324450',
        darkTextColor: '#71767b',
        redText: '#ff0000',
        redBg: '#421010'
      }
    },
  },
  plugins: [],
}

