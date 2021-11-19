module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens:{
      'sm': {'max': '767px'},
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
