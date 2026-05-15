FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

WORKDIR /app/apps/web

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"]
