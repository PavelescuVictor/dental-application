FROM node:lts-alpine
WORKDIR /dentalapp/src/app
COPY dentalapp-frontend/package*.json ./
RUN ls -l
RUN npm install
COPY dentalapp-frontend ./
RUN ls -l
RUN npm run build
COPY /dentalapp-frontend/nodeServer/nodeServer.js dist/nodeServer.js
WORKDIR /dentalapp/src/app/dist
EXPOSE 8080
CMD ["node", "nodeServer.js"]