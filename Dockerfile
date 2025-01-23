FROM node:20-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm i ci

RUN npm install -g @angular/cli

COPY . .

RUN npm run build:production

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /app/dist/front-products-favorite-client-luizalabs/browser /usr/share/nginx/html

EXPOSE 80