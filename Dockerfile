FROM node:latest
WORKDIR /cma

COPY package*.json ./
RUN npm install 

COPY startup.sh /cma/startup.sh
RUN chmod +x /cma/startup.sh

COPY . .

CMD ["sh", "-c", "npm run start"]

ENTRYPOINT [ "/cma/startup.sh" ]

EXPOSE 5432