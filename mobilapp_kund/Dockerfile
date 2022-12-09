FROM node:16

COPY package*.json ./

WORKDIR /mobilapp_kund

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

RUN npm install && npm install -g expo-cli
CMD ["npx", "expo", "start"]
