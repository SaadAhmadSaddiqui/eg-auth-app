# How to start

## Without docker

Go to each individual app, copy envs, install packages, and use `npm run dev` to run locally.

1. `cd apps/api && cp .env.example .env && npm i && npm run dev`
2. `cd apps/web && cp .env.example .env && npm i && npm run dev`

**Remember to add `MONGO_URI` in the apps/api/.env**

## With docker

1. `cd apps/api && cp .env.example .env && cd ../..`
2. `cd apps/web && cp .env.docker.example .env.docker && cd ../..`
3. `docker compose build`
4. `docker compose up`
5. View logs with `docker compose logs [web|api] -f`

**Remember to add `MONGO_URI` in the apps/api/.env.docker**
