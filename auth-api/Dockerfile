# Use the latest Golang image as the base image for building the application.
# This image includes Golang and the necessary build tools.
FROM golang:latest

# Set the working directory inside the container to /app
# All subsequent commands will be executed from this directory.
WORKDIR /app

# Copy all Go source files from the current directory on the host to the /app directory in the container
COPY *.go ./

# Set environment variables for the application
# JWT_SECRET: Secret key used for JSON Web Token (JWT) signing and verification
ENV JWT_SECRET=JUANSE
# USERS_API_ADDRESS: Address of the Users API service
ENV USERS_API_ADDRESS=http://127.0.0.1:8083
# AUTH_API_PORT: Port on which the authentication API service will run
ENV AUTH_API_PORT=8000
# ZIPKIN_URL: URL of the Zipkin server for distributed tracing
ENV ZIPKIN_URL=http://zipkin:9411

# Initialize Go modules
# This command is used to create a new Go module, allowing the use of Go modules for dependency management.
RUN export GO111MODULE=on
RUN go mod init github.com/bortizf/microservice-app-example/tree/master/auth-api
RUN go mod tidy

# Build the Go application
# This command compiles the Go application and produces a binary executable.
RUN go build

# Expose the port specified by AUTH_API_PORT
# This makes the port accessible outside the container, allowing communication with the application.
EXPOSE 8000

# Define the command to start the application
# This command will be executed when the container starts.
# It sets the AUTH_API_PORT environment variable and runs the compiled binary executable `auth-api`.
ENTRYPOINT AUTH_API_PORT=8000 ./auth-api
