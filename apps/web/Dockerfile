FROM node:24-alpine AS builder

RUN corepack enable

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm --filter @ccpilot/web build

FROM nginx:alpine

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
