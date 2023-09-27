# Eslint-Prettier-Notes

Notes on how to go about using eslint and prettier

-   Definitions:

1. Prettier: Formats code automatically for you and makes things look according to your settings
2. Eslint: Looks and analyzes your code and shows errors or warnings and tells you when a rule is broken in the .eslintrc.json rules file

-   How to set up prettier in editor ('prettier-basics'):

1. Download prettier extension in vscode
2. Make sure it's the default formater in vscode settings
3. Download Prettier ESLint extension for making eslint and prettier work together
4. Use a '.prettierrc' to set up the prettier settings for a individual project. You'd put this in your project's root directory
   and it will format all files in the root and lower it seems. You'd mainly use this when you're working with a team, so that
   everyone can use the same settings.
5. You can also set up a '.prettierignore' file to make prettier ignore formatting any files
   you don't want formatted, such as a gitignore, node_modules, etc.
6. Then turning on format on save and format on paste would get good to turn on in vscode.

-   How to set up prettier using webpack and command line ('prettier-webpack)

1. "npm init -y" to set up package.json
2. "npm install --save-exact prettier" to install the exact version of prettier. This is so
   that if prettier updates, you have to manually update it in your project to get the new update. This is good because maybe a prettier update could majorly change the way your code
   looks, and this protects you from that.
3. "npx prettier --write myFile.js" prettier formats 'myFile.js'
4. "npx prettier --check myFile.js" checks if a file is adhering to prettier formatting Normally
   you're probably not going to use both of these, but rather the extension itself.
5. In our prettierignore we ignored all files in node_modules directory, and we ignored html files
6. Use prettierrc file to customize prettier. There we made an override where, for files ending in ".ts", we made it so they did not have semicolons. So you can customize for different files all in the prettierrc file.

-   eslint-basics:

1. "npm init -y" Initialize package.json
2. "npm install --save-dev eslint" Install eslint as a dev dependency
3. "npx eslint -init" initialize eslint, lets you answer a couple of questions and creates a .eslintrc.json file for your configurations
4. Then your '.eslintrc.json' will basically be your eslint configurations file, and you can add rules to it and whatnot. Please also
   download the eslint vscode extension as well.
5. Add 'lint' to our scripts to run eslint on the command line. Then do
   'npm run lint' and it'll show you any errors, warnings, etc. that eslint found

-   How to use both ('using-both'):

1. Initialize package.json,
2. Install eslint and prettier as save dev
3. "npm init @eslint/config" initialize eslint;
4. "npm install --save-dev eslint-config-pretter"; Turns off all eslint configs for things
   that prettier already handles. Then add 'prettier' to the 'extends' list in '.eslintrc' file
   as the last element
5. However, some settings in your prettier settings ('.prettierrc') may conflict with
   rules set in your '.eslintrc.json' file. To check if settings are conflicting

    "npx eslint-config-prettier app.js"; will show rules that are unnecessary or may
    conflict with "Prettier". This catches most rules, but there are some special rules
    that you have to do manually like "quotes", but those are kind of easy to figure out.

-   NOTE: Similar to prettier eslint also acts as a formatter, but f you're using prettier and eslint, it's probably best to let prettier do the formatting whilst eslint can visually tell you what's wrong.

-   Credits:

    -   For prettier

    1. Kevin Powell: https://youtu.be/8k-b-7rJAeU?feature=shared
    2. Web Dev Simplified: https://youtu.be/DqfQ4DPnRqI?feature=shared

    -   Eslint

    1. Freecodecamp: https://youtu.be/qhuFviJn-es?feature=shared
