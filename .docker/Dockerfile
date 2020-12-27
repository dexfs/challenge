FROM node:14.15.3-slim

WORKDIR /var/www/app

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
