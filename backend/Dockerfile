FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY src ./
COPY tsconfig.json ./


ENTRYPOINT [ "bun", "run", "app.ts" ]