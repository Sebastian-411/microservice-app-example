# Local Deployment Report of Microservices 🚀

## Introduction

Welcome to the Local Deployment Report for our microservices project. This document provides a comprehensive guide on how to locally deploy a set of microservices, including technologies used, setup instructions, and solutions to common issues encountered during the deployment process. The primary goal of this project is to build a CRUD application for managing a to-do list.

## Project Overview

### Microservices Architecture

This project consists of several microservices, each serving a distinct purpose and built with different technologies:

1. **User API**:
   - **Technology**: Spring Boot (Java)
   - **Functionality**: Manages user profiles. Provides endpoints to fetch user details but does not yet support full CRUD operations.

2. **Authentication API**:
   - **Technology**: Go
   - **Functionality**: Handles user authentication and JWT token generation. Ensures that only authenticated users can access protected resources.

3. **TODOs API**:
   - **Technology**: NodeJS
   - **Functionality**: Provides CRUD operations for managing to-do list items. Logs create and delete operations to a Redis queue for asynchronous processing.

4. **Log Message Processor**:
   - **Technology**: Python
   - **Functionality**: Processes messages from a Redis queue and outputs them. Used for handling log events from the TODOs API.

5. **Frontend**:
   - **Technology**: Vue.js
   - **Functionality**: User interface for interacting with the microservices. Allows users to manage tasks, view profiles, and authenticate.

6. **Monitoring with Prometheus and Grafana**:
   - **Prometheus**: Collects and stores metrics from the microservices.
   - **Grafana**: Provides visualization of metrics collected by Prometheus.

   ![Architecture Diagram](/arch-img/Microservices.png)
   
   [View Azure Diagram](arch-img/azure-diagram.pdf)
   
   ![Deploy Diagram (C4 - Context)](/arch-img/c4-diagram.png)

## Setup Instructions

### Initial Strategy

1. **Fork and Clone the Repository**:
   - Fork the repository to your personal GitHub account.
   - Clone the repository to your local machine.

2. **Review Microservices**:
   - Explore each microservice directory and review the README files to understand their requirements and operational details.

3. **Run Services Locally**:
   - Attempt to run each microservice individually to identify any compatibility issues.

### Docker Implementation

1. **Creating Dockerfiles**:
   - Develop Dockerfiles for each microservice to package them with their dependencies.

2. **Deploying Services**:
   - Use Docker containers to run microservices. Implemented Zipkin for tracing service calls.

   ![Zipkin Integration](/evidence-img/image4.png)

### Automation with Docker Compose

1. **Configure Docker Compose**:
   - Set up a `docker-compose.yml` file to define and manage all services and their dependencies.

2. **Optimize Configuration**:
   - Integrated Redis and Zipkin directly into Docker Compose to streamline deployment.

   ![Docker Compose Configuration](/evidence-img/image2.png)

   #### Prometheus
   ![Prometheus Dashboard](/evidence-img/image5.png)

   #### Grafana
   - **Login**: ![Grafana Login](/evidence-img/image6.png)
   - **Adding Prometheus**: ![Add Prometheus](/evidence-img/image7.png)
   - **Metrics**: ![Grafana Metrics](/evidence-img/image8.png)
   - **Query Execution**: ![Query Execution](/evidence-img/image9.png)

## Running Locally

1. **Build and Run Services**:
   ```bash
   docker-compose up --build
   ```

2. **Stop Services**:
   ```bash
   docker-compose down
   ```

3. **Remove Containers and Images**:
   ```bash
   docker-compose down --rmi all
   ```

4. **Access the Application**:
   - **URL**: `http://localhost:8000`

5. **Login Credentials**:
   - **Administrator**:
     - **Username**: `admin`
     - **Password**: `admin`
   - **User**:
     - **Username**: `john`
     - **Password**: `foo`

## Pushing Images to Docker Registry

1. **Log in to Docker Registry**:
   ```bash
   docker login
   ```

2. **Tag the Image**:
   ```bash
   docker tag <image-name>:<tag> <dockerhub-username>/<repository-name>:<tag>
   ```

3. **Push the Image**:
   ```bash
   docker push <dockerhub-username>/<repository-name>:<tag>
   ```

   - Use the `run.sh` script to push all services.

## Additional Resources

- **User API**: [Repository Link](https://hub.docker.com/repository/docker/sebastian411/users-api)
- **Authentication API**: [Repository Link](https://hub.docker.com/repository/docker/sebastian411/auth-api)
- **TODOs API**: [Repository Link](https://hub.docker.com/repository/docker/sebastian411/todos-api)
- **Log Message Processor**: [Repository Link](https://hub.docker.com/repository/docker/sebastian411/log-message-processor)
- **Frontend**: [Repository Link](https://hub.docker.com/repository/docker/sebastian411/frontend)
- **Prometheus**: [Documentation Link](https://prometheus.io/docs/introduction/overview/)
- **Grafana**: [Documentation Link](https://grafana.com/docs/grafana/latest/)

## Want to See How I Solved the Repo?

Check out my detailed analysis [here](analysis.md).

