# syntax=docker/dockerfile:1

FROM node:24 AS builder

WORKDIR /app

RUN corepack enable

COPY out/json/ .

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts --prod=false

COPY out/full/ .

RUN pnpm --filter @repo/db exec prisma generate
RUN pnpm --filter @repo/db run build
RUN pnpm --filter web run build


FROM node:24 AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]