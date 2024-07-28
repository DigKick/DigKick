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
npm run start:dev
```

## Setup application.yaml

Before starting you have to set up a .yaml file in the resource directory.

### Example

```yaml
digkick:
  banner: true # optional

mqtt:
  login:
    username: test
    password: test
  host: localhost

db:
  source:
    database:
      name: database
      suffix: db

player:
  name:
    restrictions:
      length:
        min: 3 # optional
        max: 12 # optional

```

## Start broker manually

### emqx

```bash
docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083  emqx:5.6.0
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
