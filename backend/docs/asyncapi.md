# DigKick (Backend) 0.0.1 documentation

Digital system for kicker tables.

## Table of Contents

* [Servers](#servers)
  * [emqx](#emqx-server)
* [Operations](#operations)
  * [RECEIVE table/register](#receive-tableregister-operation)
  * [RECEIVE table/{tableId}/team/{teamId}/button/{buttonId}](#receive-tabletableidteamteamidbuttonbuttonid-operation)
  * [RECEIVE table/{tableId}/team/{teamId}/lightbarrier/{lightbarrierId}](#receive-tabletableidteamteamidlightbarrierlightbarrierid-operation)
  * [SEND table/{tableId}/team/{teamId}/display](#send-tabletableidteamteamiddisplay-operation)
  * [SEND table/{tableId}/team/{teamId}/leds](#send-tabletableidteamteamidleds-operation)

## Servers

### `emqx` Server

* URL: `mqtt://kicker.local/`
* Protocol: `mqtt`



## Operations

### RECEIVE `table/register` Operation

*Operation to registrate a table with an id*

* Operation ID: `onKickerTableRegister`

#### Message `Table register`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| id | string | Identifier for the table. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "id": "table1"
}
```



### RECEIVE `table/{tableId}/team/{teamId}/button/{buttonId}` Operation

*Action on button press*

* Operation ID: `onButtonPress`

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



### RECEIVE `table/{tableId}/team/{teamId}/lightbarrier/{lightbarrierId}` Operation

*Action on a detection of the light barrier*

* Operation ID: `onLightbarrierDetect`

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



### SEND `table/{tableId}/team/{teamId}/display` Operation

*Display update*

* Operation ID: `displayUpdate`

#### Message `displayMessage`

*Updates the display with the given parameters.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Describes where to put which text on the OLED display | - | - | **additional properties are allowed** |
| snippets | array&lt;object&gt; | Describes the different text segments for the display | - | - | - |
| snippets.cursorPosition | integer | The cursor positiondefines where the text is written on the display. First value = x position - Second value = y position | - | 2 items | - |
| snippets.text | string | Defines the text. | - | - | - |
| snippets.inverted | boolean | Defines if the display should be inverted around the text. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "snippets": {
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
}
```



### SEND `table/{tableId}/team/{teamId}/leds` Operation

*LED(s) update*

* Operation ID: `ledUpdate`

#### Message `ledMessage`

*Updates the LEDs strip.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Describes how many LEDs are turned in which color(s). Also defines the transmission animation. | - | - | **additional properties are allowed** |
| ledCount | integer | Describes how many LEDs are getting turned on. | - | [ 0 .. 20 ] items | - |
| colors | array&lt;string&gt; | Decribes the color of the LEDs. If the array contains two colors the LEDs will alternate between both colors. | - | [ 1 .. 2 ] items | - |
| colors (single item) | string | Describes a color in HEX | - | - | - |
| animation | string | Describes the animation which gets played before the update of the LEDs. | allowed (`null`, `"GLACE GLIDER"`, `"NEON JUMP"`, `"NEON RUN LEFT"`, `"NEON RUN RIGHT"`, `"PARTY"`, `"FIREWORK"`) | - | - |

> Examples of payload _(generated)_

```json
{
  "ledCount": 2,
  "colors": [
    "0x00FF00",
    "0x00FFFF"
  ],
  "animation": "GLACE GLIDER"
}
```



