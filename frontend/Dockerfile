# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (adjust if needed)
EXPOSE 5173

# Define the command to run your app
CMD ["npm", "run", "dev"]