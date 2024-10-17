# Dockerfile for React frontend
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the app
RUN npm run build

# Serve the app using a lightweight server
FROM nginx:alpine

# Copy build files to nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port (80)
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
