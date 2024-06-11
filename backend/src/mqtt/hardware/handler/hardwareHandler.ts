import {TableHandler} from "../../table/handler/tableHandler.ts";
import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import {HardwareEventType} from "../events/hardwareEvent";
import {DkMqttClient} from "../../client/client";
import {HardwareTopicManager} from "../topics/hardwareTopicManager";
import type {PinOut, PinStatusPayload,} from "../payloads/pinStatusPayload.ts";
import {BasicTerm} from "../../util/basicTerm";
import type {TopicSubscriber} from "../../client/topicSubscriber";
import {HardwareEventMapper} from "../events/hardwareEventMapper";
import {TeamColor} from "../../../models/team";

export class HardwareHandler extends DkModelHandler<
  HardwareEventType,
  TableHandler
> {
  private _soccerTableHandler: TableHandler;
  private _hardwareTopicManager: HardwareTopicManager;
  private _dkMqttClient: DkMqttClient;

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

    let toTriggerEvent: HardwareEventType;

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

    this.triggerEvent(toTriggerEvent);
  };

  constructor(subject: TableHandler, teamColor: TeamColor) {
    super(subject, HandlerType.HARDWARE, subject.subject);
    this._mapper = new HardwareEventMapper(subject, teamColor);
    this._soccerTableHandler = subject;
    this._hardwareTopicManager = new HardwareTopicManager(
      this._soccerTableHandler.subject,
      teamColor,
    );
    this._dkMqttClient = DkMqttClient.getInstance();

    this.lightbarrierSubscriber = {
      topic: this._hardwareTopicManager.lightbarriersTopic,
      func: this._topicToEventRouter,
    };
    this.buttonSubscriber = {
      topic: this._hardwareTopicManager.buttonsTopic,
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
    if (HardwareEventType[eventTypeString as keyof typeof HardwareEventType]) {
      return HardwareEventType[
        eventTypeString as keyof typeof HardwareEventType
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
