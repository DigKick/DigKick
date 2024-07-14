FROM alpine as builder
RUN apk add npm g++ make py3-pip
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN ls -lsha
RUN npm run build

FROM caddy
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/dig-kick-fe/browser /srv
EXPOSE 80