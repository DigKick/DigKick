# Backend

## Docs

- Website: [Link](https://makoeta.github.io/digkickDoc/#operation-send-gameStatus)
- [Local Markdown](./docs/asyncapi.md)

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

Before starting you have to set up a .env files with your MQTT host and credentials.

```dotenv
MQTT_LOGIN_USERNAME=MQTT_USERNAME
MQTT_LOGIN_PASSWORD=MQTT_PASSWORD
MQTT_HOST=MQTT_HOST
DATABASE_FILE_NAME=database
DATABASE_FILE_SUFFIX=db
```

## Generate files from asyncapi.yaml

### Markdown

```bash
asyncapi generate fromTemplate asyncapi.yaml @asyncapi/markdown-template -o docs --force-write
```

### Html

```bash
asyncapi generate fromTemplate asyncapi.yaml @asyncapi/html-template -o docs --force-write
```
