FROM node:18

WORKDIR /server

COPY package.json ./

RUN npm install

COPY . ./

ENTRYPOINT [ "node", "app.js" ]
