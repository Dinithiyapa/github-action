# Buzbud DevOps Challenge
This repo contains code for a multi-tier application.

## The application overview:

```
web <=> api <=> db
```
## Branch Overview
### 1. main branch
In this branch, the multi-tier application is deployed using Docker Compose.

 - Docker Compose orchestrates the services.
  - Health checks ensure that the **DB** service is running correctly.
  - Scalable **Web** and **API** services to handle increased load.

- **To Deploy**:
  1. Clone the repository.
  2. Run the following command to start the application with multiple instances:
     ```bash
     docker-compose up --scale web=3 --scale api=2
     ```
  3. Access the application through the specified ports for **Web** and **API**.
---

### 2.docker-swarm branch

This branch demonstrates deploying the application in a **Docker Swarm** environment using its native orchestration features for scaling and service management.

  - Docker Swarm automatically handles scaling of services.
  - Health checks ensure the **DB** service is running smoothly.

- **To Deploy**:
  1. Initialize Docker Swarm:
     ```bash
     docker swarm init
     ```
  2. Deploy the stack:
     ```bash
     docker stack deploy -c docker-compose.yml buzbud
     ```
  3. The **Web** and **API** services are available and automatically scaled in the Swarm.

---


### 3. github-actions branch

In this branch, **GitHub Actions** is used for **Continuous Integration and Continuous Deployment (CI/CD)**. This workflow automates building, pushing Docker images, and deploying the application to Docker Swarm.

  - The `first-actions.yml` workflow builds and pushes Docker images for **Web** and **API** services.
  - The workflow automatically deploys the application to Docker Swarm using the `docker stack deploy` command.


- **To Trigger the Workflow**:
  1. Push changes to the **main** branch or create a pull request to the **github-actions** branch.
  2. GitHub Actions will:
     - Build Docker images for both services.
     - Push the images to **Docker Hub**.
     - Deploy the application to **Docker Swarm**.

---
 ## Prerequisites
Before deploying the application, ensure the following tools are installed:

- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Docker Swarm**: [Set up Docker Swarm](https://docs.docker.com/engine/swarm/)
- **Git**: [Install Git](https://git-scm.com/)
- **GitHub Account**: [Create a GitHub account](https://github.com/) (for triggering workflows)

---
## Deployment Details
The deployment configuration can be customized by modifying the `docker-compose.yml` file:

- **Ports**: Adjust the ports for both **Web** and **API** services in the `ports` section.
- **Scaling**: Change the number of instances for each service in the Docker Compose command or Docker Swarm setup.
- **Environment Variables**: Configure environment variables for **Web**, **API**, and **DB** services in the `docker-compose.yml` file.

---

## Accessing the Services
Once the services are up and running, you can access them:

- **Web Service**: Accessible via `http://web.example.com` (or the specified port).
- **API Service**: Accessible via `http://api.example.com` (or the specified port).

## Testing with `curl`

You can test the services using `curl`:

1. **Web Service**:
   ```bash
   curl http://web.example.com
   curl http://api.example.com

