FROM node:24-alpine
WORKDIR /app
RUN corepack enable

COPY . .

RUN rm -rf node_modules apps/*/node_modules packages/*/node_modules

RUN pnpm install

WORKDIR /app/apps/express
EXPOSE 3000

CMD ["pnpm", "start"]