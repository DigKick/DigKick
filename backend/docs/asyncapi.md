# DigKick (Backend) 1.0.0 documentation

- Website: [Link](https://makoeta.github.io/digkickDoc/#operation-send-gameStatus)
- Email support: [mkoenig2@stud.hs-heilbronn.de](mailto:mkoenig2@stud.hs-heilbronn.de)

Digital system for kicker tables.

## Table of Contents

- [Servers](#servers)
  - [emqx](#emqx-server)
- [Operations](#operations)
  - [RECEIVE /table/register](#receive-tableregister-operation)
  - [RECEIVE /table/{tableId}/game/team/{teamId}/button/{buttonId}](#receive-tabletableidgameteamteamidbuttonbuttonid-operation)
  - [RECEIVE /table/{tableId}/game/team/{teamId}/lightbarrier/{lightBarrierId}](#receive-tabletableidgameteamteamidlightbarrierlightbarrierid-operation)
  - [SEND /table/{tableId}/game](#send-tabletableidgame-operation)
  - [SEND /table/{tableId}/game/team/{teamId}](#send-tabletableidgameteamteamid-operation)
  - [SEND /table/{tableId}/game/team/{teamId}/color$](#send-tabletableidgameteamteamidcolor-operation)
  - [SEND /table/{tableId}/game/team/{teamId}/score$](#send-tabletableidgameteamteamidscore-operation)
  - [SEND /table/{tableId}/game/team/winner](#send-tabletableidgameteamwinner-operation)
  - [SEND /table/{tableId}/game/team/winner/color$](#send-tabletableidgameteamwinnercolor-operation)
  - [SEND /table/{tableId}/game/team/winner/score$](#send-tabletableidgameteamwinnerscore-operation)
  - [SEND /table/{tableId}/game/team/{teamId}/display](#send-tabletableidgameteamteamiddisplay-operation)
  - [SEND /table/{tableId}/game/team/{teamId}/leds](#send-tabletableidgameteamteamidleds-operation)

## Servers

### `emqx` Server

- URL: `mqtt://kicker.local/`
- Protocol: `mqtt`

The MQTT broker for development and production.

#### Security

##### Security Requirement 1

- Type: `User/Password`
  Simple user password login to the broker.

## Operations

### RECEIVE `/table/register` Operation

_Operation for a registration of a table with an id_

- Operation ID: `kickerTableRegister`

#### Message `registerMessage`

_A message which contains the information for a table registration._

##### Payload

| Name   | Type   | Description                           | Value | Constraints | Notes                                 |
| ------ | ------ | ------------------------------------- | ----- | ----------- | ------------------------------------- |
| (root) | object | Information for a table registration. | -     | -           | **additional properties are allowed** |
| id     | string | -                                     | -     | -           | -                                     |

> Examples of payload _(generated)_

```json
{
  "id": "table1"
}
```

### SEND `/table/{tableId}/game` Operation

_Information about the game status._

- Operation ID: `gameStatus`

#### Parameters

| Name    | Type   | Description            | Value                                   | Constraints | Notes        |
| ------- | ------ | ---------------------- | --------------------------------------- | ----------- | ------------ |
| tableId | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |

#### Message `gameStatusMessage`

_All information about a team._

##### Payload

| Name             | Type    | Description                             | Value                          | Constraints | Notes                                 |
| ---------------- | ------- | --------------------------------------- | ------------------------------ | ----------- | ------------------------------------- |
| (root)           | object  | Describes all information about a game. | -                              | -           | **additional properties are allowed** |
| teamWhite        | object  | Describes all information about a team. | -                              | -           | **additional properties are allowed** |
| teamWhite.color  | string  | -                                       | allowed (`"WHITE"`, `"BLACK"`) | -           | -                                     |
| teamWhite.score  | integer | -                                       | -                              | >= 0        | -                                     |
| teamBlack        | object  | Describes all information about a team. | -                              | -           | **additional properties are allowed** |
| teamBlack.color  | string  | -                                       | allowed (`"WHITE"`, `"BLACK"`) | -           | -                                     |
| teamBlack.score  | integer | -                                       | -                              | >= 0        | -                                     |
| teamWinner       | object  | Describes all information about a team. | -                              | -           | **additional properties are allowed** |
| teamWinner.color | string  | -                                       | allowed (`"WHITE"`, `"BLACK"`) | -           | -                                     |
| teamWinner.score | integer | -                                       | -                              | >= 0        | -                                     |
| pointsToWin      | number  | -                                       | -                              | >= 0        | -                                     |

> Examples of payload _(generated)_

```json
{
  "teamWhite": {
    "color": "WHITE",
    "score": 5
  },
  "teamBlack": {
    "color": "WHITE",
    "score": 5
  },
  "teamWinner": {
    "color": "WHITE",
    "score": 5
  },
  "pointsToWin": 0
}
```

### SEND `/table/{tableId}/game/team/{teamId}` Operation

_Information about the team._

- Operation ID: `teamStatus`

#### Parameters

| Name    | Type   | Description            | Value                                   | Constraints | Notes        |
| ------- | ------ | ---------------------- | --------------------------------------- | ----------- | ------------ |
| tableId | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId  | string | Identifier of a team.  | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |

#### Message `teamMessage`

_All information about a team._

##### Payload

| Name   | Type    | Description                             | Value                          | Constraints | Notes                                 |
| ------ | ------- | --------------------------------------- | ------------------------------ | ----------- | ------------------------------------- |
| (root) | object  | Describes all information about a team. | -                              | -           | **additional properties are allowed** |
| color  | string  | -                                       | allowed (`"WHITE"`, `"BLACK"`) | -           | -                                     |
| score  | integer | -                                       | -                              | >= 0        | -                                     |

> Examples of payload _(generated)_

```json
{
  "color": "WHITE",
  "score": 5
}
```

### SEND `/table/{tableId}/game/team/{teamId}/color$` Operation

_Information about the team color._

- Operation ID: `teamColorStatus`

#### Parameters

| Name    | Type   | Description            | Value                                   | Constraints | Notes        |
| ------- | ------ | ---------------------- | --------------------------------------- | ----------- | ------------ |
| tableId | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId  | string | Identifier of a team.  | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |

#### Message `teamColorMessage`

_Information about the score of a team._

##### Payload

| Name   | Type   | Description | Value                          | Constraints | Notes |
| ------ | ------ | ----------- | ------------------------------ | ----------- | ----- |
| (root) | string | -           | allowed (`"WHITE"`, `"BLACK"`) | -           | -     |

> Examples of payload _(generated)_

```json
"WHITE"
```

### SEND `/table/{tableId}/game/team/{teamId}/score$` Operation

_Information about the team score._

- Operation ID: `teamScoreStatus`

#### Parameters

| Name    | Type   | Description            | Value                                   | Constraints | Notes        |
| ------- | ------ | ---------------------- | --------------------------------------- | ----------- | ------------ |
| tableId | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId  | string | Identifier of a team.  | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |

#### Message `teamScoreMessage`

_Information about the score of a team._

##### Payload

| Name   | Type    | Description | Value | Constraints | Notes |
| ------ | ------- | ----------- | ----- | ----------- | ----- |
| (root) | integer | -           | -     | >= 0        | -     |

> Examples of payload _(generated)_

```json
1
```

### SEND `/table/{tableId}/game/team/winner` Operation

_Information about the score status of the winner team. Payload is empty when there is no winner at the moment._

- Operation ID: `winnerTeamStatus`

#### Parameters

| Name    | Type   | Description            | Value                                   | Constraints | Notes        |
| ------- | ------ | ---------------------- | --------------------------------------- | ----------- | ------------ |
| tableId | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId  | string | Identifier of a team.  | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |

#### Message `teamMessage`

_All information about a team._

##### Payload

| Name   | Type    | Description                             | Value                          | Constraints | Notes                                 |
| ------ | ------- | --------------------------------------- | ------------------------------ | ----------- | ------------------------------------- |
| (root) | object  | Describes all information about a team. | -                              | -           | **additional properties are allowed** |
| color  | string  | -                                       | allowed (`"WHITE"`, `"BLACK"`) | -           | -                                     |
| score  | integer | -                                       | -                              | >= 0        | -                                     |

> Examples of payload _(generated)_

```json
{
  "color": "WHITE",
  "score": 5
}
```

### SEND `/table/{tableId}/game/team/winner/color$` Operation

_Information about the score status. Payload is empty when there is no winner at the moment._

- Operation ID: `winnerTeamColorStatus`

#### Parameters

| Name    | Type   | Description            | Value                                   | Constraints | Notes        |
| ------- | ------ | ---------------------- | --------------------------------------- | ----------- | ------------ |
| tableId | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId  | string | Identifier of a team.  | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |

#### Message `scoreStatusMessage`

_Information about the score of a team._

##### Payload

| Name   | Type   | Description | Value                          | Constraints | Notes |
| ------ | ------ | ----------- | ------------------------------ | ----------- | ----- |
| (root) | string | -           | allowed (`"WHITE"`, `"BLACK"`) | -           | -     |

> Examples of payload _(generated)_

```json
"WHITE"
```

### SEND `/table/{tableId}/game/team/winner/score$` Operation

_Information about the score status. Payload is empty when there is no winner at the moment._

- Operation ID: `winnerTeamScoreStatus`

#### Parameters

| Name    | Type   | Description            | Value                                   | Constraints | Notes        |
| ------- | ------ | ---------------------- | --------------------------------------- | ----------- | ------------ |
| tableId | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId  | string | Identifier of a team.  | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |

#### Message `scoreStatusMessage`

_Information about the score of a team._

##### Payload

| Name   | Type    | Description | Value | Constraints | Notes |
| ------ | ------- | ----------- | ----- | ----------- | ----- |
| (root) | integer | -           | -     | >= 0        | -     |

> Examples of payload _(generated)_

```json
1
```

### RECEIVE `/table/{tableId}/game/team/{teamId}/button/{buttonId}` Operation

_Action on button press_

- Operation ID: `buttonPress`

#### Parameters

| Name     | Type   | Description             | Value                                   | Constraints | Notes        |
| -------- | ------ | ----------------------- | --------------------------------------- | ----------- | ------------ |
| tableId  | string | Identifier of a table.  | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId   | string | Identifier of a team.   | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |
| buttonId | string | Identifier of a button. | examples (`"1"`, `"2"`, `"3"`)          | -           | **required** |

#### Message `pinOutMessage`

_Action triggered by a pin output change._

##### Payload

| Name   | Type   | Description                                     | Value                       | Constraints | Notes                                 |
| ------ | ------ | ----------------------------------------------- | --------------------------- | ----------- | ------------------------------------- |
| (root) | object | Defines the status of an analog or digital pin. | -                           | -           | **additional properties are allowed** |
| pinOut | string | -                                               | allowed (`"HIGH"`, `"LOW"`) | -           | -                                     |

> Examples of payload _(generated)_

```json
{
  "pinOut": "HIGH"
}
```

### RECEIVE `/table/{tableId}/game/team/{teamId}/lightbarrier/{lightBarrierId}` Operation

_Action on a detection of the light barrier_

- Operation ID: `lightBarrierDetect`

#### Parameters

| Name           | Type   | Description                    | Value                                   | Constraints | Notes        |
| -------------- | ------ | ------------------------------ | --------------------------------------- | ----------- | ------------ |
| tableId        | string | Identifier of a table.         | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId         | string | Identifier of a team.          | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |
| lightBarrierId | string | Identifier of a light barrier. | examples (`"1"`, `"2"`)                 | -           | **required** |

#### Message `pinOutMessage`

_Action triggered by a pin output change._

##### Payload

| Name   | Type   | Description                                     | Value                       | Constraints | Notes                                 |
| ------ | ------ | ----------------------------------------------- | --------------------------- | ----------- | ------------------------------------- |
| (root) | object | Defines the status of an analog or digital pin. | -                           | -           | **additional properties are allowed** |
| pinOut | string | -                                               | allowed (`"HIGH"`, `"LOW"`) | -           | -                                     |

> Examples of payload _(generated)_

```json
{
  "pinOut": "HIGH"
}
```

### SEND `/table/{tableId}/game/team/{teamId}/display` Operation

_Display update_

- Operation ID: `displayUpdate`

#### Parameters

| Name    | Type   | Description            | Value                                   | Constraints | Notes        |
| ------- | ------ | ---------------------- | --------------------------------------- | ----------- | ------------ |
| tableId | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId  | string | Identifier of a team.  | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |

#### Message `displayMessage`

_Updates the display with the given parameters._

##### Payload

| Name                    | Type                | Description                                                                                                                | Value | Constraints | Notes                                 |
| ----------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----- | ----------- | ------------------------------------- |
| (root)                  | object              | Describes where to put which text on the OLED display                                                                      | -     | -           | **additional properties are allowed** |
| snippets                | array&lt;object&gt; | Describes the different text segments for the display                                                                      | -     | -           | -                                     |
| snippets.cursorPosition | integer             | The cursor position defines where the text is written on the display. First value = x position - Second value = y position | -     | 2 items     | -                                     |
| snippets.text           | string              | Defines the text.                                                                                                          | -     | -           | -                                     |
| snippets.inverted       | boolean             | Defines if the display should be inverted around the text.                                                                 | -     | -           | -                                     |

> Examples of payload _(generated)_

```json
{
  "snippets": [
    {
      "cursorPosition": [1, 2],
      "text": "WHITE 1 : 2 BLACK",
      "inverted": false
    },
    {
      "cursorPosition": [1, 3],
      "text": "LAST SCORED: TEAM WHITE",
      "inverted": true
    }
  ]
}
```

### SEND `/table/{tableId}/game/team/{teamId}/leds` Operation

_LED(s) update_

- Operation ID: `ledUpdate`

#### Parameters

| Name    | Type   | Description            | Value                                   | Constraints | Notes        |
| ------- | ------ | ---------------------- | --------------------------------------- | ----------- | ------------ |
| tableId | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | -           | **required** |
| teamId  | string | Identifier of a team.  | examples (`"WHITE"`, `"BLACK"`)         | -           | **required** |

#### Message `ledMessage`

_Updates the LEDs strip._

##### Payload

| Name                 | Type                | Description                                                                                                                                                              | Value                                                                                                             | Constraints | Notes                                 |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------- |
| (root)               | object              | Describes how many LEDs are turned in which color(s). Also defines the transmission animation.                                                                           | -                                                                                                                 | -           | **additional properties are allowed** |
| colors               | array&lt;string&gt; | Describes the colors of the LEDs. The led strip should light in the described colors. If the value contains an empty string, the led at this place should be turned off. | -                                                                                                                 | >= 0 items  | -                                     |
| colors (single item) | string              | Describes a color in HEX                                                                                                                                                 | -                                                                                                                 | -           | -                                     |
| animation            | string              | Describes the animation which gets played before the update of the LEDs.                                                                                                 | allowed (`null`, `"GLACE GLIDER"`, `"NEON JUMP"`, `"NEON RUN LEFT"`, `"NEON RUN RIGHT"`, `"PARTY"`, `"FIREWORK"`) | -           | -                                     |

> Examples of payload _(generated)_

```json
{
  "colors": ["0x00FF00", "0x00FFFF"],
  "animation": "GLACE GLIDER"
}
```
