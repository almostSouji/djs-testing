FROM node:12-alpine
LABEL name="DJS Test Suite [>>]"
LABEL version="0.2.0"
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
