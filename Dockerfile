# Step 1: Use Node.js to build the application
FROM node:18 as builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Build the production bundle
RUN npm run build

# Step 2: Output the bundle to a volume (optional)
# If you don't need to run the app within the container,
# You can copy the `dist` folder to your host.
