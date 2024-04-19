export enum TeamColor {
  WHITE = "white",
  BLACK = "black"
}

export enum ScoreChange {
  DECREASE = -1,
  INCREASE = 1
}

export class Team {

  public color: TeamColor
  public score: number


  constructor(color: TeamColor) {
    this.color = color;
    this.score = 0;
  }

  updateScore(change: ScoreChange) {
    this.score = Math.max(0, this.score + change)
  }
}