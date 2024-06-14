import {Logger} from "winston";
import {LoggerFactory} from "../../logging/loggerFactory";
import {Table} from "../../models/table.ts";
import type {EventMapper} from "./eventMapper";
import {BasicTerm} from "../util/basicTerm";
import {DkMqttClient} from "../client/client.ts";

export enum HandlerType {
  GAME = BasicTerm.GAME,
  SOCCERTABLE = BasicTerm.TABLE,
  HARDWARE = "Hardware",
  PLAYER = BasicTerm.PLAYER,
  ABSTRACT = "ABSTRACT",
}

export class DkModelHandler<EventType, SubjectType> {
  protected _dkMqttClient: DkMqttClient;

  public observerMap: Map<EventType, Function> = new Map();
  public subject: SubjectType;

  protected _logger: Logger;
  protected _mapper?: EventMapper<EventType>;

  constructor(
    subject: SubjectType,
    handlerType: HandlerType,
    soccerTable: Table,
  ) {
    this.subject = subject;

    this._dkMqttClient = DkMqttClient.getInstance();

    this._logger = LoggerFactory.getHandlerLogger(handlerType, soccerTable.name);
    this._logger.debug(`${handlerType}Handler created.`);
  }

  public subscribe(event: EventType, observer: Function) {
    this._logger.debug(`Subscribed to ${event}.`);
    if (Array.from(this.observerMap.values()).includes(observer)) {
      // observer already subscribed
      return;
    }
    this.observerMap.set(event, observer);
  }

  public unsubscribe(observer: Function) {
    Array.from(this.observerMap.entries()).forEach((entry) => {
      if (entry[1] === observer) {
        this.observerMap.delete(entry[0]);
        this._logger.debug(`Unsubscribed to ${entry[0]}.`);
      }
    });
  }

  private _notifyObserver(event: EventType) {
    const callback = this.observerMap.get(event);
    if (callback) {
      callback(this.subject);
    }
  }

  public triggerEvent(event: EventType, topic: string, payload?: any) {
    if (!this._mapper) {
      this._logger.error("No mapper defined.");
      return;
    }

    console.log("mapper call: ", event)
    const triggeredEvents = this._mapper.map(event, topic, payload);
    if (!triggeredEvents) {
      this._logger.warn(`Got "undefined" when triggering event "${event}"`);
      return;
    }
    triggeredEvents.forEach((event: EventType) => {
      this._notifyObserver(event);
    });
  }
}
