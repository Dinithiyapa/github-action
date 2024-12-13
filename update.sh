#!/bin/bash

# Stop and remove the currently running containers
docker stop buzbud-web-action buzbud-api-action buzbud-db-action 2>/dev/null
docker rm buzbud-web-action buzbud-api-action buzbud-db-action 2>/dev/null

# Pull the latest Docker images
echo "Pulling the latest images..."
docker pull yapadinithi/buzbud-web-action:v1.0.0
docker pull yapadinithi/buzbud-api-action:v1.0.0
docker pull postgres:latest

# Run the database container
echo "Starting the database container..."
docker run -d \
  -p 5432:5432 \
  --name buzbud-db-action \
  -e POSTGRES_USER=user1 \
  -e POSTGRES_PASSWORD=password1 \
  -e POSTGRES_DB=busbud_db \
  postgres:latest

# Allow time for the database to initialize
echo "Waiting for the database to initialize..."
sleep 10

# Run the API container
echo "Starting the API container..."
docker run -d \
  -p 4000:4000 \
  --name buzbud-api-action \
  --env API_DB=postgres://user1:password1@buzbud-db-action:5432/busbud_db \
  --env API_URL=http://buzbud-api-action:4000 \
  --link buzbud-db-action:buzbud-db-action \
  yapadinithi/buzbud-api-action:v1.0.0

# Run the web container
echo "Starting the web container..."
docker run -d \
  -p 3000:3000 \
  --name buzbud-web-action \
  --env API_URL=http://http://172.235.1.190:4000 \
  --link buzbud-api-action:buzbud-api-action \
  yapadinithi/buzbud-web-action:v1.0.0

# Display running containers
echo "The following containers are running:"
docker ps
