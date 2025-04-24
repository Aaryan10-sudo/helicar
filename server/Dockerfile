FROM node:23

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@11.3.0

COPY . .

RUN chmod -R 755 /app

EXPOSE 3000

CMD ["npm", "start"]
