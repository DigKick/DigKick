import {SoccerTable} from "../../../models/soccerTable";
import {GameHandler} from "../../game/handler/gameHandler";
import {SoccerTableEvent, soccerTableEventMapper} from "../events/soccerTableEvent";
import {AbstractHandler} from "../../abstract/AbstractHandler";

export class SoccerTableHandler extends AbstractHandler<SoccerTableEvent, SoccerTable> {

  public gameHandler: GameHandler

  constructor(soccerTable: SoccerTable) {
    super(soccerTable, soccerTableEventMapper);
    this.gameHandler = new GameHandler(this.subject);
  }
}