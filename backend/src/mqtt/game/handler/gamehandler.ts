import {Game} from "../../../models/game";
import {gameEventMapper, GameEventType} from "../events/gameevents";

export class GameHandler {

  public observers: Function[] = []
  public game: Game

  constructor(game: Game) {
    this.game = game;
  }

  public triggerEvent(event: GameEventType) {
    gameEventMapper(event, this.game)
    this.observers.forEach((obs) => obs(this.game))
  }

  public subscribe(observer: Function) {
    if (this.observers.includes(observer)) {
      return;
    }
    this.observers.push(observer)
  }

  public unsubscribe(observer: Function) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
}