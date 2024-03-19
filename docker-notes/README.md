# Docker notes 

## What is Docker:
Docker is a platform that helps us create and run 'containers', which are isolated environments that 'contain' our code and everything it needs to run perfectly. So you can have a container for a node app, react app, etc. Docker is a tool for managing these containers.

## How is Docker beneficial?
Imagine you have a node app that runs on a specific Node.js version and you want your teammates to be able to run it. Teammates would need to download dependencies, configure environemnt variables, etc. This is a lot of work just to run one app. Docker simplifies the process of sharing and running applications by packaging them in containers. These containers include all the necessary dependencies and configurations, ensuring consistent behavior across different environments. This eliminates the need for teammates to set up complex development environments, saving time and reducing potential issues.

## Containers vs Virtual Machines:
Virtual machines can solve the same problems that containers solve, but sometimes containers can be better. However, there's no hard-fast rule because there will be times where you'll use a VM over a container, so there are uses for both.

1. Virtual Machines: Runs its own operating system, which can make your system performance slower.
2. Containers: Shares the resources from the host's operating system, which makes them typically quicker and more light-weight. Now they do have a slimmed-down version of an operating system, but they still use the host machine's kernel under the hood. 

## How to download Docker:
On windows we download 'Docker Desktop', whilst on Linux you can use the docker desktop app or the engine directly.
1. First download docker desktop: [Docker Download Site](https://www.docker.com/get-started/)
2. Now we need WSL (Windows Subsystem for Linux). And set it to WSL2. For WSL2 installation/setup refer to this [link](https://replit.com/@knguyensky/redis-tutorial#README.md)
3. At this point you should have probably Ubuntu and WSL2 on your computer. Now open docker desktop and register an account. You're all done at this point, but now whenever you're using Docker, you need to make sure the docker desktop app is running.


## Images and Containers simplified:
- An image is a blueprint for a 'container', and it stores anything the application needs to run. It stores the following things, but doesn't run them:
1. runtime environment
2. The app's code
3. Any dependencies that the app needs
4. Extra configs such as environment variables
5. Commands
Images are read-only/immutable, so once created you can't change it. If you want to change things, you'd have to create another image with your change. 

- A container is the runnable instance of an image. So when you run the image, it will create a container which is a process that runs our application exactly how it's outlined in our image (blueprint).

A container is an isolated process, so it works independently of any other process on your computer. It doesn't need other processes to run in order for it to work because all it needs is inside the container itself.

- An example: I can make an image (blueprint) for my application. I got the node version, source code and dependencies. Now that I have my blueprint of what the program needs to work, I can use this image and create a container, which is a process that runs my application. So my 'image/blueprint' can create a working instance of my program. So I can share this image with my teammates. They'll use this image to create their own containers, which are just processes that are running my program, but this time on their machines. And there we go, we got everyone to run my program, and they didn't need to do any setup or install things. All they needed was the image and docker installed.

## How are images made & Parent Images:
An image is composed of layers, with each layer building upon and using the tools in the previous layer. So the order of the layers matter. Here are the typical layers explained starting from the lowest layer, the 'parent image':

1. Parent Image: Includes the operating system and runtime environment for the container we want to make/run. For example, having a particular linux distribution (OS), and a particular node version (runtime environment). This layer is an image itself, so we're basically creating a new image on top of it.
2. Source code: Our program's code.
3. Dependencies: Dependencies for our program.
4. Run commands: Commands to run the program.



## Docker Hub: 
An online site that contains a bunch of pre-made images that we can use as the parent layer for our own images. So instead of creating a parent image ourselves, we can find and download popular/widely used parent images here.

For example, let's say you wanted to create an image for a node app. Well the first thing we need is a parent image, so we look up 'node' on docker hub. Here we can find the official image. It shows a code block, which indicates how we can download the image, which is called 'pulling' in docker. So we do that by typing this command in the terminal:
```
docker pull node
```
Scrolling down you'll see 'supported tags', which are different variations of the node image that we can use. These specify different versions of node, and also different linux distributions. For example, "21-alpine3.18" indicates node version 21, with a linux dist. called 'alphine' in its version of 3.18. Also if this isn't already obvious, when making images, we should always specify the version of node, or the runtime, that we want to avoid letting docker just use the latest verison. Because the latest version could potentially have conflicts with what we had previously, etc.


### Downloading an Image and running it
- Download the node image by running this in the terminal. It doesn't matter the location, docker will put it somewhere special. In this example since we didn't specify a version of the NodeJS runtime, docker creates the image with the latest version of node, indicated by 'Using default tag: latest'
```
docker pull node; 
```
Now going to our docker desktop, we see our newly downloaded image in our 'images' tab. The tag should say 'latest', meaning it includes the latest version of NodeJS. Now this is an image, a parent image, but still an image meaning we can 'run' it to create a container. In this case, the container will have a linux environment and node installed, and it would run that process. 

```
docker run node
```
This probably exited immediately. Well that's because we didn't add any extra commands, our node image likely defaulted and just ran node. This command runs opens an interactive shell (bash) inside the container. Allowing us to mess with a node shell. Then when we're done we can pause it using docker desktop. Congrats, we now know how to run images, and mess with containers.
```
docker run -it node bash
echo "hello world" // prints hello world
```

## Dockerfiles and how to create our own docker images:
So far we've only downloaded images, our parent images. To make an image, we use a dockerfile. The dockerfile will contain set of instructions to create the image. It will list out all of these different layers, and instructions to create those layers. Let's look in our example-api to get more familiar with this

# Credits:
1. [Docker Crash Courses (Net Ninja)](https://youtu.be/31ieHmcTUOk?si=HuiGOuP-odYcf5ZA)
2. [Docker Beginner to Pro](https://youtu.be/RqTEHSBrYFw?si=u3DAIlbRJULxxlSw)
- The second one is optional, if you ever want to get more knowledgeable.