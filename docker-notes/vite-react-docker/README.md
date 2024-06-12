# React With Docker


## Vite setup
Here we created a react application with vite. For the dev script to work in a container you have to add this stuff so that it runs regardless of the IP.
```
"dev": "vite --host 0.0.0.0"
```
Or you mess with the vite.config.js file to and do `server.host: true`.

## Dockering

#### Basics
```
docker build -t react-app-i .

<!-- You need to specify this use polling option for real-time changes to happen -->
docker run --env-file=./.env -v ${pwd}:/app -v /app/node_modules -p 8080:8080 --rm -d --name react-app-c react-app-i

docker exec -it react-app-c sh
```
Okay this is good, but writing out this long command everytime could be tiring and hard to read. Especially when you have multiple containers, so we'll use docker-compose

#### Docker compose 
Let's create a docker-compose.yaml file that will build and run the image for our react application. As well as this, once we 'tear down' or stop the container, the container will be automatically deleted for us

```
<!-- Note that docker-compose looks for a cached image first, rather than rebuilding the image. So if you've made changes to your dockerfile, and you want those changes to take effect,pass in the `--build` so that doing this command rebuilds the images-->
docker-compose up

<!--  -->
docker-compose down -v
```


## Running React in development mode vs production mode
- Development mode: Reacts creates a 'React Dev Server', a web server that will serve and show your react application. So when you make a request to see the react app, this dev server handles showing the index.html, managing the css and js. However this development web server isn't very scalable, and even about a couple thousand requests would cause it to crash. As a result this dev server, isn't made for production
- Production mode: When you want to move into production, you run `npm run build` which creates a `build` directory with three static files html, css, and js that have all of your code bundled into it. Now instead of using your react dev server, we have to use our custom web server. An example would be NGINX (Engine X), which is a powerful and high-performance web server and reverse proxyx server. It's commonly used to serve static content, and handle large amounts of concurrent connections, act as a load balancer and http cache. Anyways we're going to be using it as our web server to serve our react application in a production environment. So NGINX is going to work with those three files you got from `npm run build`.

## Multi-stage builds
So bsaically, we need to create an nginx server, then create files with npm run build, and then provide those files to your nginx server, and then run this server on your docker container. To do accomplish this mighty task, we must work with multi-staged builds.

- Stage 1:
1. Use node
2. Copy package.json file
3. Install dependencies
4. `npm run build`; create the 'Build' folder. In our case, vite creates a 'dist' folder so we'll use dist from now on

- Stage 2:
1. Use NGINX; official nginx image from dockerhub
2. Copy code from `dist` folder from stage 1
3. Then start NGINX

So first rename our development docker file to 'dockerfile.dev' and update the docker-compose.yaml so it knows. Create a 'dockerfile.prod' for building our production image. In our production file we just create 2 stages. We copy from the dist folder in our first image, and paste that stuff into ``/usr/share/nginx/html`, which is nginx's default directory for where you want to put the files. Now let's build the production image:

```
<!-- Build our production image -->
docker build -f dockerfile.prod -t react-app-prod-i .

<!-- Run our production image. Nginx is using container port 80 by default, so we map that to 5173 so that any traffic on 5173 is given to port 80. We never actually run our Vite development server in our production environment, so the Vite port configuration doesn't matter. We take the /dist files, and give them to nginx which runs on port 80. And we don't need volumes anymore so we can remove those. -->
docker run --env-file=./.env -p 5173:80 --rm -d --name react-app-prod-c react-app-prod-i
```

#### Dockercompose with production environment
We will create 3 new files, and in the end here are the files we should keep in mind:
1. dockerfile.dev: For creating the image of our app in developer mode
2. dockerfile.prod: For creating the image of our app in production mode
3. docker-compose.yaml: Contains shared configurations for all containers. So if you're in big projects with multiple containers, you'll probably see that a lot of your containers have the same or similar configurations. Here we can put those shared configurations in one those, our child docker-compose files, will 'inherit' those. Of course the child docker-compose files can override the parent configurations. So even though right now this file has no contents, it's still good to think about and remember in case you need it.
4. docker-compose.dev: Runs our development image.
5. docker-compose.prod: Runs our production image.

```
<!-- Build and run development image -->
docker-compose -f docker-compose.dev.yaml up -d --build

<!-- Build and run production image -->
docker-compose -f docker-compose.prod.yaml up -d --build
```

One last thing, in our production container, our environment variables we've created in `docker-compose.prod.yaml` aren't being loaded and it's actually taking the default environment variable we created. For our applications, all of our environment variables need to be made available before we do `npm run build`, because after we do that our code is set. So we need  to make sure the values of our environment variables are in the source code. However when we run our `docker-compose.prod.yaml` file, it's passing those environment variables to the Nginx container, which isn't what we want.

So our environment variable we set in the dockerfile `ENV VITE_APP_NAME` is only available during our build stage. So this variable is available to our React application. However, the environment variables from the first stage, won't carry over to the second stage, unless we explicitly pass them. When we run a `docker-compose.yaml` file, any environment variables either specified by `env_file` or `environment` are directly passed to the running container's environment, Nginx, and aren't available during the Dockerfile build process. 


#### How to access `.env.prod` during build stage
1. Create a `.env.prod` that has our production environment variables
2. Use `ARG` to define build-time variables, so these variables will be made available when we build the image. Then use `ENV` to set them during the build stage
```
# Stage 1: Build
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Define ARG for build-time variables
ARG VITE_APP_NAME

# Use ARG in the ENV instruction to set environment variables during build
ENV VITE_APP_NAME=$VITE_APP_NAME

# Build the application
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
```
3. Pass these build arguments in the `docker-compose.yaml`
```
services:
  react-app:
    build:
      context: .
      dockerfile: dockerfile.prod
      args:
        - VITE_APP_NAME=${VITE_APP_NAME}
    container_name: "react-app-prod-c"
    ports:
      - 8080:80
    env_file:
      - ./.env.prod
```


```
<!-- Run developer mode -->

```



- NOTE: In our development workflow, the environment variables in `.env.dev` aren't available in dockerfile.dev but are made available when the container runs. It's specifically because the application running in the container is our Vite react dev server, that the environment variables are applied since they are part of the container's runtime environment.







# Credits:
I highly suggest watching the first video as dockerizing a React project that's been scaffolded with Vite comes with its own unique challenges. Then after you know the basics, watch the second guy's video and try to follow along. The second guy link is for create-react app, but with enough ingenuity you should be able to modify some things.

1. [Dockerizing and Deploying a Vite React App - RoadsideCoder](https://www.youtube.com/watch?v=dfTco9hmXEM)
2. [Docker + ReactJS: Development to Production](https://www.youtube.com/watch?v=3xDAU5cvi5E&t=12s)