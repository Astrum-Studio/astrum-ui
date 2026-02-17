FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/astrum-ui/package*.json ./packages/astrum-ui/

RUN npm ci

COPY . .

WORKDIR /app/packages/astrum-ui

RUN npm install --no-save

RUN npm run storybook:build

RUN npm install -g sirv-cli

EXPOSE 3333

CMD ["sirv", "storybook-static", "--single", "--host", "0.0.0.0", "--port", "3333"]
