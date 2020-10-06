FROM node:10 as build
ARG NODE_ENV=production
WORKDIR /home/node/app
COPY ./src/ ./
RUN npm install

FROM node:10-alpine as deploy
USER node
WORKDIR /home/node/app
COPY --from=build --chown=node /home/node/app .

CMD [ "npm", "start" ]