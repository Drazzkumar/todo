# STAGE: Development
FROM node:12-alpine AS dev
EXPOSE 8848
WORKDIR /app

#-------prod-----------

# STAGE: Builder
FROM node:12-alpine AS builder
WORKDIR /app
COPY package.json /app/
RUN yarn
COPY . /app/
RUN yarn build

# STAGE: Prod Dependencies Builder
FROM node:12-alpine AS prod-dependencies
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --prod

# STAGE: Run migrations
FROM builder AS migrate
WORKDIR /app
COPY --from=builder /app /app
CMD yarn migrate && yarn seed

# STAGE: Rollback migrations
FROM builder AS migrate-rollback
WORKDIR /app
COPY --from=builder /app /app
CMD yarn rollback

# STAGE: Prod Deploy Ready Image
FROM node:12-alpine AS prod
EXPOSE 8848
WORKDIR /app
COPY public /app/public
COPY --from=builder /app/dist /app/dist
COPY --from=prod-dependencies /app/node_modules /app/node_modules
CMD ["node", "dist/index.js"]
