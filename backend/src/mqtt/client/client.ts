import mqtt, {MqttClient} from "mqtt";
import {MqttConfig} from "./config";
import type {TopicSubscriber} from "./topicSubscriber";
import {Logger} from "winston";
import {LoggerFactory} from "../../logging/loggerFactory";

export class DkMqttClient {

  private _logger: Logger = LoggerFactory.getLogger(DkMqttClient.name)

  private static instance: DkMqttClient;
  public static _topicObservers: Array<TopicSubscriber> = new Array<TopicSubscriber>();
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
  }

  private _connectMqttClient() {
    this._mqttClient = mqtt.connect(this._mqttConfig.connectUrl, {
      clientId: this._mqttConfig.clientId,
      clean: true,
      connectTimeout: 10000,
      //@TODO: hide credentials
      username: "emqx",
      password: "public",
      reconnectPeriod: 1000,
    });

    DkMqttClient._topicObservers.forEach(subscriber => {
      this._mqttClient.subscribe(subscriber.topic)
    })
  }

  private _setupClient() {
    this._mqttClient.on("connect", () => {
      this._logger.info("Connected to Broker.");
    });

    this._mqttClient.on("end", () => {
      this._logger.info("Mqtt Client end.")
    })

    this._mqttClient.on("disconnect", () => {
      this._logger.info("Disconnected from Broker.");
    })

    this._mqttClient.on("reconnect", () => {
      this._logger.info("Trying to connect to the Broker.");
    });

    this._mqttClient.on("error", (error) => {
      this._logger.error(`Error -> (${error.name}): ${error.message}`);

      if (error.message === "connack timeout") {
        this._connectMqttClient();
        this._setupClient();
      }
    });

    this._mqttClient.on("message", (topic, payload, packet) => {

      let jsonPayload = "";

      try {
        jsonPayload = JSON.parse(payload.toString());
      } catch (e) {
        if (e instanceof SyntaxError) {
          this._logger.error("Could not parse payload to JSON: ", e)
          return
        }

        this._logger.error("Unexpected error while parsing payload to JSON:", e);
      }

      DkMqttClient._topicObservers.forEach((subscriber) => {
        if (subscriber.topic !== topic) {
          return;
        }
        subscriber.func(topic, jsonPayload, packet);
      });
    });
  }

  public subscribeOnTopic(newSubscription: TopicSubscriber) {
    this._mqttClient.subscribe(newSubscription.topic);
    DkMqttClient._topicObservers.push(newSubscription);
  }

  public unsubscribeOnTopic(newSubscription: TopicSubscriber) {
    this._mqttClient.unsubscribe(newSubscription.topic);
    DkMqttClient._topicObservers.splice(
      DkMqttClient._topicObservers.indexOf(newSubscription),
      1,
    );
  }
}
