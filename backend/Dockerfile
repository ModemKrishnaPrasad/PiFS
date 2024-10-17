# Dockerfile for Express backend
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port (5000)
EXPOSE 5000

# Command to run your app
CMD ["node", "index.js"]
