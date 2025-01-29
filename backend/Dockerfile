FROM node:20-alpine

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /opt/
COPY package.json pnpm-lock.yaml ./
RUN npm install -g node-gyp
RUN pnpm config set fetch-retry-maxtimeout 600000 -g && pnpm install

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ["pnpm", "run", "build"]
EXPOSE 1337
CMD ["pnpm", "run", "develop"]
