// noinspection JSUnusedGlobalSymbols

import {Game} from "./game";

export class Table {
  public name: string;
  private readonly _game: Game;

  constructor(name: string) {
    this.name = name;
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
