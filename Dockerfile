FROM node:lts-alpine3.9
WORKDIR /app

COPY . .
RUN npm install && \
    npm install pm2 -g

RUN npm run build

EXPOSE 3040
CMD ["pm2-runtime","build/bin/www.js"]
