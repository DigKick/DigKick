import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import {NfcReaderEventType} from "../events/nfcReaderEvent.ts";
import type {NfcReaderPayload} from "../payloads/nfcReaderPayload.ts";
import {NfcReaderEventMapper} from "../events/nfcReaderEventMapper.ts";
import type {TopicSubscriber} from "../../client/topicSubscriber.ts";
import {NfcReaderTopicManager} from "../topics/nfcReaderTopicManager.ts";
import type {TeamColor} from "../../../models/team.ts";
import type {TableHandler} from "../../table/handler/tableHandler.ts";

export class NfcReaderHandler extends DkModelHandler<NfcReaderEventType, TableHandler> {
  private readonly nfcReaderSubscriber: TopicSubscriber

  private _topicToEventRouter = (topic: string, payload: any) => {
    let nfcReaderPayload: NfcReaderPayload

    try {
      nfcReaderPayload = payload as NfcReaderPayload
    } catch (e) {
      this._logger.error("Error while converting payload to NfcReaderPayload: ", e)
      return;
    }

    this.triggerEvent(NfcReaderEventType.READER_NFC_TAG_SERIAL_NUMBER, topic, nfcReaderPayload);
    return
  }

  constructor(subject: TableHandler, teamColor: TeamColor) {
    super(subject, HandlerType.HARDWARE, subject.subject);
    this._mapper = new NfcReaderEventMapper(subject, teamColor)

    const nfcReaderTopicManager = new NfcReaderTopicManager(subject.subject, teamColor)

    this.nfcReaderSubscriber = {
      topic: nfcReaderTopicManager.nfcReaderTopic,
      func: this._topicToEventRouter
    }

    this._subscribeToAllTopics()
  }

  private _subscribeToAllTopics() {
    this._dkMqttClient.subscribeOnTopic(this.nfcReaderSubscriber)
  }

  private _unsubscribeToAllTopics() {
    this._dkMqttClient.unsubscribeOnTopic(this.nfcReaderSubscriber)

  }

}