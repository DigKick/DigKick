import {Game} from "./game";

export enum TeamColor {
  WHITE = "white",
  BLACK = "black"
}

export enum ScoreChange {
  DECREASE = -1,
  INCREASE = 1
}

export class Team {

  public color: TeamColor;
  public game: Game;

  private _score: number;


  constructor(color: TeamColor, game: Game) {
    this.color = color;
    this._score = 0;
    this.game = game;
  }

  get score() {
    return this._score
  }

  set score(newScore: number) {
    this._score = Math.max(0, newScore)
  }

  toJSON() {
    return {
      'color': this.color,
      'score': this._score
    }
  }
}