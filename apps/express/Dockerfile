FROM node:24-alpine
WORKDIR /app

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/express/package.json ./apps/express/
COPY packages/domain/package.json ./packages/domain/

RUN pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/apps/express
EXPOSE 3000

CMD ["pnpm", "start"]