# Notes on node and docker
So here we're going to be going more in depth on outlining how to setup docker when working with node. So we're going to be looking at how to setup in development and production 'workflows'. I think it's going to be the idea of running and seeing the behavior of our app, through our running containers, rather than running them on our local machine, but I could be wrong. Also it's highly recommended that you already have gone through the intro-docker tutorial first, and you know the basics of images and how containers work. We're going to be going through everything step by step so that you can use this as a reference in the future. 

## Project setup
```
npm i express
```

## Create the docker file then build the image
Now our application is running on port 3000 INSIDE our container. Docker container has its own network stuff and is isolated, so in order for the outside world, our machine in this case, to communicate with it, we need to do port mapping. It goes like this 'Direct all traffic from port 3000 on our host computer to traffic from port 3000 on the container'.
```<!-- Create image -->
docker build -t node-app-image .

<!-- Create and run container in detached mode (your terminal is free)-->
docker run -p 3000:3000 -d --name node-app node-app-image

<!-- Opens a bash script for our container, here we can see the file directory for our container -->
docker exec -it <container-name> bash
```

## Docker ignore file
We don't need the 'Dockerfile' in our container, it's used for creating containers only. We also don't want secrets like '.env' being in the container. Lastly we don't need 'node_modules' in our folder, we're already copying our package.json and doing npm install, which would create a node_modules inside the container. We also want to move away from developing on our local machine and turn towards developing with containers, so that further emphasizes things. So moving forward we won't have a node_modules on our local machine.

## Syncing source code with bind mounts
Everytime we change our code, we'd have to rebuild the image so the image has our new code. And then we can create a container that has our new code. This is not the optimal way to do things, so we'll setup volumes, more specifically a 'bind mount' volume. Essentially everytime a folder or file on the local machine changes, that file will change in the container as well. Instead of typing in the entire absolute path you can use variables:

- Use nodemon script, so that every time container's folders change, our express server restarts.
- Create anonymous volume so that if we delete the node_modules from our machine, it isn't replicated in the container
```
docker run -v ${pwd}:/app -v /app/node_modules -p 3000:3000 -d --name node-app-c node-app-image
```
'If we already use bind mounts, do we really need `COPY . ./``?' Yes, our bind mounts are only for the development process. In production we aren't using bindmounts since we aren't changing our code in production, and so we completely rely on the copy to send our code over.

One last consideration, volumes are a two way street, so a file created in the container will also create that file on your local machine. In most cases youprobably don't want your application messing with your source code like this. So make your bind mount read-only, which just means your container will be able to read files (get code), but it won't be able to touch or create any files. So add the suffix ':ro' at the end.
```
docker run -v ${pwd}:/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app-c node-app-image
```


## Using environment variables
Create file to store all of your environment variables. Added rm flag to remove container when exited. 
```
docker run -v ${pwd}:/app:ro -v /app/node_modules --rm --env-file='./.env' -p 3000:3000 -d --name node-app-c node-app-image
```

## Docker Compose, Handling long commands, and multiple apps
In a real situation we're going to have multiple containers. Either frontend, backend, redis, database, elastic search, etc. Everytime you'll have to run and remember 5 or6 docker commands for development and production. Let's use docker compose, which automates this process. We just create one 'docker-compose.yaml' that makes it easy to input a docker file and enter the configurations for the containers.
```
<!-- Run images in detached mode -->
docker-compose up -d

<!-- Stop and remove all containers we made, and their anonymous volumes -->
docker-compose down -v
```
Our image name is <project-directory>-<service-name>. However, on rebuilds of images, docker-compose first looks for any exist images that match the name. So if it's seeing it has to build a 'node-docker-node-app' image, it first sees if that image is already stored/created. If so then it uses that old image. EVEN in cases where you changed the dockerfile for 'node-app', which means a new image, when you do `docker-compose up` it will look for an existing image with that name and take it. So as a result docker-compose is using a stale image.

This behavior from docker can be useful, when you're just needing to run the same image a couple of times. However when you're making changes to images, this is pretty bad since you're not rebuilding tehm. Docker compose is pretty dumb, it doesn't know when to rebuild an image, or use an old cached image. So to rebuild your images, add the `--build` flag.
```
docker-compose up -d --build
```

- NOTE: Spacing matters in a .yaml matter, so if your spacing is inconsistent, then things will break.



## Setting up dockercompose for both production and development
Your production and development environments may run on different ports, have different environment variables, etc. The good thing is that you can have dockerfiles for production and development, and also docker-compose.yaml files for either as well. In these notes we're going to make it so that we'll have one dockerfile for both production and development. We're doing this because it's a little more complex, and also the alternative of having 2 dockerfiles is pretty simple to do. Just name the files like 'dockerfile' and 'dockerfile.dev', where you use the former in your production docker-compose whlist the latter in your developer docker-compose. 

In either case we're going to have multiple docker-compose.yaml files.

1. docker-compose.yaml: Going to have any configurations that are shared by both environments. The other files will take or 'inherit' from this one. In most projects you'll have a lot of containers, and you'll see that the configurations for a lot of your containers may have a lot of common setups. So instead of copying stuff over, we can just have one parent docker-compose.yaml file that distributes those shared configs.
2. docker-compose.dev.yaml: For running images in development environment
3. docker-compose.prod.yaml: For running it in production

```
<!-- If we want to run our images in development, we first indicate the parent docker compose file with the shared configs. Then we indicate the respective docker-compose file so we'll use the .dev one. In this snippet we do exactly just that, and run it in detached mode -->
docker-compose -f docker-compose-yaml -f docker-compose.dev.yaml up -d

<!-- If you want to run images in production. It's the same idea, declare the base file first, and then the production file -->
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d

<!-- Close all containers and remove any volumes any created -->
docker-compose down -v
```
Let's review. In our development build, rather than running the applications on your host machines, we'll use containers to see our app. See how we don't have a node_modules folder, because we don't need one on our host computer, it's being created in the container. When we're running our development containers, when we make changes to our code we should be able to see those changes applied. This is due to how we've done volumes and then nodemon restarting the server based on those file changes. Now in our production build, if we want to see changes, we must rebuild our production image with `docker-compose -f docker-cmpoose.yaml -f docker-compose.dev.yaml up -d --build`. Then our changes will show. 

#### Handling developer dependencies
One last thing is that we want to make sure that our production image, doesn't download any developer dependencies. We don't want extra software bloating our application. To do thi, we only need to do a bash script inside our dockerfile.

```
<!-- Put this logic inside our dockerfile -->
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi 
```
However now we have to pass the 'NODE_ENV" variable as an argument when building our image. This can be done in the child docker-compose.yaml files.

Now let's verify if things worked: 
```
<!-- Run the images; rebuild them since we've just made changes to them. -->
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build;

<!-- Inspect our development container to see if it has both dev and prod dependencies -->
docker exec -it node-docker-node-app-1 bash

<!-- Check the directories -->
cd node_modules
ls; see if the dependencies are correct
```

- NOTE: You'll notice that when running your development image, all of your files, even the ones you thought you included in your .dockerignore are included. Whilst in your production containers, you see that your dockerignore did its job at excluding files. This is because we used volumes and that mapped out our entire directory, so yeah that's normal and don't worry about it.



# Credits:
1. [Docker + Node/Express tutorial](https://www.youtube.com/watch?v=gm_L69NHuHM&t=2963s)