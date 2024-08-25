#!/bin/bash

# Docker Hub username
DOCKER_HUB_USERNAME="sebastian411"

# Define the list of services to build and push
services=("auth-api" "users-api" "log-message-processor" "todos-api" "frontend")

# Loop through each service
for service in "${services[@]}"; do
  echo "Building Docker image for $service..."

  # Build the Docker image
  docker build -t "$DOCKER_HUB_USERNAME/$service:latest" ./$service
  
  if [ $? -eq 0 ]; then
    echo "Successfully built $service image."

    # Push the Docker image to Docker Hub
    echo "Pushing $service image to Docker Hub..."
    docker push "$DOCKER_HUB_USERNAME/$service:latest"

    if [ $? -eq 0 ]; then
      echo "Successfully pushed $service image to Docker Hub."
    else
      echo "Failed to push $service image to Docker Hub."
      exit 1
    fi

  else
    echo "Failed to build $service image."
    exit 1
  fi
done

echo "All services have been built and pushed successfully."
