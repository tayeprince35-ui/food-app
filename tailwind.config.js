/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  safelist: [
    {
      pattern: /.*/,
    },
  ],

  theme: {
    extend: {
      fontFamily: {
        jakarta: ["PlusJakarta-Regular"],
        jakartaMedium: ["PlusJakarta-Medium"],
        jakartaSemiBold: ["PlusJakarta-SemiBold"],
        jakartaBold: ["PlusJakarta-Bold"],
      },
    },
  },

  plugins: [],
};