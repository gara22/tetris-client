# Step 1: Build the React app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . ./

ENV VITE_SERVER_HOST=MY_APP_SERVER_HOST
ENV VITE_CDN_HOST=MY_APP_CDN_HOST

# Build the React app for production
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Copy build output to Nginx's default static files directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Replace the default Nginx configuration with your own
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
