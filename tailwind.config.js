module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/views/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7740AE',
        'primary-hover': '#6B28AE',
        'primary-dark': '#352747',
        'secondary': '#F7F7F7',
        'secondary-hover': '#F2F2F4',
        'secondary-dark': '#CECFCF'
      }
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
