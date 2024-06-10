# Docker Compose 

The commands for running an image can get pretty long and typing that stuff out is hard work sometimes. Docker compose can help us out in this regard. 

## What is Docker compose?
A tool that gives us the ability to create a 'Docker compose' file, which will contain the configurations of any amount of containers we want to have.

So this single docker compose file will be all of the container names, port mappings, volumes, etc. As a result we don't have to type out and run our scripts to run our containers everytime, all of our container configurations can be organized in this file. A good use for this could be the idea that maybe you'd have containers for running for your frontend, backend, database, redis, etc. Run all of the different processes for your project.

## How to setup
Create a docker-compose.yaml file. With this file, once we 'execute' it it will look at each 'service' and first it will build their images. Then each image will be run so we create running containers. Now switch to the directory where your dockercompose.yaml file is and type this command in the terminal:
```
docker compose up
```

And now your images should be built and containers running. And the biggest difference was that with docker compose, you no longer have to write those long commands, but rather just one simple command. And the more services you have, the more images that you'll need to build and run, and thus the more time you save from typing out commands.


## Stopping the containers
```
<!-- Stops and deletes containers, but our images and volumes are still good-->
docker compose down

<!-- Deletes all containers, images, and volumes -->
docker compose down --rmi all -v
```