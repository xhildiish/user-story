FROM node:latest AS base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent

#The code below copies the code files and runs them.
FROM  base AS prod

COPY . .
EXPOSE 3000
CMD ["npm","start"]