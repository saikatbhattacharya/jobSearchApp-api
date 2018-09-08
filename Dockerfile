FROM mhart/alpine-node:8.9.4
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]
