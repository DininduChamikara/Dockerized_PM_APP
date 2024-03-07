FROM node:21-alpine as builder

WORKDIR /usr/app

# Install some dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

EXPOSE 4012

CMD ["npm", "start"]