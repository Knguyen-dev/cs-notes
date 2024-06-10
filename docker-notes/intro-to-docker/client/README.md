# How to dockerize a react app


It's literally 3 easy steps:
1. Create a '.dockerignore' file so that we can exclude adding some things when creating the image. In this case we exclude the 'node_modules' directory.
2. Create a 'Dockerfile' that builds the image for your react application
3. Finally update the docker-compose.yaml in your root directory. Add the react application as a service and give the information to the docker-compose file to build the image for the react application, and run the container created from it.


And then finally once everything is setup you should be able to do `docker compose up` to build the images and run their containers.