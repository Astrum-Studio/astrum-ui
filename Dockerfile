FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/astrum-ui/package*.json ./packages/astrum-ui/

RUN npm ci

COPY . .

WORKDIR /app/packages/astrum-ui

RUN npm run storybook:build

RUN npm install -g serve

EXPOSE 3333

CMD ["serve", "-s", "storybook-static", "-l", "0.0.0.0:3333"]
