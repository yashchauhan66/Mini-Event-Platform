FROM node:18-alpine

WORKDIR /app


COPY package*.json ./


RUN npm ci --only=production


COPY . .


RUN mkdir -p uploads


EXPOSE 5000

ENV NODE_ENV=production


HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js


CMD ["npm", "start"]
