import {Logger} from "winston";
import {LoggerFactory} from "../../logging/loggerFactory";
import {BasicTerm} from "./basicTerm";
import {SoccerTable} from "../../models/soccerTable";


export enum HandlerType {
  GAME = BasicTerm.GAME,
  SOCCERTABLE = BasicTerm.TABLE,
  HARDWARE = "Hardware",
  ABSTRACT = "ABSTRACT"
}

export class AbstractHandler<T, K> {

  public observerMap: Map<T, Function> = new Map();
  public subject: K;

  protected _logger: Logger;
  private readonly _mapper: Function


  constructor(subject: K, mapper: Function, handlerType: HandlerType, soccerTable: SoccerTable) {
    this.subject = subject;
    this._mapper = mapper;

    this._logger = LoggerFactory.getHandlerLogger(handlerType, soccerTable.id)
    this._logger.debug(`${handlerType}Handler created.`);
  }

  public subscribe(event: T, observer: Function) {
    this._logger.debug(`Subscribed to ${event}.`)
    if (Array.from(this.observerMap.values()).includes(observer)) {
      // observer already subscribed
      return;
    }
    this.observerMap.set(event, observer)
  }

  public unsubscribe(observer: Function) {
    Array.from(this.observerMap.entries()).forEach((entry) => {
      if (entry[1] === observer) {
        this.observerMap.delete(entry[0])
        this._logger.debug(`Unsubscribed to ${entry[0]}.`)
      }
    })
  }

  private _notifyObserver(event: T) {
    const callback = this.observerMap.get(event)
    if (callback) {
      callback(this.subject)
    }
  }

  public triggerEvent(event: T) {
    const triggeredEvents = this._mapper(event, this.subject)
    triggeredEvents.forEach((event: T) => {
      this._notifyObserver(event);
    })
  }
}