FROM node:14-alpine
LABEL name="DJS Test Suite [master]"
LABEL version="4.0.1"
LABEL maintainer="Souji <timoqueezle@gmail.com>"
LABEL djs_version="#master"
ENV TOKEN= \
	PREFIX= \
	OWNER=
WORKDIR /usr/djs-testing/master
COPY package.json ./
RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps git curl build-base python g++ make \
&& npm i \
&& apk del .build-deps
COPY . .
CMD ["node", "index.js"]
