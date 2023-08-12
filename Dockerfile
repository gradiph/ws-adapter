# arguments
ARG CONFIG

# build
FROM node:18.17.0-slim as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# app
FROM node:18.17.0-slim as app
ARG CONFIG
WORKDIR /app
RUN apt-get update && apt-get install tini
RUN chmod +x /usr/bin/tini
COPY package.json .
ENV NODE_ENV production
RUN npm install --omit=dev
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/api-info.txt api-info.txt
RUN echo "$CONFIG" > /app/.ws-adapterrc
USER node
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["npm", "run", "start"]
