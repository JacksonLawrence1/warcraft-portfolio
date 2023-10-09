/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('daisyui')],

	daisyui: {
		themes: [
			{
				default: {
          'base-100': '#393e46',
					secondary: '#222831',
					primary: '#f96d00',
          accent: '#f2f2f2',
				}
			}
		],
		darkTheme: 'dark',
		styled: true
	}
};
