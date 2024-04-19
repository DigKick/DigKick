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

* Operation ID: `onDisplayUpdate`

#### Message `displayMessage`

*Updates the display with the given parameters.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Describes where to put which text on the OLED display | - | - | **additional properties are allowed** |
| cursorPosition | array&lt;integer&gt; | Defines the position of the cursor (x\|y) | - | 2 items | - |
| cursorPosition (single item) | integer | Single coordinate. Either x or y. | - | - | - |
| text | string | Defines the text. | - | - | - |

> Examples of payload _(generated)_

```json
{
  "cursorPosition": [
    1,
    2
  ],
  "text": "WHITE 1 : 2 BLACK"
}
```



### SEND `table/{tableId}/team/{teamId}/leds` Operation

*LED(s) update*

* Operation ID: `onLEDUpdate`

#### Message `ledMessage`

*Updates the LEDs strip.*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | Describes how many LEDs are turned in which color(s). Also defines the transmission animation. | - | - | **additional properties are allowed** |
| ledCount | integer | Describes how many LEDs are getting turned on. | - | - | - |
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



