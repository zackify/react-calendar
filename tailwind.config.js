module.exports = {
  purge: {
    content: ['./src/**/*.tsx'],
    options: {
      safelist: ['lg:grid-cols-5', 'lg:grid-cols-6', 'lg:grid-cols-7'],
      keyframes: true,
      fontFace: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
