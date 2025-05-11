# Step 1: Base for installing dev dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Step 2: Dev environment with dev dependencies
FROM base AS dev-env
COPY . .
CMD ["npm", "run", "dev"]

# Step 3: Build environment for SSR output
FROM base AS build-env
COPY . .
RUN npm run build

# Step 4: Production environment
FROM node:20-alpine AS prod-env
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build-env /app/build ./build
CMD ["npm", "run", "start"]
