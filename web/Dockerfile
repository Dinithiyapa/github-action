# Base image
FROM node:16

# Set the API_HOST environment variable for the container
ENV API_HOST=http://buzbud-api-action:4000

# Set the working directory inside the container
WORKDIR /app

# Copy package files to leverage Docker's caching mechanism
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your application listens on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
