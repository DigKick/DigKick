import type {DataPublisher} from "./dataPublisher.ts";
import {DataPublishTopic} from "./dataPublishTopic.ts";
import {LoggerFactory} from "../../../logging/loggerFactory.ts";
import {BasicTerm} from "../../util/basicTerm.ts";
import type {TopicSubscriber} from "../../client/topicSubscriber.ts";
import type {RequestPayload} from "./payloads/requestPayload.ts";

export class DataRequestHandler {
  private static _logger = LoggerFactory.getLogger(DataRequestHandler.name)

  private static instance: DataRequestHandler = DataRequestHandler.getInstance();

  private static dataPublisher: Map<BasicTerm, DataPublisher> = new Map();
  private static requestSubscriber: TopicSubscriber = {
    topic: DataPublishTopic.REQUEST_TOPIC.toString(),
    func: (topic: string, payload: RequestPayload) => {

    }
  }

  public static getInstance(): DataRequestHandler {
    if (!DataRequestHandler.instance) {
      DataRequestHandler.instance = new DataRequestHandler();
    }
    return this.instance
  }

  private constructor() {
  }

  public static registerDataPublisher(type: BasicTerm, publisher: DataPublishTopic) {
    if (this.dataPublisher.get(type)) {
      this._logger.warn(`DataPublisher for '${type}' already registered.`);
      return
    }
    this.dataPublisher.set(type, publisher);
    this._logger.debug(`DataPublisher for '${type}' registered.`)
  }

  private static handleRequest() {

  }


}