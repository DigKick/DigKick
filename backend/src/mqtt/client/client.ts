import mqtt, { MqttClient } from "mqtt";
import { MqttConfig } from "./config";
import type { TopicSubscriber } from "./topicSubscriber";

export class DkMqttClient {
  private static instance: DkMqttClient;
  private _topicObservers: Array<TopicSubscriber>;
  private _mqttConfig = new MqttConfig();
  private _mqttClient!: MqttClient;

  public static getInstance(): DkMqttClient {
    if (!DkMqttClient.instance) {
      DkMqttClient.instance = new DkMqttClient();
    }
    return this.instance;
  }

  private constructor() {
    this._connectMqttClient();
    this._setupClient();
    this._topicObservers = new Array<TopicSubscriber>();
  }

  private _connectMqttClient() {
    this._mqttClient = mqtt.connect(this._mqttConfig.connectUrl, {
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
    this._mqttClient.on("connect", () => {
      console.info("Connected to Broker.");
    });

    this._mqttClient.on("reconnect", () => {
      console.info("Trying to connect to the Broker.");
    });

    this._mqttClient.on("error", (error) => {
      console.error(`Error -> (${error.name}): ${error.message}`);
    });

    this._mqttClient.on("message", (topic, payload, packet) => {
      this._topicObservers.forEach((subscriber) => {
        if (subscriber.topic !== topic) {
          return;
        }
        subscriber.func(topic, payload, packet);
      });
    });
  }

  public subscribeOnTopic(newSubscription: TopicSubscriber) {
    this._mqttClient.subscribe(newSubscription.topic);
    this._topicObservers.push(newSubscription);
  }

  public unsubscribeOnTopic(newSubscription: TopicSubscriber) {
    this._mqttClient.unsubscribe(newSubscription.topic);
    this._topicObservers.splice(
      this._topicObservers.indexOf(newSubscription),
      1
    );
  }
}
