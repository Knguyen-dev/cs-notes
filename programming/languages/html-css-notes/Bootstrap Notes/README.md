# Bootstrap 5

-   Boostrap: A widely used CSS framework that tries to make css styling a lot easier. Also has popular prebuilt, easy to implement components.

# HTML-CSS Support Extension:

-   Intellisense but for css, and it allows autocompletion of class names and ids, so it's really convenient.

# Setting up bootstrap:

1. Include primary bootstrap cdn links to your target html file
2. Now we have access to bootstrap. You should see that bootstrap has already applied default stylings.

# Boostrap grid system:

-   Grid system breaks things down into 3 levels: containers, rows, and columns.

-   row: Rows are actually using flexbox, which is why columns are evenly spaced. Grid uses a 12-column system where items share those 12 columns. Of course you can affect the amount of columns a singular column spans.

# Boostrap icons:

-   Bootstrap have their own icons library where you can get icons, whether or not
    you're even using bootstrap. Just another option for icons.
-   How to use:

1. attach bootstrap icons cdn link or install it as a dependency with npm
2. Then paste in the icon element with the class you want.

-   Bootstrap icon library: https://icons.getbootstrap.com/

# Main Takeaway

-   Bootstrap provides the components, but it makes it very easy to change stuff around. As well as this, these notes aren't a comprehensive guide on the components, so the best solution would be reading the documentation when you really want to do something with a component. The docs are comprehensive and surprisingly easy to read.

# Ways to customize bootstrap

Method 1: Create your own additional style sheet that can override bootstrap styles.
Then add that stylesheet after the bootstrap one in the head.

Method 2: Use custom sass files to customize bootstrap.

1. npm init -y; initialize npm and package.json
2. npm install bootstrap; install bootstrap as a dependency
3. npm install node-sass --save-dev; install sass compiler
4. In node_modules/bootstrap/dist/ we see all of their style files However, we don't actually want to modify or interact with these files directly.
5. Create a 'sass' folder with your own sass file. Import bootstrap and
   now you can overwrite sass variables there. To find sass variables,
   so to "variables.scss"

6. Overwrite existing sass variables
7. Create a script in package.json that compiles your sass file into css.
   Then after you have your css file, replace your css cdn link with
   a link to your css file.
8. Now everytime you make a change to your sass file, to see the change, you'll
   need to recompile it using our script 'npm run sass'.

# Credits:

1. Web Dev Simplified: https://www.youtube.com/watch?v=Jyvffr3aCp0
2. NetNinja: https://www.youtube.com/watch?v=yCCIztB-S_k&list=PL4cUxeGkcC9joIM91nLzd_qaH_AimmdAR&index=8
3. Bootstrap Documentation: https://getbootstrap.com/docs/5.2/components/accordion/
