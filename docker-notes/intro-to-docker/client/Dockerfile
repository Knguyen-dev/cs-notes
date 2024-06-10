# Step 2: Create a docker file for your application

# Download a parent mage for node version 16, with the latest version of the alpine linux distribution
# Although React isn't a node application, it uses Node for its functionality
FROM node:17-alpine

# Work in the '/app' directory of the image
WORKDIR /app

# Copy our package.json to the app directory and install our dependencies; we do it in this order so that when we change our code, the dependencies layer is cached
COPY package.json .
RUN npm install

# Copy source files from current directory (which is where the dockerfile is) to the '/app' inside the image
COPY . .

# Inform docker that the container listens on a specified network port on runtme. Here we are indicating that the 
# app inside our container will be accessible on the container's port 3000; also its required for docker desktop to help with us with port mapping
EXPOSE 3000

# Run this command when the container starts, which will start our react application
CMD ["npm", "run", "dev"]
