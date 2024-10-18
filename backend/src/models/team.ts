import type { Player } from './player.ts';

export enum TeamColor {
  WHITE = 'white',
  BLACK = 'black',
}

export enum ScoreChange {
  DECREASE = -1,
  INCREASE = 1,
}

export class Team {
  public static TEAM_SIZE = 2;

  public color: TeamColor;
  public isWinner: boolean;
  private _score: number;
  private _playerOne?: Player;
  private _playerTwo?: Player;

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

  get playerOne() {
    return this._playerOne;
  }

  get playerTwo() {
    return this._playerTwo;
  }

  reset() {
    this._playerOne = undefined;
    this._playerTwo = undefined;
    this.score = 0;
    this.isWinner = false;
  }

  addPlayer(newPlayer: Player) {
    if (!this._playerOne) {
      this._playerOne = newPlayer;
      return;
    }

    if (this._playerOne.key != newPlayer.key && !this._playerTwo) {
      this._playerTwo = this._playerOne;
      this._playerOne = newPlayer;
      return;
    }

    if (
      this._playerOne.key == newPlayer.key ||
      this._playerTwo!.key == newPlayer.key
    ) {
      return;
    }

    this._playerTwo = this._playerOne;
    this._playerOne = newPlayer;
  }

  toJSON() {
    return {
      color: this.color,
      score: this._score,
      playerOne: this._playerOne ? this._playerOne.toJSON() : null,
      playerTwo: this._playerTwo ? this._playerTwo.toJSON() : null,
      isWinner: this.isWinner,
    };
  }
}
