import type {DataPublisher} from "./dataPublisher.ts";
import {DataPublishTopic} from "./dataPublishTopic.ts";
import {LoggerFactory} from "../../../logging/loggerFactory.ts";
import {BasicTerm} from "../../util/basicTerm.ts";
import type {TopicSubscriber} from "../../client/topicSubscriber.ts";
import {
  type RequestPayload,
  type RequestPayloadById,
  type RequestPayloadByRecent,
  type RequestPayloadByTimeSpan,
  RequestPayloadType
} from "./payloads/requestPayload.ts";
import {RequestPayloadParser} from "./payloads/requestPayloadParser.ts";
import {TopicTool} from "../../util/topicTool.ts";
import {DkMqttClient} from "../../client/client.ts";
import {GameDataPublisher} from "../../game/publisher/gameDataPublisher.ts";

export class DataRequestHandler {
  private static _logger = LoggerFactory.getLogger(DataRequestHandler.name)
  private _dkMqttClient: DkMqttClient

  private static instance: DataRequestHandler;

  private static dataPublisher: Map<BasicTerm, DataPublisher> = new Map();
  private static requestSubscriber: TopicSubscriber = {
    topic: DataPublishTopic.REQUEST_TOPIC.toString(),
    func: (topic: string, payload: RequestPayload) => this.handleRequest(topic, payload)
  }

  public static getInstance(): DataRequestHandler {
    if (!DataRequestHandler.instance) {
      DataRequestHandler.instance = new DataRequestHandler();
    }
    return this.instance
  }

  private constructor() {
    this._dkMqttClient = DkMqttClient.getInstance();
    this._dkMqttClient.subscribeOnTopic(DataRequestHandler.requestSubscriber);

    this.registerDataPublisher(BasicTerm.GAME, GameDataPublisher.getInstance())
  }

  public registerDataPublisher(type: BasicTerm, publisher: DataPublisher) {
    if (DataRequestHandler.dataPublisher.get(type)) {
      DataRequestHandler._logger.warn(`DataPublisher for '${type}' already registered.`);
      return
    }
    DataRequestHandler.dataPublisher.set(type, publisher);
    DataRequestHandler._logger.debug(`DataPublisher for '${type}' registered.`)
  }

  private static handleRequest(topic: string, payload: RequestPayload) {
    let parsedPayload = JSON.parse(JSON.stringify(payload));

    try {
      parsedPayload = RequestPayloadParser.parseRequestPayload(payload);
    } catch (error) {
      this._logger.warn(`Could not parse payload: ${JSON.stringify(payload)}: ${error}`)
      return
    }

    const topicTool = new TopicTool(topic);
    let matchingPublisher: DataPublisher | undefined = this.dataPublisher.get(topicTool.getSegment(1) as BasicTerm)

    if (!matchingPublisher) {
      this._logger.warn(`No publisher for type ${topicTool.getSegment(1)} does not exist.`);
      return;
    }

    DataRequestHandler._publishRequestPayload(parsedPayload, matchingPublisher);
  }

  private static _publishRequestPayload(parsedPayload: any, matchingPublisher: DataPublisher) {
    switch (parsedPayload.type.toString().toLowerCase()) {
      case RequestPayloadType.BY_ID.toLowerCase():
        parsedPayload = parsedPayload as RequestPayloadById
        matchingPublisher.publishById(parsedPayload.id)
        break

      case RequestPayloadType.BY_RECENT.toLowerCase():
        parsedPayload = parsedPayload as RequestPayloadByRecent
        matchingPublisher.publishRecent(parsedPayload.amount)
        break

      case RequestPayloadType.BY_TIME.toLowerCase():
        parsedPayload = parsedPayload as RequestPayloadByTimeSpan
        matchingPublisher.publishByTimeSpan(parsedPayload.from, parsedPayload.to)
        break

      default:
        this._logger.error("Implementation error.")
    }
  }
}