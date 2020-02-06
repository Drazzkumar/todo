FROM node:12-alpine as dev
WORKDIR /app

# Build
FROM node:12-alpine as builder
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM  nginx:alpine as prod
WORKDIR /app/todo
COPY default.conf /etc/nginx/conf.d/

COPY --from=builder /app/build /app/todo
