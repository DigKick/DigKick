import {Game} from "./game";

export class SoccerTable {

  public id: string
  public game!: Game

  constructor(id: string) {
    this.id = id;
  }
}