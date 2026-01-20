# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# ---------- Stage 2: Production ----------
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app /app

# create logs directory
RUN mkdir -p logs

EXPOSE 3000

# healthcheck for /api/demo
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/demo || exit 1

CMD ["node", "server.js"]
