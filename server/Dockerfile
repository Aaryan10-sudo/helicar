FROM node:23

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install npm at the desired version (optional, but you have it)
RUN npm install -g npm@11.3.0

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

RUN chmod -R 755 /app

EXPOSE 4000

CMD ["npm", "start"]