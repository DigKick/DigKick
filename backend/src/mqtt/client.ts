import mqtt, { MqttClient } from "mqtt";
import { MqttConfig } from "./config";

export class DkMqttClient {
  private static instance: DkMqttClient;

  private topicObserver: Array<{ topic: string; func: Function }> = new Array<{
    topic: string;
    func: Function;
  }>();

  private _mqttConfig = new MqttConfig();

  public client!: MqttClient;

  public static getInstance(): DkMqttClient {
    if (!DkMqttClient.instance) {
      DkMqttClient.instance = new DkMqttClient();
    }
    return this.instance;
  }

  constructor() {
    this._connectMqttClient();
    this._setupClient();
  }

  private _connectMqttClient() {
    this.client = mqtt.connect(this._mqttConfig.connectUrl, {
      clientId: this._mqttConfig.clientId,
      clean: true,
      connectTimeout: 10000,
      //@TODO: hide credentials
      username: "emqx",
      password: "public",
      reconnectPeriod: 5000,
    });
  }

  private _setupClient() {
    this.client.on("connect", () => {
      console.info("Connected to Broker.");
    });

    this.client.on("reconnect", () => {
      console.info("Trying to connect to the Broker.");
    });

    this.client.on("error", (error) => {
      console.error(`Error -> (${error.name}): ${error.message}`);
    });
  }
}
