FROM node:14-alpine
LABEL name="DJS Test Suite [v12]"
LABEL version="4.0.1"
LABEL maintainer="Souji <timoqueezle@gmail.com>"
LABEL djs_version="^12.0.0"
ENV TOKEN= \
	PREFIX= \
	OWNER=
WORKDIR /usr/djs-testing/v12
COPY package.json ./
RUN npm i
COPY . .
CMD ["node", "index.js"] 
