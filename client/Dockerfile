FROM node:10-alpine as build
RUN npm i -g webpack webpack-cli webpack-dev-server
WORKDIR /home/node/app
COPY ./src .
RUN yarn install
RUN yarn build

FROM nginx:alpine as deploy
COPY nginx_default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/app/build/. /usr/share/nginx/html
