import {DkMqttClient} from "./mqtt/client/client.ts";
import {LoggerFactory} from "./logging/loggerFactory.ts";
import "reflect-metadata"
import {initializeDatabase} from "./database/database.ts";
import {PlayerDataPublisher} from "./mqtt/player/publisher/playerDataPublisher.ts";
import {ApplicationProperities} from "./util/properties/applicationProperities.ts";

ApplicationProperities.load()

if (ApplicationProperities.properties.digkick?.banner) {
  LoggerFactory.printLogo();
}

await initializeDatabase();
DkMqttClient.getInstance();
await PlayerDataPublisher.publishAll()

