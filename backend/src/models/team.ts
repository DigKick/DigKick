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

  public score: number;


  constructor(color: TeamColor, game: Game) {
    this.color = color;
    this.score = 0;
    this.game = game;
  }

  toJSON() {
    return {
      'color': this.color,
      'score': this.score
    }
  }
}