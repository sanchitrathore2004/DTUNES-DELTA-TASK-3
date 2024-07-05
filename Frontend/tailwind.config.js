/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        '1/10': '10%',
        '9/10': '90%',
        '7/8' : '87%',
        '7/10' : '70%'
      },
      width: {
        '1/6' : '15%',
      },
      fontSize: {
        'medium' : '10px',
        'small' : '7px',
      },
    },
  },
  plugins: [],
}

