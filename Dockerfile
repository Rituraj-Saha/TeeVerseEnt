# Step 1: Base for installing deps
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Step 2: Dev environment
FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Step 3: Build environment
FROM base AS build
COPY . .
RUN npm run build

# Step 4: Production environment
FROM node:20-alpine AS prod
WORKDIR /app

# Copy only required files
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build output (client + server)
COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["npm", "run", "start"]
