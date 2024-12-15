# Buzbud DevOps Challenge
This repository contains the code and configuration for a multi-tier application deployed using Docker and GitHub Actions for CI/CD. The application is structured as a three-tier system:

## The application overview:

```
web <=> api <=> db
```

The deployment uses Dockerfiles for individual service containers, managed via CI/CD workflows.

---

## GitHub Actions CI/CD Pipeline

The CI/CD workflow is defined in `.github/workflows/ci-cd.yml` to automate the following:

1. Simultaneously build Docker images for the `web` and `api` services.
2. Push the images to Docker Hub.
3. Deploy the services to a Linode server using a custom `update.sh` script.

---

## Update Process with `update.sh`

The `update.sh` script runs on the Linode server to deploy the latest Docker images. It performs the following steps:

1. Stops and removes existing containers.
2. Pulls the latest images from Docker Hub.
3. Starts new containers for `web`, `api`, and `db`.

---

## Deployment Instructions

### 1. Set up Secrets in GitHub Actions

Before you deploy, set up the following secrets in your GitHub repository:

- **DOCKER_USERNAME**: Your Docker Hub username.
- **DOCKER_PASSWORD**: Your Docker Hub password.
- **HOST**: The IP address of your Linode server.
- **USERNAME**: The SSH username for your Linode server.
- **PASSWORD**: The SSH password for your Linode server.
- **PORT**: The SSH port for your Linode server (default: 22).

### 2. Verify the Deployment

After deployment, you can verify the services by accessing the following URLs:

- **Web service**: **http://{linode-ip}:3000**
- **API service**: **http://{linode-ip}:4000**

---

## Prerequisites

Before deploying the application, ensure the following tools are installed:

- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Docker Hub**: Sign up for Docker Hub (to store and distribute Docker images).
- **GitHub Account**: [Create a GitHub account](https://github.com/) (for triggering workflows).


---


