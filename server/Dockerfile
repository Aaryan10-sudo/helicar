FROM node:23

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies (production mode or full)
RUN npm ci

# Optionally update npm globally (if really needed)
RUN npm install -g npm@11.3.0

# Copy app source
COPY . .

# Fix permissions if necessary
RUN chmod -R 755 /app

# Expose port 4000 (change to 3000 if your app actually listens there)
EXPOSE 4000

# Start the app
CMD ["npm", "start"]

