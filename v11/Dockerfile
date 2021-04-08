FROM node:14-alpine
LABEL name="DJS Test Suite [v11]"
LABEL version="4.0.1"
LABEL maintainer="Souji <timoqueezle@gmail.com>"
LABEL djs_version="^11.6.1"
ENV TOKEN= \
	PREFIX= \
	OWNER=
WORKDIR /usr/djs-testing/v11
COPY package.json ./
RUN npm i
COPY . .
CMD ["node", "index.js"]
