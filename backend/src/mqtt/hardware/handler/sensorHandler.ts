import {TableHandler} from "../../table/handler/tableHandler.ts";
import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import {SensorEventType} from "../events/sensorEvent.ts";
import {SensorTopicManager} from "../topics/sensorTopicManager.ts";
import type {PinOut, PinStatusPayload} from "../payloads/pinStatusPayload.ts";
import {BasicTerm} from "../../util/basicTerm";
import type {TopicSubscriber} from "../../client/topicSubscriber";
import {SensorEventMapper} from "../events/sensorEventMapper.ts";
import {TeamColor} from "../../../models/team";

export class SensorHandler extends DkModelHandler<
  SensorEventType,
  TableHandler
> {
  private _soccerTableHandler: TableHandler;
  private _sensorTopicManager: SensorTopicManager;

  private readonly lightbarrierSubscriber: TopicSubscriber;
  private readonly buttonSubscriber: TopicSubscriber;

  _topicToEventRouter = (topic: string, payload: any) => {
    let pinStatusPayload: PinStatusPayload;
    try {
      pinStatusPayload = payload as PinStatusPayload;
    } catch (e) {
      this._logger.error(
        "Error while converting payload to PinStatusPayload: ",
        e,
      );
      return;
    }

    const topicSplit: string[] = topic.split("/");
    let hardwareType: BasicTerm | undefined = undefined;
    let hardwareId: number;
    let basicTermMapStr = topicSplit[topicSplit.length - 2].toUpperCase();
    try {
      if (BasicTerm[basicTermMapStr as keyof typeof BasicTerm]) {
        hardwareType = BasicTerm[basicTermMapStr as keyof typeof BasicTerm];
      }
      hardwareId = Number(topicSplit[topicSplit.length - 1]);
    } catch (e) {
      this._logger.error(
        "Could not find hardware type or hardware id in topic: ",
        e,
      );
      return;
    }

    if (hardwareId === undefined) {
      this._logger.error("HardwareId is undefined.");
      return;
    }

    if (hardwareType === undefined) {
      this._logger.error("HardwareType is undefined.");
      return;
    }

    let toTriggerEvent: SensorEventType;

    try {
      toTriggerEvent = this.mapTypeAndIdToEvent(
        hardwareType,
        hardwareId,
        pinStatusPayload.pinOut,
      );
    } catch (e) {
      this._logger.error(
        `No hardware event: "${String(
          `${hardwareType}_${hardwareId}_${pinStatusPayload.pinOut}`,
        ).toUpperCase()}"`,
      );
      return;
    }

    this.triggerEvent(toTriggerEvent, topic, payload);
  };

  constructor(subject: TableHandler, teamColor: TeamColor) {
    super(subject, HandlerType.HARDWARE, subject.subject);
    this._mapper = new SensorEventMapper(subject, teamColor);
    this._soccerTableHandler = subject;
    this._sensorTopicManager = new SensorTopicManager(
      this._soccerTableHandler.subject,
      teamColor,
    );

    this.lightbarrierSubscriber = {
      topic: this._sensorTopicManager.lightbarriersTopic,
      func: this._topicToEventRouter,
    };
    this.buttonSubscriber = {
      topic: this._sensorTopicManager.buttonsTopic,
      func: this._topicToEventRouter,
    };

    this._subscribeToAllTopics();
  }

  mapTypeAndIdToEvent(
    hardwareType: BasicTerm,
    hardwareId: number,
    pinStatus: PinOut,
  ) {
    const eventTypeString = String(
      `${hardwareType}_${hardwareId}_${pinStatus}`,
    ).toUpperCase();
    if (SensorEventType[eventTypeString as keyof typeof SensorEventType]) {
      return SensorEventType[
        eventTypeString as keyof typeof SensorEventType
        ];
    } else {
      this._logger.error(`Enum entry for '${eventTypeString}' does not exist.`);
      throw new Error(`Enum entry for '${eventTypeString}' does not exist.`);
    }
  }

  private _subscribeToAllTopics() {
    this._dkMqttClient.subscribeOnTopic(this.buttonSubscriber);
    this._dkMqttClient.subscribeOnTopic(this.lightbarrierSubscriber);
  }

  private _unsubscribeFromAllTopics() {
    this._dkMqttClient.unsubscribeOnTopic(this.buttonSubscriber);
    this._dkMqttClient.unsubscribeOnTopic(this.lightbarrierSubscriber);
  }
}
