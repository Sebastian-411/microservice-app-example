# Stage 1: Build the application using Maven

# Use Maven 3.6.3 with JDK 8 on a slim image for a minimal build environment.
FROM maven:3.6.3-jdk-8-slim AS stage1

# Set the working directory in the container to /home/app
WORKDIR /home/app

# Copy the entire contents of the current directory (project source code) into /home/app in the container
COPY . /home/app/

# Execute Maven to clean and package the application. The artifact will be created in the target directory.
RUN mvn -f /home/app/pom.xml clean package

# Stage 2: Create the runtime image with the packaged application

# Use OpenJDK 8 on an Alpine Linux image for a minimal runtime environment.
FROM openjdk:8-jdk-alpine

# Set environment variables for the application.
# JWT_SECRET is used for JWT authentication.
ENV JWT_SECRET=JUANSE
# SERVER_PORT specifies the port on which the server will run.
ENV SERVER_PORT=8083
# ZIPKIN_URL is the URL of the Zipkin server used for distributed tracing.
ENV ZIPKIN_URL=http://zipkin:9411

# Expose the server port specified by SERVER_PORT environment variable.
EXPOSE ${SERVER_PORT}

# Also expose port 8083 explicitly for compatibility.
EXPOSE 8083

# Copy the JAR file from the build stage into the runtime image.
# The JAR file is located in /home/app/target/ from the build stage.
COPY --from=stage1 /home/app/target/users-api-0.0.1-SNAPSHOT.jar users-api-0.0.1-SNAPSHOT.jar

# Define the command to run the application. It starts the JAR file using the Java runtime.
ENTRYPOINT ["sh", "-c", "java -jar users-api-0.0.1-SNAPSHOT.jar"]
