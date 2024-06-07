import {GameEventType} from "../events/gameEvent";
import {Table} from "../../../models/table.ts";
import {AbstractHandler, HandlerType} from "../../abstract/abstractHandler";
import {Game} from "../../../models/game";
import {GameEventMapper} from "../events/gameEventMapper";

export class GameHandler extends AbstractHandler<GameEventType, Game> {
  public observerMap: Map<GameEventType, Function> = new Map();
  public soccerTable: Table;

  constructor(soccerTable: Table) {
    super(soccerTable.game, HandlerType.GAME, soccerTable);
    this._mapper = new GameEventMapper(soccerTable);
    this.soccerTable = soccerTable;
  }
}
