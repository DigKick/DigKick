import {GameEventType} from "../events/gameEvent";
import {SoccerTable} from "../../../models/soccerTable";
import {AbstractHandler, HandlerType} from "../../abstract/abstractHandler";
import {Game} from "../../../models/game";
import {GameEventMapper} from "../events/gameEventMapper";

export class GameHandler extends AbstractHandler<GameEventType, Game> {
  public observerMap: Map<GameEventType, Function> = new Map();
  public soccerTable: SoccerTable;

  constructor(soccerTable: SoccerTable) {
    super(soccerTable.game, HandlerType.GAME, soccerTable);
    this._mapper = new GameEventMapper(soccerTable.game)
    this.soccerTable = soccerTable;
  }
}
