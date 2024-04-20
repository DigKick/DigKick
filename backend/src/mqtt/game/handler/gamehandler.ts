import {Game} from "../../../models/game";
import {gameEventMapper, GameEventType} from "../events/gameevents";

export class GameHandler {

  private _observers: Function[] = []
  public game: Game

  constructor(game: Game) {
    this.game = game;
  }

  public triggerEvent(event: GameEventType) {
    gameEventMapper(event, this.game)
    this._observers.forEach((obs) => obs(this.game))
  }

  public subscribe(observer: Function) {
    if (this._observers.includes(observer)) {
      return;
    }
    this._observers.push(observer)
  }

  public unsubscribe(observer: Function) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }
}