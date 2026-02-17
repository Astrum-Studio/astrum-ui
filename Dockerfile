FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/astrum-ui/package*.json ./packages/astrum-ui/

RUN npm ci

COPY . .

WORKDIR /app/packages/astrum-ui

EXPOSE 3333

CMD ["npm", "run", "storybook"]
