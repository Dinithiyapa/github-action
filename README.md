# Buzbud DevOps Challenge
This repository contains the code and configuration for a multi-tier application deployed using Docker and GitHub Actions for CI/CD. The application is structured as a three-tier system:

## The application overview:

```
web <=> api <=> db
```
The deployment uses Dockerfiles for individual service containers, managed via CI/CD workflows.
## GitHub Actions CI/CD Pipeline
The CI/CD workflow is defined in .github/workflows/ci-cd.yml to automate the following:

1.Build Docker images for web and api.
2.Push the images to Docker Hub.
3.Deploy the services to a Linode server using a custom update.sh script.


---

### Update Process with update.sh

The update.sh script runs on the Linode server to deploy the latest Docker images. It:

Stops and removes existing containers.
Pulls the latest images from Docker Hub.
Starts new containers for web, api, and db.

This branch demonstrates deploying the application in a **Docker Swarm** environment using its native orchestration features for scaling and service management.

  - Docker Swarm automatically handles scaling of services.
  - Health checks ensure the **DB** service is running smoothly.

- **To Deploy**:
  - Set up Secrets in GitHub Actions:
          DOCKER_USERNAME: Your Docker Hub username.
          DOCKER_PASSWORD: Your Docker Hub password.
          HOST: The IP address of your Linode server.
          USERNAME: The SSH username for your Linode server.
          PASSWORD: The SSH password for your Linode server.
          PORT: The SSH port for your Linode server (default: 22).
    
   - Verify the Deployment:
          Web service: http://<linode-ip>:3000
          API service: http://<linode-ip>:4000
  

 ## Prerequisites
Before deploying the application, ensure the following tools are installed:

- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Docker Hub**: Sign up for Docker Hub (to store and distribute Docker images).
- **GitHub Account**: [Create a GitHub account](https://github.com/) (for triggering workflows)

---


1. **Web Service**:
   ```bash
   curl http://web.example.com
   curl http://api.example.com

