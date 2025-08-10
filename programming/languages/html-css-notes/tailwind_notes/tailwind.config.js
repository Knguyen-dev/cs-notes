/*
- Importing tailwind colors:
1. You can import tail wind css color palette that's so often used.
2. So you can do something like 'bg-slate-500' or 'text-slate-900'


- tailwindcss color palette: https://tailwindcss.com/docs/customizing-colors

+ Defining our own theme:
1. It'll now create classes like "bg-gray-900" or "text-gray "akin to "bg-primary". So
    THat's how you add your own stuff.


+ Adding dark mode:

1. 'media' tailwind looks for prefers-color-scheme property, 
  and if it's 'dark' it applies classes with dark variant such as "dark:bg-yellow-300", which 
  is conditional syntax for 'if it's dark mode, use this background yellow ;

2. 'class' looks for a 'dark' class on parent elements, and if so it applies dark variants
  on the children.

3. 
*/

import 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', //class, 'media', or a booelan value (true/false)
	theme: {
		extend: {
			gray: {
				900: '#202225',
				800: '#2f3136',
				700: '#36393f',
				600: '#4f545c',
				400: '#d4d7dc',
				300: '#e3e5e8',
				200: '#ebedef',
				100: '#f2f3f5',
			},
		},
	},
	plugins: [],
};
