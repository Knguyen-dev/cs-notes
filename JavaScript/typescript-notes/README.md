# Typescript notes
Typescript is just a another form of JavaScript where your variables are 'strictly typed', meaning you define a data-type for a variable and that 
variable must stay that data-type. The benefit of this is that it can make your code much more readable/informative. You know what kind of data is being returned from a function and being passed into one. As well as this, if you mistype a variable, Typescript will let you know. When defining these datatypes, we are essentially documenting this code as well, which will help us and other developers in the future.

# Takeaway:
Typescript is just javascript with just extra annotations to define datatypes for varaibles and whatnot.

# Setting up typescript:
Install type script on a project-by-project basis:
```
npm i typescript
```
Or install typescript globally on your computer:
```
npm i -g typescript
```



# How to compile ('run') typescript:
You can compile your typescript code manually
```
// compile the typescript file to javascript
tsc index.ts
// execute the 
node index.js
```
However you should use a tsconfig file that configures your typescript configuration file. You can use the command below to create a tsconfig.json file, but if you're using Vite, then Vite should do the work for you.
```
// Creates tsconfig.json file in root directory
tsc --init

// Now you don't have to do the 'tsc' command to run code.
tsc --watch
```



# Credit:
1. [TypeScript crash course (Net Ninja)](https://youtu.be/VGu1vDAWNTg?feature=shared)
2. [TypeScript Tutorial (Traversy media)](https://youtu.be/BCg4U1FzODs?si=EkNQlGiR3BOfQxov)