# Backend

## Install bun on Mac:

```bash
curl -fsSL https://bun.sh/install | bash
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Setup .env

Before starting you have to setup a .env files with your MQTT host and credentials.

```txt
MQTT_LOGIN_USERNAME=MQTT_USERNAME
MQTT_LOGIN_PASSWORD=MQTT_PASSWORD
MQTT_HOST=MQTT_HOST
```
