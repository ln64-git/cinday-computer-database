import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // primary: {
        //   DEFAULT: 'var(--primary)',
        //   foreground: '#000000',
        // },

        // content1: 'var(--primary2)',
        // background: 'var(--primary)',
        primary: 'var(--primary)',
        secondary: '#006FEE',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              foreground: '#000000',
            },
            foreground: '#a8a8a8',
            background: '#1c1c23',
            content1: '#24242c',
          },
        },
        light: {
          colors: {
            primary: {
              foreground: '#000000',
            },
            background: '#ebe9e9',
            // foreground: '#000000',
            content1: '#edecec',
            // content2: "#93b8",
            // content3: "#3b8",
            // content4: "#23b8",

            // overlay: "#e33",
            // secondary: "#e1f",
            // background: '#6a6a97',
            // default: '#a6a9bd',
          },
        },
      },
    }),
  ],
}
