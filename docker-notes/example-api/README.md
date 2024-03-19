# Making a docker image
To run this application on our computer, no docker, you'd install the dependencies with 'npm'. This creates a 'node_modules' folder, and we'd use 'npm run dev' or 'node app.js" to run the app. This runs the app on our computer with our version of node. 

## Parent image layer
Each line represents a layer kind of. So doing 
'FROM node:17-alphine', this will get a 'node' image with node version 17 and use the 'alphine' distribution of linux. So this will download from our computer if we have it, else it will download it from dockerhub.

## Source code layer
For our next layer, we want to include our source code. Here we do "COPY . .". Okay so the first dot represents the directory you want to copy your source files from. All of our code is in the current directory at 'app.js' so use '.' to indicate we're copying from the current directory. If our code was in a 'src' folder it'd be "COPY ./src ." The second dot is the path to the image, or where we want the image to be outputted to. So we want the image to be copied or generated to the root directory in this case. A lot of the times, we won't do this because this can clash with other files inside the root directory. We'd typically do something like "COPY . /app" which would copy the source files into a new folder called "app" inside the image. So yeah let's change it to "COPY . /app"

## Dependencies layer
For our third layer we want to include dependnecies the app uses. So to do this, we'll define commands that will install those dependencies. We do "RUN npm i". 

- ISSUE: However the issue is the package.json for the will be copied in the '/app' folder, while this is run in the root folder of the image, it won't see that package.json file. So we need to run this command in the same directory as package.json file, which is in /app

- SOLUTION: Specify a working directory for the container. So add "WORKDIR" to the Dockerfile. We'll place this at the second line, so all instructions after this will use the working directory. As a result, now when a command is run, it will do it from inside the app directory. Now we should fix "COPY . /app" because since that's a relative directory, that will make our source code get copied into /app/app. So change that to "COPY . ." so our source code is copied into "/app" only.


- Wait we just did "WORKDIR /app" so wouldn't "COPY . ." mean copy all form /app to /app? No, the first dot represents the location of the source files on your host machine, relative to the location of the Dockerfile. While the second dot represents the working directory of the image.

## Commands layer
Finally we need a command that will run the node application while it's in the container.


```
RUN node app.js
```
The reason we can't do this is because remember, Dockerfile creates an image, and an image doesn't actually run the application, it just is a blueprint. These commands are running at 'build time', which is when we are creating the image. We're not trying to run our application when making the image, we're just making the image. We want to run the 'node app.js' command when we have the container running our app.

- SOLUTION: We use the "CMD" keyword, which allows us to define commands that will be executed when the container runs. We define the words of the command in an array of double quoted strings. So this command runs "node app.js" which our container starts running.
```
CMD ["node", "app.js"]
```

## Exposinga a port: 
An 'EXPOSE' instruction essentially tells Docker what network port the container is listening to on runtime. This app runs inside the container, so the port is owned by the container as well, container is just the process. So to make requests to the api, you send requests to this container (process) via this port number.

```
EXPOSE 4000
```
Now this is kind of optional. You only need it if you're running images and starting containers using docker desktop. Docker desktop will then use this information to set up 'port mapping', which we'll learn about later on. But if you're using the command-line, this isn't really needed. However you can argue that including it gives you info about which port the app is running in, and it lets us and other developers have extra features on docker desktop.

## Dockerignore
We don't have node_modules, is alright since we're not going to run this app directly on your computer. We're going to run an image to create a container that runs our app for us in an isolated environment. It'll create a node_modules with all dependendencies inside the image, ready to be used when we start a container.

Sometimes a 'node_modules' folder will exist in our project, and so all of those dependencies are there. We'll we don't want to include those as a part of our source files when creating the image as we're downloading those when building the image (Defined in Dockerfile). Some stuff in 'node_modules' may be out of date, and also copying the entire node_modules will make it so our build process takes more time.

So we'll use a dockerignore file, which will ignore copying over all directories or files included there during the image build phase. So when we build this image, it won't copy over anything inside node_modules to the image.


## Building the Docker image:
To build a docker image, you need to provide the name that you want the image to have and the path to the docker file, from your current directory. So here's the command: 
```
docker build -t <image-name> <path-to-dockerfile>
```

Applying this, here we tell docker to build an image with tag "my-node-app" and we do '.' to specify that the location of the docker file that's used to create the image is in the current directory. Of course, remember to have docker running in the background.
```
docker build -t my-node-app .
```
This will build the docker image, and if it's successful, you should see the image appear in the 'images' tag on docker desktop. When clicking on the image (entering docker scout) you'll see more info. You'll see the images involved:
1. "alpine:3": Base image from Alpine Linux dist. Just helps build the OS.
2. node:17-alpine: Another base image, that helps build the OS, but includes the Node.js version 17 installed. Integrates and installs our runtime with Linux OS.
3. myapp-latest: Image that has our application code, dependencies, and the other layers above the parent image.

- Vulnerabilities: Docker scout will show you package vulnerabilities, which are just known security issues/weaknesses in those packages. Attackers can exploit these to compromise the security and stability of your app.

### Exposing Ports in Docker
Before moving on to next topic, this information will be useful. When we talk about a port being 'exposed' in a container, it means that the container's network configs communication via that port from other containers or services. However by default, our host machine isn't able to directly communicate with the docker container via that port.

To make this happen you do 'port mapping' which just means you map the port number in the container to the port number on your machine. Here's the general command to run the image and build a container with port mapping:
```
docker run -p <container_port>:<host_machine_port> <image_name>
```
For example, let's say you have an app running on port 4000 in the container, and you want to be able to go to localhost:4000 on your computer and essentially communicate with your app inside the container. Here we run the image 'my-image-name' to build a container with port mapping:
```
docker run -p 4000:4000 my-image-name
```


## Running Docker Image:
On images tab, click 'run'. Now let's click on optional settings. Decide a name for the container, in this case "myapp1_c" and that c on the end indicates 'container'. 

Inside the container the app is running on port 4000. So the port 4000 is exposed in the container. 
However we can specify a port that we can use to reach this container on To allow us to communicate with it, let's do port mapping. On docker desktop enter 4000 for the port, which maps port 4000 on localhost to port 4000 on the container. Now when going to localhost:4000, it would hit our app. 

```

<!-- Run image and build container, also runs container  -->
docker run -p 4000:4000 --name myapp1_c myapp
```
The '-p 4000:4000' does port mapping. The '--name myapp1_c' indicates the container's name. And 'myapp' is the name of the image we're creating the container from. Now our container should be running which you can verify in docker desktop. However since we did port mapping, we should be able to go to localhost:4000, and get a list of books from our app.

Takeaway: We have our application running inside this container, and we're able to access that running application with our computer. And it's all thanks to port mapping.

Commands for starting and stopping the container do this:
```
<!-- General commands -->
docker start <my-container-name>
docker stop <my-container-name>
```

- NOTE: You can of course make it so port 3500 on localhost maps to port 4000 on the container. So going to localhost:3000 hits your app, but typically we keep the port numbers the same to avoid confusion.


### Docker CLI Commands

```
<!-- Lists out all docker images -->
docker images

<!-- Lists out all docker containers that are currently running -->
docker ps


<!-- Lists all docker containers -->
docker ps -a
```

```
<!-- Building a docker image. -->
docker build -t <image_name> <path_to_dockerfile>
```
- 't': Names the image
```
<!-- Running a docker image to create a new container -->
docker run -p <host_port>:<container_port> --name <container_name> <image_name>
```
-
- '-p': Maps a port from host machine to container
- '--name': Assigns a name to the container
- '-d': You can add a -d flag (detached) to ensure your terminal won't be occupied by the application.

```
<!-- Starting and stopping existing docker containers -->
docker start <container_name>
docker stop <container_name>
```


## Layer Caching
In our image, every line in our docker file represents a layer. We got the parent layer, the layer for setting the working directory of the container, layer for source code/dependencies, etc. 
When building the image, adding each of those layers take time. When we simply changed the parent layer, when we ran the command to create the image, it downloaded the new parent iamge, but it also redid the work for all of those unchanged layers as well.

Now let's say we changed our code in app.js. If you eventually want those changes to be available in a created container, you'll create a new image that has the new changes in your code. When changing the parent layer it took around 8 seconds to build a new image. Now when we changed our code it only took 3 seconds? When docker builds our image, it stores a cache of the image at each stage for every layer. So when before it builds images, it looks for the highest cached layer it can use

For example, in our second build, we changed the code layer, which is the third layer up. So 'COPY' and everything would be changed/rebuilt, but we can use the "WORKDIR" layer since it is before the change. So here docker only has to re-build 5 layers, which means less work and less build time. However, in our first example, we changed the parent image, our foundational layer. There are no layers before that we can use for a cache, so docker builds all of the layers again, which is why it took longer. 

- ISSUE: You may be asking, if only the code is changed, why does it rebuild 'dependencies' and others. Well the image cached at the 'dependencies' layer depends on the code before the change. So we can't use it, even though our app dependencies didn't change. So we want to be able to cache layers such as 'dependencies', so that even if our source code layer is the only layer that changes, we don't have to rebuild the dependencies layer.

- SOLUTION: Simply move 'dependencies' layer lower/before the code layer in dockerfile. By doing this, if source code is the only thing tha changes, we can cache up to 3 layers.

- ISSUE 2: However, we are doing 'npm install', but the package.json is not there yet. package.json is only copied over in 'COPY' layer. So we need to have package.json there before we do npm install.

- SOLUTION 2: Copy over the package.json as a layer, before our 'npm install' (dependencies layer). Now our npm install layer should work perfectly. As a result, if our code layer changes, we may be able to cache up to 4 layers.

- Takeaway: Now creating the image we see we cached up to the 'WORKDIR' layer, which makes sense since the layers after it underwent some changes. Now if you make a change in your code and rebuild the image, you should see we cached up to the 'npm install' (dependencies) layer.


## Deleting Docker Images
Here's the command to delete a docker image. By default you can only delete images that are unused, meaning that aren't any containers created by that image. 
```
docker image rm <image_name>

<!-- Example of deleting multiple images with one command -->
docker image rm <image_name_1> <image_name_2>
```
However you can force docker to delete an image, even if it's in-use. Use the 'f' flag for this.
```
<!-- Either command works -->
docker image rm <image_name> -f
docker image rm <image_name> --force
```
The other way to solve this is to delete the containers that are connected to the image you want to delete. Then once these containers are deleted, the image should now be marked as 'unused', allowing you to delete the image without forcing it.
```
docker container rm <container_name>
```

## How to version our images using tags:
On dockerhub, the tags for our node image indicate the node version nand linux distribution. For example '17-alpine' and '16-alpine' were some tags that indicated Node.js versions 17 and 16, with the linux 'alpine' distrubtion. Another example is '21-alpine3.18', which is a parent image for Node.js version 21 with alpine version 3.18. These tags are just different versions/variations of the same parent image for node. 

### How to create a tag
Create a tag by adding a colon ':' after the image name, and then after that colon you specify some version and linux distribution. As a result you can create multiple versions of your images, that have slight variations.

```
<!-- First let's delete all containers, images, and volumes. Don't worry about volumes, it's covered in a later section -->
docker sysetm prune -a
```
Now let's build an image with a version. So here the tag is 'v1', which indicates the version of myapp.
```
docker build -t myapp:v1 .
```
Now if we want to run a container for a certain version of our 'image' or app, we can do that by specifying the tag. 
```

<!-- Creates and runs a docker container 'myapp_c' with port mapping, based on image 'myapp' version 'v1' -->
docker run --name myapp_c -p 4000:4000 myapp:v1
```