import {SoccerTableHandler} from "../../soccerTable/handler/soccerTableHandler";
import {AbstractHandler, HandlerType} from "../../abstract/abstractHandler";
import {hardwareEventMapper, HardwareEventType} from "../events/hardwareEvent";
import {DkMqttClient} from "../../client/client";
import {HardwareTopicManager} from "../topics/hardwareTopicManager";
import type {PinOut, PinStatusPayload} from "../../client/payloads/pinStatusPayload";
import {BasicTerm} from "../../abstract/basicTerm";

export class HardwareHandler extends AbstractHandler<HardwareEventType, SoccerTableHandler> {

  private _soccerTableHandler: SoccerTableHandler;
  private _hardwareTopicManager: HardwareTopicManager;
  private _dkMqttClient: DkMqttClient;

  _topicToEventRouter = (topic: string, payload: any) => {
    let pinStatusPayload: PinStatusPayload
    try {
      pinStatusPayload = payload as PinStatusPayload
    } catch (e) {
      this._logger.error("Error while converting payload to PinStatusPayload: ", e);
      return
    }

    const topicSplit: string[] = topic.split("/")
    let hardwareType: BasicTerm | undefined = undefined
    let hardwareId: number
    let basicTermMapStr = topicSplit[topicSplit.length - 2].toUpperCase();
    try {
      if (BasicTerm[basicTermMapStr as keyof typeof BasicTerm]) {
        hardwareType = BasicTerm[basicTermMapStr as keyof typeof BasicTerm]
      }
      hardwareId = Number(topicSplit[topicSplit.length - 1]);
    } catch (e) {
      this._logger.error("Could not find hardware type or hardware id in topic: ", e)
      return;
    }

    if (hardwareId === undefined) {
      this._logger.error("HardwareId is undefined.")
      return;
    }

    if (hardwareType === undefined) {
      this._logger.error("HardwareType is undefined.")
      return;
    }

    let toTriggerEvent: HardwareEventType

    try {
      toTriggerEvent = this._mapTypeAndIdToEvent(hardwareType, hardwareId, pinStatusPayload.pinOut)
      this.triggerEvent(toTriggerEvent)
    } catch (e) {
      this._logger.error(`No hardware event: "${String(`${hardwareType}_${hardwareId}_${pinStatusPayload.pinOut}`).toUpperCase()}"`)
      return;
    }
  }

  constructor(subject: SoccerTableHandler, hardwareTopicManager: HardwareTopicManager) {
    super(subject, hardwareEventMapper, HandlerType.HARDWARE, subject.subject);
    this._soccerTableHandler = subject;
    this._hardwareTopicManager = hardwareTopicManager;
    this._dkMqttClient = DkMqttClient.getInstance();

    // subscribes
    this._subscribeToAllTopics()
  }

  private _mapTypeAndIdToEvent(hardwareType: BasicTerm, hardwareId: number,
                               pinStatus: PinOut) {
    const eventTypeString = String(`${hardwareType}${hardwareId}${pinStatus}`).toUpperCase();
    if (HardwareEventType[eventTypeString as keyof typeof HardwareEventType]) {
      return HardwareEventType[eventTypeString as keyof typeof HardwareEventType];
    } else {
      throw new Error(`Enum entry for '${eventTypeString}' does not exist.`);
    }
  }

  private _subscribeToAllTopics() {
    this._dkMqttClient.subscribeOnTopic({
      topic: this._hardwareTopicManager.buttonsTopic,
      func: this._topicToEventRouter
    })
  }

  unsubscribeFromAllTopics() {

  }
}