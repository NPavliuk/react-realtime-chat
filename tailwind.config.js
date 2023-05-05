module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/views/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F7F7F7',
      },
			maxWidth: {
				'sidebar': '325px',
			}
		}
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
		require('tailwind-scrollbar')({ nocompatible: true }),
    require('tailwind-scrollbar-hide'),
		require('@tailwindcss/line-clamp'),
  ]
}
