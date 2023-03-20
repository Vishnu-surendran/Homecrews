/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        navcolor:"#0f172a"
      },
      backgroundImage:{
           'banner':"url('../../banner-bg.png')"
      },
      screens:{
        "phone":"824px"
      }
    },
  },
  plugins: [],
}