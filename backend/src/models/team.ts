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
  public score: number;
  public game: Game;


  constructor(color: TeamColor, game: Game) {
    this.color = color;
    this.score = 0;
    this.game = game;
  }

  updateScore(change: ScoreChange) {
    this.score = Math.max(0, this.score + change)

    if (this.score >= this.game.pointsToWin) {
      this.game.winnerTeam = this
    }
  }

  toJSON() {
    return {
      'color': this.color,
      'score': this.score
    }
  }
}