# Import a parent image/layer used for node apps
# Using "17-alpine" tag for node
# FROM node:17-alpine


FROM node:16-alpine

# Define working directory in the container
# So inside the container, it works in a directory called 'app'
WORKDIR /app

COPY package.json .

RUN npm install

# Copy source files from current directory (Dockerfile location) 
# to the container's working directory
COPY . .


CMD ["node", "app.js"]

EXPOSE 4000

