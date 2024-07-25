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
mqtt:
  login:
    username: user
    password: password
  host: localhost

db:
  file:
    name: database
    suffix: .db

playerNameRestrictions:
  length:
    min: 4
    max: 16
  forbiddenParts: |
    - forbidden
    - test

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
