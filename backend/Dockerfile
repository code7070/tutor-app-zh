FROM node:18-alpine AS builder
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json yarn.lock ./
RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g && yarn install

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
COPY .tmp ./.tmp
COPY public/uploads ./public/uploads
RUN yarn build

FROM node:18-alpine AS runner
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY --from=builder /opt/node_modules ./node_modules
ENV PATH=/opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY --from=builder /opt/app ./
RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["yarn", "develop"]
