import { DkMqttClient } from "./src/mqtt/client/client";
import { SoccerTableRegisterHandler } from "./src/mqtt/soccerTable/handler/soccerTableRegisterHandler";
import { LoggerFactory } from "./src/logging/loggerFactory";

LoggerFactory.printLogo();
DkMqttClient.getInstance();
new SoccerTableRegisterHandler();
