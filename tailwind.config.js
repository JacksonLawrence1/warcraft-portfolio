/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/routes/**/*.{html,js,svelte,ts}'],
  plugins: [require("daisyui")],

  daisyui: {
    themes: false,
    darkTheme: "dark",
    styled: true,
  },
}

