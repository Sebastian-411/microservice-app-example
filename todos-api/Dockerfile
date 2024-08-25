# Use Node.js 8.17.0 as the base image for building the application.
# This image includes Node.js and npm, which are necessary for running the application.
FROM node:8.17.0

# Set the working directory inside the container to /app
# All subsequent commands will be run from this directory.
WORKDIR /app

# Copy the contents of the current directory (the application's source code) into the /app directory in the container
COPY . .

# Install the Node.js dependencies specified in package.json
# This command reads the package.json file and installs the necessary npm packages.
RUN npm install

# Set environment variables for the application
# TODO_API_PORT: Port on which the TODO API service will run
ENV TODO_API_PORT=8082
# JWT_SECRET: Secret key used for JWT authentication
ENV JWT_SECRET=JUANSE
# REDIS_HOST: IP address of the Redis server
ENV REDIS_HOST=127.0.0.1
# REDIS_PORT: Port on which the Redis server is running
ENV REDIS_PORT=6379
# REDIS_CHANNEL: Channel name used for Redis pub/sub messaging
ENV REDIS_CHANNEL=log_channel
# ZIPKIN_URL: URL of the Zipkin server for distributed tracing
ENV ZIPKIN_URL=http://127.0.0.1:9411

# Expose the port specified by the TODO_API_PORT environment variable
# This makes the port accessible outside the container.
EXPOSE ${TODO_API_PORT}

# Define the command to start the application
# This command will be executed when the container is started.
# It runs the `npm start` script, which is defined in package.json.
CMD ["npm", "start"]
