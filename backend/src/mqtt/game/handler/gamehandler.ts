import {Game} from "../../../models/game";
import {gameEventMapper, GameEventType} from "../events/gameevents";

export class GameHandler {

  public observerMap: Map<GameEventType, Function> = new Map();
  public game!: Game

  constructor() {
    this.newGame()
  }

  public newGame() {
    this.game = new Game()
    this._notifyObserver(GameEventType.START)
  }

  public triggerEvent(event: GameEventType) {
    const triggeredEvents = gameEventMapper(event, this.game)
    triggeredEvents.forEach((event) => {
      this._notifyObserver(event);
    })
  }

  private _notifyObserver(event: GameEventType) {
    const callback = this.observerMap.get(event)
    if (callback) {
      callback(this.game)
    }
  }

  public subscribe(event: GameEventType, observer: Function) {
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
      }
    })
  }
}