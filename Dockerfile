FROM node:9
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node Server.js
EXPOSE 8081
