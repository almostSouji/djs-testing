FROM node:14-alpine
LABEL name="DJS Test Suite [dev]"
LABEL version="5.0.0"
LABEL maintainer="Souji <timoqueezle@gmail.com>"
LABEL djs_version="@dev"
ENV TOKEN= \
	PREFIX= \
	OWNER=
WORKDIR /usr/djs-testing/dev
COPY package.json ./
RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps git curl build-base python g++ make \
&& npm i \
&& apk del .build-deps
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
