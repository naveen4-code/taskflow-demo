FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:22-alpine AS backend
WORKDIR /app
ENV NODE_ENV=production PORT=4000 DATA_DIR=/app/data
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/server.js ./server.js
RUN mkdir -p /app/data
COPY --from=frontend-build /app/frontend/dist ./public
EXPOSE 4000
CMD ["node", "server.js"]
