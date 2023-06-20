/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: "'Manrope', sans-serif",
        noto: "'Noto Serif', serif",
      },
      colors: {
        "ed-black": "rgb(var(--black) / <alpha-value>)",
        "ed-black2": "rgb(var(--black2) / <alpha-value>)",
        "ed-black3": "rgb(var(--black2) / <alpha-value>)",
        "ed-black-via": "rgb(var(--black-via) / <alpha-value>)",
        "ed-tag": "rgb(var(--tag) / <alpha-value>)",
        "ed-white": "rgb(var(--white) / <alpha-value>)",
        "ed-gray1": "rgb(var(--gray1) / <alpha-value>)",
        "ed-gray2": "rgb(var(--gray2) / <alpha-value>)",
        "ed-gray3": "rgb(var(--gray3) / <alpha-value>)",
        "ed-gray4": "rgb(var(--gray4) / <alpha-value>)",
        "ed-gray5": "rgb(var(--gray5) / <alpha-value>)",
        "ed-gray6": "rgb(var(--gray6) / <alpha-value>)",
        "ed-gray7": "rgb(var(--gray7) / <alpha-value>)",
        "ed-greymid": "rgb(var(--grey-medium) / <alpha-value>)",
        "ed-yellow": "rgb(var(--yellow) / <alpha-value>)",
        "ed-yellow-hover": "rgb(var(--yellow-hover) / <alpha-value>)",
        "ed-pearl": "rgb(var(--pearl) / <alpha-value>)",
        "ed-error": "rgb(var(--error) / <alpha-value>)",
      },
      boxShadow: {
        black: "inset 0 -1px 0 rgb(var(--black))",
        black2: "inset 0 -1px 0 rgb(var(--black2))",
        black3: "inset 0 -1px 0 rgb(var(--black3))",
        gray3: "inset 0 -1px 0 rgb(var(--gray3))",
        white: "inset 0 -1px 0 rgb(var(--white))",
      }
    },
  },
  plugins: [],
}

