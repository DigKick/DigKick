import {SoccerTable} from "../../models/soccerTable";
import {GameHandler} from "../game/handler/gameHandler";

export class SoccerTableHandler {

  public soccerTable: SoccerTable
  public gameHandler: GameHandler


  constructor(soccerTable: SoccerTable) {
    this.soccerTable = soccerTable;
    this.gameHandler = new GameHandler(this.soccerTable);
  }
}