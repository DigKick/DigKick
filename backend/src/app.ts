import {DkMqttClient} from "./mqtt/client/client.ts";
import {SoccerTableRegisterHandler} from "./mqtt/soccerTable/handler/soccerTableRegisterHandler.ts";
import {LoggerFactory} from "./logging/loggerFactory.ts";
import "reflect-metadata"
import {initializeDatabase} from "./database/database.ts";

LoggerFactory.printLogo();
await initializeDatabase();
DkMqttClient.getInstance();
new SoccerTableRegisterHandler();
