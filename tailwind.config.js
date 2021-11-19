module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens:{
      'sm': {'max': '767px'},
      'md': {'min': '768px', 'max': '1536px'}
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
