# apps/web/Dockerfile
FROM node:23-slim

WORKDIR /app

COPY ./apps/web/package*.json ./
RUN npm install

COPY ./apps/web .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
