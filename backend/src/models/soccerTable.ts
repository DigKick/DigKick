import { Game } from "./game";

export class SoccerTable {
  public id: string;
  private _game: Game;

  constructor(id: string) {
    this.id = id;
    this._game = new Game();
  }

  get game() {
    return this._game;
  }

  newGame() {
    this._game.reset();
  }

  toJSON() {
    return {
      game: this._game.toJSON(),
    };
  }
}
