FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable
COPY frontend/pnpm-lock.yaml frontend/package.json ./
RUN pnpm install

COPY frontend ./
RUN pnpm run generate

FROM nginx:alpine
COPY --from=build /app/.output/public /usr/share/nginx/html
EXPOSE 80
