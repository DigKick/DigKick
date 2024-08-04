import { DkMqttClient } from './mqtt/client/client.ts';
import { LoggerFactory } from './logging/loggerFactory.ts';
import 'reflect-metadata';
import { initializeDatabase } from './database/database.ts';
import { PlayerDataPublisher } from './mqtt/player/publisher/playerDataPublisher.ts';

let exit = false;

if (process.env.MQTT_LOGIN_USERNAME === undefined) {
  console.error("Environment variable 'MQTT_LOGIN_USERNAME' is missing.");
  exit = true;
}

if (process.env.MQTT_LOGIN_PASSWORD === undefined) {
  console.error("Environment variable 'MQTT_LOGIN_PASSWORD' is missing.");
  exit = true;
}

if (process.env.MQTT_HOST === undefined) {
  console.error("Environment variable 'MQTT_HOST' is missing.");
  exit = true;
}

if (process.env.DATABASE_FILE === undefined) {
  console.error("Environment variable 'DATABASE_FILE' is missing.");
  exit = true;
}

if (exit) {
  process.exit(1);
}

LoggerFactory.printLogo();
await initializeDatabase();
DkMqttClient.getInstance();
await PlayerDataPublisher.publishAll();
