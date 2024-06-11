import type {Player} from "./player.ts";

export enum TeamColor {
  WHITE = "white",
  BLACK = "black",
}

export enum ScoreChange {
  DECREASE = -1,
  INCREASE = 1,
}

export class Team {
  public static TEAM_SIZE = 2

  public color: TeamColor;
  public isWinner: boolean;
  private _score: number;
  private _players: Array<Player> = [];

  constructor(color: TeamColor) {
    this.color = color;
    this._score = 0;
    this.isWinner = false;
  }

  get score() {
    return this._score;
  }

  set score(newScore: number) {
    this._score = Math.max(0, newScore);
  }

  get players() {
    return this._players;
  }

  addPlayer(newPlayer: Player) {
    if (this._players.includes(newPlayer)) {
      return
    }
    if (this._players.length > Team.TEAM_SIZE) {
      this._players.shift()
    }
    this._players.push(newPlayer);
  }


  toJSON() {
    return {
      color: this.color,
      score: this._score,
      isWinner: this.isWinner,
    };
  }
}
