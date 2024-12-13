# Stage 1: Build
FROM node:16 AS build

WORKDIR /app

# Copy only package files for caching npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Set environment variables at build time (optional)
ARG API_URL
ENV API_URL=$API_URL

# Stage 2: Runtime
FROM node:16

WORKDIR /app

# Copy built app from the build stage
COPY --from=build /app /app

# Expose the port your app listens on
EXPOSE 4000

# Set runtime environment variables
ENV API_URL=${API_URL}

# Start the application
CMD ["npm", "start"]
