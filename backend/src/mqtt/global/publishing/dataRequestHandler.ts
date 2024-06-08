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

export class DataRequestHandler {
  private static _logger = LoggerFactory.getLogger(DataRequestHandler.name)

  private static instance: DataRequestHandler = DataRequestHandler.getInstance();

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
  }

  public static registerDataPublisher(type: BasicTerm, publisher: DataPublisher) {
    if (this.dataPublisher.get(type)) {
      this._logger.warn(`DataPublisher for '${type}' already registered.`);
      return
    }
    this.dataPublisher.set(type, publisher);
    this._logger.debug(`DataPublisher for '${type}' registered.`)
  }

  private static handleRequest(topic: string, payload: RequestPayload) {
    let parsedPayload;

    try {
      parsedPayload = RequestPayloadParser.parseRequestPayload(payload);
    } catch (error) {
      this._logger.warn(`Could not parse payload: ${payload}`)
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
    switch (parsedPayload.type) {
      case RequestPayloadType.BY_ID:
        parsedPayload = parsedPayload as RequestPayloadById
        matchingPublisher.publishById(parsedPayload.id)
        break

      case RequestPayloadType.BY_RECENT:
        parsedPayload = parsedPayload as RequestPayloadByRecent
        matchingPublisher.publishRecent(parsedPayload.amount)
        break

      case RequestPayloadType.BY_TIME:
        parsedPayload = parsedPayload as RequestPayloadByTimeSpan
        matchingPublisher.publishByTimeSpan(parsedPayload.from, parsedPayload.to)
        break

      default:
        this._logger.error("Implementation error.")
    }
  }
}