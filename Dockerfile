FROM node:20-alpine

WORKDIR /app

# Install deps first for better layer caching
COPY package.json ./
RUN npm install --omit=dev

# Copy source
COPY src ./src

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["node", "src/server.js"]
