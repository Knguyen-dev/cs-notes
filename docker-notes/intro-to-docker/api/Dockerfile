# Import a parent image/layer used for node apps
# Using "17-alpine" tag for node
# FROM node:17-alpine

FROM node:16-alpine

# Install nodemon in the container; now we can use nodemon 'app.js' for the cmd
RUN npm install -g nodemon 

# Define working directory in the container
# So inside the container, it works in a directory called 'app'
WORKDIR /app

# Copy the package.json file, into the '.' which will be '/app' inside the container
COPY package.json .

RUN npm install

# Copy source files from current directory (Dockerfile location) 
# to the container's working directory
COPY . .


# CMD ["node", "app.js"]

# Run the package.json script container starts
CMD ["npm", "run", "dev"]


EXPOSE 4000

