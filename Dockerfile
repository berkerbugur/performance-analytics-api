FROM node:12.21.0-alpine
RUN mkdir -p /usr/src/analytic-api
WORKDIR /usr/src/analytic-api
COPY package.json ./
RUN npm install
COPY . ./
CMD ["node", "server.js"]