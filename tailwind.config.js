module.exports = {
  prefix: 'rc-',
  corePlugins: {
    preflight: process.env.TW_PREFLIGHT == 'false' ? false : true,
  },
  purge: {
    content: ['./src/**/*.tsx'],
    options: {
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
