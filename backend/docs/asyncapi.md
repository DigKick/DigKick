# DigKick (Backend) 1.0.0 documentation

* Email support: [mkoenig2@stud.hs-heilbronn.de](mailto:mkoenig2@stud.hs-heilbronn.de)

Digital system for kicker tables.

## Table of Contents

* [Servers](#servers)
  * [emqx](#emqx-server)
* [Operations](#operations)
  * [RECEIVE /table/register](#receive-tableregister-operation)
  * [RECEIVE /table/{tableName}/game/team/{teamColor}/button/{buttonId}](#receive-tabletablenamegameteamteamcolorbuttonbuttonid-operation)
  * [RECEIVE /table/{tableName}/game/team/{teamColor}/lightbarrier/{lightBarrierId}](#receive-tabletablenamegameteamteamcolorlightbarrierlightbarrierid-operation)
  * [RECEIVE /table/{tableName}/game/team/{teamColor}/nfc-reader](#receive-tabletablenamegameteamteamcolornfc-reader-operation)
  * [RECEIVE /table/{tableName}/game/team/{teamColor}/changename](#receive-tabletablenamegameteamteamcolorchangename-operation)
  * [SEND /table/{tableName}/game](#send-tabletablenamegame-operation)
  * [SEND /table/{tableName}/game/team/{teamColor}](#send-tabletablenamegameteamteamcolor-operation)
  * [SEND /table/{tableName}/game/team/{teamColor}/color$](#send-tabletablenamegameteamteamcolorcolor-operation)
  * [SEND /table/{tableName}/game/team/{teamteamColorId}/score$](#send-tabletablenamegameteamteamteamcoloridscore-operation)
  * [SEND /table/{tableName}/game/team/winner](#send-tabletablenamegameteamwinner-operation)
  * [SEND /table/{tableName}/game/team/winner/color$](#send-tabletablenamegameteamwinnercolor-operation)
  * [SEND /table/{tableName}/game/team/winner/score$](#send-tabletablenamegameteamwinnerscore-operation)
  * [SEND /table/{tableName}/game/team/{teamColor}/display](#send-tabletablenamegameteamteamcolordisplay-operation)
  * [SEND /table/{tableName}/game/team/{teamColor}/leds](#send-tabletablenamegameteamteamcolorleds-operation)

## Servers

### `emqx` Server

* URL: `mqtt://kicker.local/`
* Protocol: `mqtt`

The MQTT broker for development and production.

#### Security

##### Security Requirement 1

* Type: `User/Password`
  Simple user password login to the broker.






## Operations

### RECEIVE `/table/register` Operation

*Operation for a registration of a table with an id*

* Operation ID: `kickerTableRegister`

#### Message `registerMessage`

*A message which contains the information for a table registration.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Information for a table registration. | - | - | **additional properties are allowed** |
| name | string | - | - | - | - |

> Examples of payload _(generated)_

```json
{
  "name": "table1"
}
```



### SEND `/table/{tableName}/game` Operation

*Information about the game status.*

* Operation ID: `gameStatus`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |


#### Message `gameStatusMessage`

*All information about a team.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Describes all information about a game. | - | - | **additional properties are allowed** |
| gameMode | string | - | allowed (`"DEFAULT"`) | - | - |
| teamWhite | object | Describes all information about a team. | - | - | **additional properties are allowed** |
| teamWhite.color | string | - | allowed (`"white"`, `"black"`) | - | - |
| teamWhite.score | integer | - | - | >= 0 | - |
| teamWhite.isWinner | boolean | - | - | - | - |
| teamBlack | object | Describes all information about a team. | - | - | **additional properties are allowed** |
| teamBlack.color | string | - | allowed (`"white"`, `"black"`) | - | - |
| teamBlack.score | integer | - | - | >= 0 | - |
| teamBlack.isWinner | boolean | - | - | - | - |
| pointsToWin | number | - | - | >= 0 | - |

> Examples of payload _(generated)_

```json
{
  "gameMode": "DEFAULT",
  "teamWhite": {
    "color": "white",
    "score": 4,
    "isWinner": false
  },
  "teamBlack": {
    "color": "black",
    "score": 10,
    "isWinner": true
  },
  "pointsToWin": 10
}
```



### SEND `/table/{tableName}/game/team/{teamColor}` Operation

*Information about the team.*

* Operation ID: `teamStatus`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `teamMessage`

*All information about a team.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Describes all information about a team. | - | - | **additional properties are allowed** |
| color | string | - | allowed (`"white"`, `"black"`) | - | - |
| score | integer | - | - | >= 0 | - |
| isWinner | boolean | - | - | - | - |

> Examples of payload _(generated)_

```json
{
  "color": "white",
  "score": 5,
  "isWinner": false
}
```



### SEND `/table/{tableName}/game/team/{teamColor}/color$` Operation

*Information about the team color.*

* Operation ID: `teamColorStatus`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `teamColorMessage`

*Information about the score of a team.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | string | - | allowed (`"white"`, `"black"`) | - | - |

> Examples of payload _(generated)_

```json
"white"
```



### SEND `/table/{tableName}/game/team/{teamteamColorId}/score$` Operation

*Information about the team score.*

* Operation ID: `teamScoreStatus`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `teamScoreMessage`

*Information about the score of a team.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | integer | - | - | >= 0 | - |

> Examples of payload _(generated)_

```json
1
```



### SEND `/table/{tableName}/game/team/winner` Operation

*Information about the score status of the winner team. Payload is empty when there is no winner at the moment.*

* Operation ID: `winnerTeamStatus`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `teamMessage`

*All information about a team.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Describes all information about a team. | - | - | **additional properties are allowed** |
| color | string | - | allowed (`"white"`, `"black"`) | - | - |
| score | integer | - | - | >= 0 | - |
| isWinner | boolean | - | - | - | - |

> Examples of payload _(generated)_

```json
{
  "color": "white",
  "score": 5,
  "isWinner": false
}
```



### SEND `/table/{tableName}/game/team/winner/color$` Operation

*Information about the score status. Payload is empty when there is no winner at the moment.*

* Operation ID: `winnerTeamColorStatus`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `scoreStatusMessage`

*Information about the score of a team.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | string | - | allowed (`"white"`, `"black"`) | - | - |

> Examples of payload _(generated)_

```json
"white"
```



### SEND `/table/{tableName}/game/team/winner/score$` Operation

*Information about the score status. Payload is empty when there is no winner at the moment.*

* Operation ID: `winnerTeamScoreStatus`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `scoreStatusMessage`

*Information about the score of a team.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | integer | - | - | >= 0 | - |

> Examples of payload _(generated)_

```json
1
```



### RECEIVE `/table/{tableName}/game/team/{teamColor}/button/{buttonId}` Operation

*Action on button press*

* Operation ID: `buttonPress`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |
| buttonId | string | Identifier of a button. | examples (`"1"`, `"2"`, `"3"`) | - | **required** |


#### Message `pinOutMessage`

*Action triggered by a pin output change.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Defines the status of an analog or digital pin. | - | - | **additional properties are allowed** |
| pinOut | string | - | allowed (`"HIGH"`, `"LOW"`) | - | - |

> Examples of payload _(generated)_

```json
{
  "pinOut": "HIGH"
}
```



### RECEIVE `/table/{tableName}/game/team/{teamColor}/lightbarrier/{lightBarrierId}` Operation

*Action on a detection of the light barrier*

* Operation ID: `lightBarrierDetect`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |
| lightBarrierId | string | Identifier of a light barrier. | examples (`"1"`, `"2"`) | - | **required** |


#### Message `pinOutMessage`

*Action triggered by a pin output change.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Defines the status of an analog or digital pin. | - | - | **additional properties are allowed** |
| pinOut | string | - | allowed (`"HIGH"`, `"LOW"`) | - | - |

> Examples of payload _(generated)_

```json
{
  "pinOut": "HIGH"
}
```



### SEND `/table/{tableName}/game/team/{teamColor}/display` Operation

*Display update*

* Operation ID: `displayUpdate`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `displayMessage`

*Updates the display with the given parameters.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Describes where to put which text on the OLED display | - | - | **additional properties are allowed** |
| snippets | array&lt;object&gt; | Describes the different text segments for the display | - | - | - |
| snippets.cursorPosition | integer | The cursor position defines where the text is written on the display. First value = x position - Second value = y position | - | 2 items | - |
| snippets.text | string | Defines the text. | - | - | - |
| snippets.inverted | boolean | Defines if the display should be inverted around the text. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "snippets": [
    {
      "cursorPosition": [
        1,
        2
      ],
      "text": "WHITE 1 : 2 BLACK",
      "inverted": false
    },
    {
      "cursorPosition": [
        1,
        3
      ],
      "text": "LAST SCORED: TEAM WHITE",
      "inverted": true
    }
  ]
}
```



### SEND `/table/{tableName}/game/team/{teamColor}/leds` Operation

*LED(s) update*

* Operation ID: `ledUpdate`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `ledMessage`

*Updates the LEDs strip.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Describes how many LEDs are turned in which color(s). Also defines the transmission animation. | - | - | **additional properties are allowed** |
| colors | array&lt;string&gt; | Describes the colors of the LEDs. The led strip should light in the described colors. If the value contains an empty string, the led at this place should be turned off. | - | >= 0 items | - |
| colors (single item) | string | Describes a color in HEX | - | - | - |
| animation | string | Describes the animation which gets played before the update of the LEDs. | allowed (`null`, `"GLACE GLIDER"`, `"NEON JUMP"`, `"NEON RUN LEFT"`, `"NEON RUN RIGHT"`, `"PARTY"`, `"FIREWORK"`) | - | - |

> Examples of payload _(generated)_

```json
{
  "colors": [
    "0x00FF00",
    "0x00FFFF"
  ],
  "animation": "GLACE GLIDER"
}
```



### RECEIVE `/table/{tableName}/game/team/{teamColor}/nfc-reader` Operation

*Read nfc chip serial number for player registration.*

* Operation ID: `nfcReaderSerialUpdate`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `nfcReaderMessage`

*Information from the nfc reader about the chip.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| serialNumber | string | Serial number of the read nfc chip | - | - | - |

> Examples of payload _(generated)_

```json
{
  "serialNumber": "serialNumberFromChip"
}
```



### RECEIVE `/table/{tableName}/game/team/{teamColor}/changename` Operation

*Action to update the name of the player who registrated last to the table.*

* Operation ID: `playerNameUpdate`

#### Parameters

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| tableName | string | Identifier of a table. | examples (`"table1"`, `"kjb14123b1jk"`) | - | **required** |
| teamColor | string | Identifier of a team. | examples (`"white"`, `"black"`) | - | **required** |


#### Message `newPlayerNameMessage`

*The new requested name for the last registered player.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| newName | string | New name for the player | - | - | - |

> Examples of payload _(generated)_

```json
{
  "newName": "new player name"
}
```



