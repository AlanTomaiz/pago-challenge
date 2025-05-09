FROM node:22-alpine AS builder
WORKDIR /tmp
COPY . .
RUN npm install
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /tmp/package.json /tmp/package-lock.json ./
COPY --from=builder /tmp/dist ./
RUN npm install --only=production
CMD ["node", "server.js"]
