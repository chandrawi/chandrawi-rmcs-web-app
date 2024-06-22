import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      fontFamily: {
        'inter': ['Inter', 'ui-sans-serif', 'sans-serif', 'Arial']
      },
      boxShadow: {
        'md_res': '0 0.25rem 0.375rem -0.0625rem rgb(0 0 0 / 0.1), 0 0.125rem 0.25rem -0.125rem rgb(0 0 0 / 0.1)'
      },
    },
  },
  plugins: [daisyui],
};
