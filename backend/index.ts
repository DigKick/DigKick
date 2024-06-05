import {DkMqttClient} from "./src/mqtt/client/client";
import {SoccerTableRegisterHandler} from "./src/mqtt/soccerTable/handler/soccerTableRegisterHandler";
import {LoggerFactory} from "./src/logging/loggerFactory";
import "reflect-metadata"
import {initializeDatabase} from "./src/database/connectors/database.ts";

LoggerFactory.printLogo();
await initializeDatabase();
DkMqttClient.getInstance();
new SoccerTableRegisterHandler();
