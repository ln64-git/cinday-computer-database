import {nextui} from "@nextui-org/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "#000000",
        },
        // content1: "var(--background-dark)",

        focus: "dark-red",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "var(--primary)",
              foreground: "#000000",
            },
            foreground: "#a8a8a8",
            background: "#1c1c23",
            content1: "#24242c",
            focus: "var(--primary)",
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "var(--primary)",
              foreground: "#000000",
            },
            foreground: "#000000",
            content1: "#9393b8",
            // content2: "#93b8",
            // content3: "#3b8",
            // content4: "#23b8",

            // overlay: "#e33",
            // secondary: "#e1f",

            background: "#6a6a97",
            focus: "var(--primary)",
          },
        },
      },
    }),
  ],
}
