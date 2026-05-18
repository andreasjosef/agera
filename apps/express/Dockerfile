FROM node:24-alpine
WORKDIR /app

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

COPY packages/ ./packages/
COPY apps/express/package.json ./apps/express/
COPY packages/auth-betterauth/package.json ./packages/auth-betterauth/

RUN pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/apps/express
EXPOSE 3000

CMD ["node", "src/index.ts"]