import mqtt, {MqttClient} from "mqtt";
import {MqttConfig} from "./config";

const mqttConfig = new MqttConfig();
let client: MqttClient

export function start() {
  connectClient();
  setupClient();
}

function connectClient() {
  client = mqtt.connect(mqttConfig.connectUrl, {
    clientId: mqttConfig.clientId,
    clean: true,
    connectTimeout: 10000,
    username: "emqx",
    password: "public",
    reconnectPeriod: 5000,
  });
}

function setupClient() {
  client.on("connect", () => {
    console.info("Connected to Broker.");
  });

  client.on("reconnect", () => {
    console.info("Trying to connect to the Broker.");
  });

  client.on("error", (error) => {
    console.error(`Error -> (${error.name}): ${error.message}`);
  });


}

export function disconnectMqttClient() {
  client.end();
}

function logUnhandledInformation(topic: string, payload: Buffer) {
  console.info(
    `Unhandled information on top "${topic}", payload: ${payload.toString()}`
  );
}