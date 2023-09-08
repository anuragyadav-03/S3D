/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '10px',
        '3xs': "8px"
      },
      colors: {
        text: '#e5e5e8',
        'dark-text': '#7B4B0E',
        title: '#f6f6f7',
        'text-variant': '#b0b0b8',
        'text-variant2': '#878797',
        'text-disabled': '#474752',
        primary: '#f6951b',
        'primary-container': '#fcdcb3',
        'text-primary-container': '#7b4b0e',
        'dark-primary': '#F9B867',
        'dark-primary-container': '#A46312',
        'dark-text-primary-container': '#FACA8D',
        secondary: '#7e1bef',
        error: '#db1f1f',
        success: '#12b76a',
        action: '#0658ae',
        'fill-light-100': '#ffffff',
        'fill-light-200': '#F2F3F7',
        'fill-light-300': '#E7E9EF',
        'fill-dark-100': '#25262C',
        'fill-dark-200': '#1C1D21',
        'fill-dark-300': '#121417',
        'stroke-light-100': '#E1E3E9',
        'stroke-light-200': '#CECFD7',
        'stroke-light-300': '#909198',
        'stroke-dark-100': '#7D7F8C',
        'stroke-dark-200': '#686A77',
        'stroke-dark-300': '#545665',
      },
    },
  },
  plugins: [],
}

