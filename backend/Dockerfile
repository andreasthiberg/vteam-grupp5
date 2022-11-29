FROM node:18

WORKDIR /server

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . ./

ENTRYPOINT [ "node", "app.js" ]
