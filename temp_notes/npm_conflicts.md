# Handling Version Conflicts with NPm

## Example Situation:
```bash
npm error While resolving: vite-template@0.0.0
npm error Found: @heroui/system@undefined
npm error node_modules/@heroui/system
npm error   @heroui/system@"2.3.1" from the root project
npm error
npm error Could not resolve dependency:
npm error peer @heroui/system@">=2.4.10" from @heroui/number-input@2.0.9
npm error node_modules/@heroui/number-input
npm error   @heroui/number-input@"2.0.9" from the root project
```
NPM is installing us that we installed package X at version Y. In this case we installed we tried installing `@heroui/system@"2.3.1` (in `package.json`). However the issue is that another package expects a different version of that dependency. In this case:
```bash
npm error peer @heroui/system@">=2.4.10" from @heroui/number-input@2.0.9
npm error node_modules/@heroui/number-input
npm error   @heroui/number-input@"2.0.9" from the root project
```
This peer dependency (other package) that can't function. Th dependency `@hero@ui/number-input2.0.9` cannot function unless `heroui@system >= 2.4.10` exists in our project. Let's verify what we have in our `package.json` one last time:
```json
"@heroui/system": "2.3.1"
```
Yep, we have version 2.3.1 when we wants versions 2.4.10 or more. As a result, npm refuses to install because the dependency tree would be broken .Modern npm (v7+) is strict and will stop installation when peer dependencies don't match, instead of silently installing an unusable combination. If we keep trying to install 2.3.1, or attempt a lower version of `@heroui/system`, then we'll keep getting this errr. The main thing I try to do when fixing stuff like this is going onto the package's NPM home page and looking at what versions we can still that meet the requirements. Other than that it's mainly guess and check. To avoid doing this guess and check stuff, please version control your `package-lock.json`.
