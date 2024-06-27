FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY src ./
COPY tsconfig.json ./

RUN bun install
ENTRYPOINT [ "bun", "run", "app.ts" ]