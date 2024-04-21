import {SoccerTable} from "../../models/soccerTable";
import {GameHandler} from "../game/handler/gamehandler";

export class SoccerTableHandler {

  public soccerTable: SoccerTable
  public gameHandler: GameHandler


  constructor(soccerTable: SoccerTable, gameHandler: GameHandler) {
    this.soccerTable = soccerTable;
    this.gameHandler = gameHandler;
  }
}