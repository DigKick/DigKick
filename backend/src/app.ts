import {DkMqttClient} from "./mqtt/client/client.ts";
import {LoggerFactory} from "./logging/loggerFactory.ts";
import "reflect-metadata"
import {initializeDatabase} from "./database/database.ts";
import {PlayerDataPublisher} from "./mqtt/player/publisher/playerDataPublisher.ts";

LoggerFactory.printLogo();
await initializeDatabase();
DkMqttClient.getInstance();
await PlayerDataPublisher.publishAll()
