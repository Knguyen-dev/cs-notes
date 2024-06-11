

## Project setup
```
<!-- Installs an exact version of prettier -->
npm i -D --save-exact prettier

<!-- Format a single file -->
npx prettier --write <filename>

<!-- Check if a file is formatted to prettier standards; you're probably not going to use this one too much -->
npx prettier --check <filename>
```
Now you may use the command line, but this is pretty annoying doing manually, which is why any IDE is going to have some prettier integration to make things easier

## Download prettier extension
1. Download the prettier extension. 
2. Now go into your Vscode settings and search 'prettier'. Here you'll see the settings related to prettier
3. Go to 'text editor' and for `Editor: Default Formatter` set that to `Prettier - Code formatter`.
4. In the 'extensions' tab you'll see the various prettier formatting configurations. You may keep these default, but of course you can customize this for each project latter using a `.pretterrc` file.
5. Search 'formatonsave' and ensure format on save is turned on.

## Working on a team

#### Without Prettier as a dev dependency (bad):
1. The prettier extension in VScode will use its default settings or any settings in Vscode's settings (settings.json). 
2. If you have a global Prettier configuration file, it may also use those settings.
This often leads to inconsistencies, especially since team members may have different global settings or versions of the Prettier extension installed.

#### With Prettier as a dev dependency (recommended):
1. You create a `.prettierrc` file in your project root to define project-specific Prettier settings. This ensures that all team members use the same formatting rules. 
2. Consistency: All developer working on the project will use the same version of Prettier and teh same configuration, ensuring consistent code formatting across the team.
3. The Prettier extension that you have on your local machine will use the version of Prettier installed in your project; more consistency.

## Prettier files 
- .prettierignore: Declares that files should be excluded from Prettier formatting
- .prettierrc: Defines your project specific prettier settings, using these settings instead of your local settings. So yeah for our proejct we're using semi-colons, single quoted strings, etc. However we define some overrides or exceptions. For files ending in '.ts', they won't have semi-colons. For files that are in the 'legacy' directory, they will use double quotes instead of single quotes.

## Integrating with Eslint
Eslint detects and shows code formatting errors, but it also formats code. If you're using prettier, you don't want eslint conflicting with it. So how would we integrate prettier into a project that already has eslint

```
<!-- Package just turns off all eslint rules that prettier already handles; install eslint rules -->
npm i -D eslint-config-prettier @eslint/js
```
Then add 'prettier' in our extends list. Ensure prettier is the last thing in the extends list. Now we just have to handle the fact that our prettier formats and eslint rules may conflict. For example, `indent: "error"` on our eslint, but maybe in our prettier we wnat indenting.

```
<!-- Checks if there are conflicting eslint between prettier and eslint in a given file -->
npx eslint-config-prettier <filename>

<!-- Check if there are conflicting rules -->
npx eslint-config-prettier script.js
```



# Credits:
1. [How To Setup Prettier - Web Dev Simplified](https://www.youtube.com/watch?v=DqfQ4DPnRqI&t=263s)