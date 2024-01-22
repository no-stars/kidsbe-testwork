FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install Node Package
# RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN npm install -g ts-node
RUN npm install --legacy-peer-deps
RUN npm install gateway -w common
# RUN npm install gateway -w @kidsbe/common

COPY . .

# Set Env
ENV NODE_ENV development
EXPOSE 3000

# Cmd script
CMD ["ts-node", "./packages/gateway/src/server.ts"]
