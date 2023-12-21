# Tailwind css for react and vite

- Here we're going to be following along a tutorial to build a discord sidebar
  to get practice with tailwind. As well as this I'll show some of the core concepts in the docs
  after.

# Tailwind intellisense extension

1. Install "Tailwind CSS IntelliSense" code extension

# Setting up tailwind (For Vite)

1. npm install -D tailwindcss postcss autoprefixer; installs tailwind and other packages
2. npx tailwindcss init -p; Create a 'tailwind.config.js'and 'postcss.config.js'
3. Add tailwind directives to our main css file "index.css"
4. Done; now you can do npm run dev and use tailwind
5. In tailwind config, do 'mode: jit' for 'just in time compilation' which makes dev
   mode easier as build time is reduced. Since we activated jit, we have to activate
   purge mode, which purges unused css from final bundle.


# Automatic class sorting
- Will sort your classes in the same way that tailwind css sorts them.
  Just makes things more organized and readable.
1. npm install -D prettier prettier-plugin-tailwindcss
2. Add plug to prettier config file
- Credits: npm install -D prettier prettier-plugin-tailwindcss


# React Icons

- Allows us to have bootstrap and font awesome icons as react components.
- Credit: https://react-icons.github.io/react-icons/

1. npm install react-icons; install as a production dependency because we want these icons on the site when deployed
