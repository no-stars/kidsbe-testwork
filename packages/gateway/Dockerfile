# NodeJS Version 16
FROM node:16.18-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./

# Install Node Package
RUN npm install
RUN npm install -g ts-node

# Set Env
ENV NODE_ENV development
EXPOSE 3000

# Cmd script
CMD ["ts-node", "./packages/gateway/src/server.ts"]
