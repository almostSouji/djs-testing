FROM node:14-alpine
LABEL name="DJS Test Suite [next]"
LABEL version="4.0.1"
LABEL maintainer="Souji <timoqueezle@gmail.com>"
LABEL djs_version="@next"
ENV TOKEN= \
	PREFIX= \
	OWNER=
WORKDIR /usr/djs-testing/next
COPY package.json ./
RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps git curl build-base python g++ make \
&& npm i \
&& apk del .build-deps
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
