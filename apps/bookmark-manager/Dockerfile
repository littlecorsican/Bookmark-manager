# Build stage
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built assets and node_modules from the builder stage
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
