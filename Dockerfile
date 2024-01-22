FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV development
EXPOSE 3000

# CMD ["nodemon", "./packages/gateway/src/server.ts"]
