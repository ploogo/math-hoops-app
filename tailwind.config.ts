import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        raptors: {
          red: '#CE1141',
          black: '#000000',
          white: '#FFFFFF',
          'red-dark': '#A80D33',
          'red-light': '#D84162',
          'gray-dark': '#333333',
          'gray-light': '#CCCCCC',
        },
      },
    },
  },
  plugins: [],
}

export default config