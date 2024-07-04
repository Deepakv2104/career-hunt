module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // Enable dark mode based on class
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5f9',
          100: '#dbe4ee',
          200: '#b7c8db',
          300: '#93add0',
          400: '#6f91c5',
          500: '#4b76ba',
          600: '#3c5f97',
          700: '#2e4974',
          800: '#1f334f',
          900: '#111d2c',
        },
        secondary: {
          50: '#fef7f3',
          100: '#fce6d4',
          200: '#f9d5b5',
          300: '#f6c495',
          400: '#f3b376',
          500: '#38b2ac',
          600: '#cc8146',
          700: '#a66636',
          800: '#814a25',
          900: '#5d2e15',
        },
        dark: {
          gray: {
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
          teal: {
            500: '#00bfa6',
            600: '#00a593',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable dark mode for background colors
      borderColor: ['dark'], // Enable dark mode for border colors
      textColor: ['dark'], // Enable dark mode for text colors
    },
  },
  plugins: [],
};
