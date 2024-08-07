import {DkMqttClient} from "./mqtt/client/client.ts";
import {LoggerFactory} from "./logging/loggerFactory.ts";
import "reflect-metadata"
import {initializeDatabase} from "./database/database.ts";
import {PlayerDataPublisher} from "./mqtt/player/publisher/playerDataPublisher.ts";
import {ApplicationProperties} from "./util/properties/applicationProperties.ts";

ApplicationProperties.load()

if (ApplicationProperties.get().digkick.banner) {
  LoggerFactory.printLogo();
}

await initializeDatabase();
DkMqttClient.getInstance();
await PlayerDataPublisher.publishAll()

