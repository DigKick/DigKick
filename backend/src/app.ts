import {DkMqttClient} from "./mqtt/client/client.ts";
import {TableRegisterHandler} from "./mqtt/table/handler/tableRegisterHandler.ts";
import {LoggerFactory} from "./logging/loggerFactory.ts";
import "reflect-metadata"
import {initializeDatabase} from "./database/database.ts";

LoggerFactory.printLogo();
await initializeDatabase();
DkMqttClient.getInstance();
new TableRegisterHandler();
