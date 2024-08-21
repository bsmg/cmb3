FROM node:latest
WORKDIR /cma

COPY package*.json ./
RUN npm install 

COPY . .

CMD [ "npm", "run", "start" ]