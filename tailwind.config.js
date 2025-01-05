/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/bg.png')",  
      },
      colors: {
        'primary': '#3D6CFF',
        'primary': '#3D6CFF', 
      },
    },
  },
  plugins: [],
};
