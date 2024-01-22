FROM node:16.18-buster-slim

COPY . ./app

WORKDIR /app

RUN npm install -g ts-node
RUN npm install --legacy-peer-deps

ENV NODE_ENV development
EXPOSE 3002

CMD ["npm", "run", "start"]
