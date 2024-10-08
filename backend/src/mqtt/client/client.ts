import mqtt, { type IClientPublishOptions, MqttClient } from 'mqtt';
import { MqttConfig } from './config';
import type { TopicSubscriber } from './topicSubscriber';
import { Logger } from 'winston';
import { LoggerFactory } from '../../logging/loggerFactory';
import { TableRegisterHandler } from '../table/handler/tableRegisterHandler.ts';
import { DataRequestHandler } from '../global/publishing/dataRequestHandler.ts';
import { ApplicationProperties } from '../../util/properties/applicationProperties.ts';

export class DkMqttClient {
  public static _topicObservers: Array<TopicSubscriber> =
    new Array<TopicSubscriber>();
  private static instance: DkMqttClient;
  private _logger: Logger = LoggerFactory.getLogger(DkMqttClient.name);
  private _mqttConfig = new MqttConfig();
  private _mqttClient!: MqttClient;

  private constructor() {
    this._connectMqttClient();
    this._setupClient();
  }

  public static getInstance(): DkMqttClient {
    if (!DkMqttClient.instance) {
      DkMqttClient.instance = new DkMqttClient();
    }
    return this.instance;
  }

  matchTopic(subscriberTopic: string, topic: string): boolean {
    const subscriberSegments = subscriberTopic.split('/');
    const topicSegments = topic.split('/');

    let subscriberIndex = 0;
    let topicIndex = 0;

    while (subscriberIndex < subscriberSegments.length) {
      const subscriberSegment = subscriberSegments[subscriberIndex];
      const topicSegment = topicSegments[topicIndex];

      if (subscriberSegment === topicSegment || subscriberSegment === '+') {
        topicIndex++;
        subscriberIndex++;
        continue;
      }

      if (subscriberSegment === '#' && topicSegment) {
        // Wildcard check
        if (subscriberIndex + 1 < subscriberSegments.length) {
          // If subscriber topic has next values search if the next one is already there
          if (subscriberSegments[subscriberIndex + 1] === topicSegment) {
            subscriberIndex += 2; // move subscriber index over the matching one (looking one forward already)
          }
        }

        topicIndex++;
        continue;
      }

      return (
        subscriberSegment === '#' &&
        subscriberIndex === subscriberSegments.length - 1 &&
        !topicSegment
      );
    }
    return (
      topicIndex === topicSegments.length &&
      subscriberIndex === subscriberSegments.length
    );
  }

  public subscribeOnTopic(newSubscription: TopicSubscriber) {
    this._logger.debug(`Subscribing to topic: ${newSubscription.topic}`);
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

  public publishWithRetain(topic: string, message: string) {
    topic = topic.charAt(0) === '/' ? topic.slice(1) : topic;
    this.publish(topic, message, {
      retain: true,
    });
  }

  public publish(
    topic: string,
    message: string,
    options?: IClientPublishOptions,
  ) {
    this._logger.debug(
      `Publishing to topic: "${topic}", message: ${message.replaceAll(
        '\n',
        ' ',
      )}`,
    );
    this._mqttClient.publish(topic, message, options);
  }

  private _connectMqttClient() {
    this._mqttClient = mqtt.connect(this._mqttConfig.connectUrl, {
      clientId: this._mqttConfig.clientId,
      clean: true,
      connectTimeout: 10000,
      reconnectPeriod: 1000,
    });

    DkMqttClient._topicObservers.forEach((subscriber) => {
      this._mqttClient.subscribe(subscriber.topic);
    });
  }

  private _setupClient() {
    this._mqttClient.on('connect', () => {
      this._logger.info(
        `Connected to Broker on ${this._mqttConfig.connectUrl}`,
      );
      TableRegisterHandler.getInstance();
      DataRequestHandler.getInstance();
    });

    this._mqttClient.on('end', () => {
      this._logger.info('Mqtt Client end.');
    });

    this._mqttClient.on('disconnect', () => {
      this._logger.info('Disconnected from Broker.');
    });

    this._mqttClient.on('reconnect', () => {
      this._logger.info('Trying to connect to the Broker.');
    });

    this._mqttClient.on('error', (error) => {
      this._logger.error(`Error -> (${error.name}): ${error.message}`);

      if (error.message === 'connack timeout') {
        this._connectMqttClient();
        this._setupClient();
      }
    });

    this._mqttClient.on('message', (topic, payload, packet) => {
      this._logger.debug(`Message on ${topic}:\n${payload.toString()}`);
      let jsonPayload = '';

      try {
        jsonPayload = JSON.parse(payload.toString());
      } catch (e) {
        if (e instanceof SyntaxError) {
          this._logger.error('Could not parse payload to JSON: ', e);
          return;
        }

        this._logger.error(
          'Unexpected error while parsing payload to JSON:',
          e,
        );
        return;
      }

      DkMqttClient._topicObservers.forEach((subscriber) => {
        if (!this.matchTopic(subscriber.topic, topic)) {
          return;
        }
        this._logger.debug(`Subscriber found for topic: ${topic}`);
        subscriber.func(topic, jsonPayload, packet);
      });
    });
  }
}
