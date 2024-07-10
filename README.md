# Digital Kicker 👟

## Backend 🕹️

### Framework: [Bun](https://bun.sh/)

The backend handles the basic game logic and manages all kicker tables and games played on them. It subscribes to hardware sensors via the MQTT broker. Conversely, the hardware subscribes to topics that allow the backend to control the LED strip and the display.

In later steps the backend will store data about the games in a simple database. Further features will be automated statistics about the games played, player registration and an Elo system.

- [X] Implement class for game logic
- [X] Implement class for kicker tables
- [X] Wire it up to the MQTT Broker
- [X] Make a websocket for the frontend (emqx already provides a feature like this)

<br>

- [X] Create database and save games in it
- [X] Player management (Register & Login)
- [X] Make player rankings

<br>

## Frontend 🔭

### Framework: [Angular](https://angular.io/)

The frontend mainly displays the data provided by the backend. It shows an overview of all active games and individual views of the games.

In later steps, the web application will also be used to register new players via NFC chips. New players can use their smartphone to register the ID on the chips in our database to enable features like having an Elo score or personalized stats.

- [X] Create MockUps
- [X] Overview of all active games
- [X] Game view

<br>

- [ ] Statistics view
- [X] NFC Chip register
- [X] Player scoreboard

<br>

## Digital Interface for Counting @ Kicker table (aka DICK) 🛠️

### Framework: Arduino Framework (on an ESP32)

Our hardware will provide the backend with the given data from its sensors. The detection sensors are currently a pair of light barriers. It also provides three buttons that are used to start or cancel a game, or to manually increase or decrease the score.

<br>

## Quick setup

1. Set up a .env-be file for the backend config
    <br><br>
    .env-be file should look like this:

    ```env
    MQTT_LOGIN_USERNAME=MQTT_USERNAME
    MQTT_LOGIN_PASSWORD=MQTT_PASSWORD
    MQTT_HOST=localhost
    
    DATABASE_FILE_NAME=database
    DATABASE_FILE_SUFFIX=db
    ```
   
    > Normally the broker credentials are not set. If they are not set, they do not matter for the login.

2. Simply run backend, frontend and emqx broker with:

    ```bash
    docker compose up
    ```
