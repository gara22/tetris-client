FROM node:18.2 as build-stage
WORKDIR /app
COPY package*.json ./
RUN NODE_ENV=development npm i
COPY . .
RUN npm run build
