FROM node:14-alpine
LABEL name="DJS Test Suite [shard]"
LABEL version="4.0.0"
LABEL maintainer="Souji <timoqueezle@gmail.com>"
LABEL djs_version="^12.0.0"
ENV TOKEN= \
	PREFIX= \
	OWNER=
WORKDIR /usr/djs-testing/shard
COPY package.json ./
RUN npm i
COPY . .
CMD ["node", "index.js"]
