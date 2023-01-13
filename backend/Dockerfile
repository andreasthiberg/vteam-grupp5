FROM node:18

COPY package*.json ./

WORKDIR /backend    

RUN npm install --legacy-peer-deps

ENTRYPOINT [ "node", "app.js" ]