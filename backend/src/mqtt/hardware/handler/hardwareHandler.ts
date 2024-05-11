import {SoccerTableHandler} from "../../soccerTable/handler/soccerTableHandler";
import {AbstractHandler, HandlerType} from "../../abstract/abstractHandler";
import {hardwareEventMapper, HardwareEventType} from "../events/hardwareEvent";
import {DkMqttClient} from "../../client/client";
import {HardwareTopicManager} from "../topics/hardwareTopicManager";
import type {TableRegisterPayload} from "../../client/payloads/TableRegisterPayload";

export class HardwareHandler extends AbstractHandler<HardwareEventType, SoccerTableHandler> {

  private _soccerTableHandler: SoccerTableHandler;
  private _hardwareTopicManager: HardwareTopicManager;
  private _dkMqttClient: DkMqttClient;
  private _topicToEventRouter = (_: any, payload: TableRegisterPayload) => {

  }

  constructor(subject: SoccerTableHandler, hardwareTopicManager: HardwareTopicManager) {
    super(subject, hardwareEventMapper, HandlerType.HARDWARE, subject.subject);
    this._soccerTableHandler = subject;
    this._hardwareTopicManager = hardwareTopicManager;
    this._dkMqttClient = DkMqttClient.getInstance();

    // subscribes
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