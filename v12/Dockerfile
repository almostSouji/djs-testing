FROM node:12-alpine
LABEL name="DJS Test Suite [dev]"
LABEL version="1.0.0"
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
