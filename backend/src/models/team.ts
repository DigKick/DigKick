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

  updateScore(change: ScoreChange) {
    this._score = Math.max(0, this._score + change)

    if (this._score >= this.game.pointsToWin) {
      this.game.winnerTeam = this
    }

    if (change === ScoreChange.DECREASE && this._score === this.game.pointsToWin - 1 && this.game.winnerTeam === this) {
      this.game.resetWinnerTeam();
    }
  }

  toJSON() {
    return {
      'color': this.color,
      'score': this._score
    }
  }
}