# TypeSript and Docker
A tutorial on how to setup docker with TypeScript.

```
npm i express

<!-- TypeScript is a dev dependency becuase remember, no websites actually use TypeScript they use JavaScript. We take TypeScript, and compile it into JavaScript, and then our JavaScript code is our production code. 'ts-node-dev' is just nodemon, but for TypeScript -->
npm i -D @types/express typescript ts-node-dev rimraf

<!-- Create tsconfig.json -->
npx tsc --init
```
Our 'dev' script is for running the typescript in development. Our 'build' script is for building the production code files in our 'dist' directory, which we indicated as our output directory in tsconfig.json. Then finally our 'start' will  start the app in production, so it should run the 'dist/index.js' (entry point). Finally, when we re-build, we don't want our old/stale build files there. We'll use a library called 'rimraff' which helps us delete those stale files. Now when doing `npm run build`, we first delete all files in the /dist directory, and then we compile our TypeScript and add our JavaScript files.


## Starting with docker and our dockerfile
With docker and containers, you want the most optimized (in terms of space) images and containers possible. We don't want our containers to be bloated in size, we want them to be small. So any files that don't do anything won't be included in our final product.

For TypeScript, we will be using Docker 'multi-stage' builds. The idea here is that we'd have two containers. The first container gets our files/code, transforms those and does stuff with them, and then our final container will take those transformed/finalized files and execute those files. So our first container compiles the TypeScript files into JavaScript, and then our second container takes only the JavaScript files since we don't need the TypeScript files.

It wasn't mentioned before but it's recommended to copy both the package.json and also the package-lock.json. The latter is important for ensuring that the exact version of the dependencies are installed, so it's just recommended to copy both.

In our first container, copy all of the dependencies and whatnot. Then we compile our TypeScript code into JavaScript. This JavaScript will then be used by our second container. Our second container is similar to the first, but here just copy over our production dependencies and copy the files in /dist

It's generally faster to run `npm ci --only=proudction` for CI/CD pipelines at least. As well as this it doesn't modify package-lock.json. In a regular case using `npm install --only=production` may modify `package-lock.json` if it's out of sync with `package.json`.


## Giving staging names
When we do `npm run build` in the first stage, it creates compiles our TS files and turns them into JS files, placing them in the `/usr/src/app/dist` inside the first container. Then in our second stage we'll copy those TS files that were created. In order to do this, we need to give our stages identifiable names. IN this case 'development' and 'production'.


## Setting up for development and production with Docker Compose
You'll have a docker-compose file, one for development and one for production! Same as before.

For 'target', it asking what stage do you want to stop at. So for docker-compose.dev.yaml we want to stop when we finish our development stage. So `target: development` runs all stages before and including 'development', and stops. As a result in our docker-compose.dev.yaml file, we don't run our production stage.

Use volumes to map your project files to the files in the container. Now changes will be mirrored. Use another module to ensure `node_modules` in the container isn't affected by changes made to `node_modules` on the machine. 

As well as this, when in development we also want to run the `npm run dev` command. So add that in the docker-compose.dev.yaml

```
<!-- Run the development images; you may have to rebuild the image  -->
docker-compose -f docker-compose.dev.yaml up --build -d
```


Alright let's create the production file. You may create a `docker-compose.prod.yaml`, or just a `docker-compose.yaml` for a production docker-compose file. This one's pretty simple actually. 
```
<!-- No need to specify the file name here since it automatically looks for 'docker-compose.yaml' -->
docker-compose up --build -d

<!-- Here's the command to go into the container's file directory or shell. You should see that there's no 'src' folder on the production build, because we don't want our build containing TypeScript files.-->
docker exec -it <container-id> sh
```



# Credits:
1. [Docker + TypeScript](https://www.youtube.com/watch?v=4q3br8jRSz4)