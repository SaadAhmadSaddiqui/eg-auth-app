# apps/api/Dockerfile
FROM node:23-slim

WORKDIR /app

COPY ./apps/api/package*.json ./
RUN npm install

COPY ./apps/api .

RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "start:prod"]
