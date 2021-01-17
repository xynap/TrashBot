FROM --platform=linux/amd64 node:alpine

WORKDIR /TrashBot
COPY . .
RUN npm install --production

USER node
ENV NODE_ENV=production
ENTRYPOINT node server.js
