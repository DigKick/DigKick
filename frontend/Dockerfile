FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/dig-kick-fe/browser /srv
EXPOSE 80