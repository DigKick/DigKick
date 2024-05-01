import {gameEventMapper, GameEventType} from "../events/gameEvent";
import {SoccerTable} from "../../../models/soccerTable";
import {AbstractHandler, HandlerType} from "../../abstract/abstractHandler";
import {Game} from "../../../models/game";

export class GameHandler extends AbstractHandler<GameEventType, Game> {
  public observerMap: Map<GameEventType, Function> = new Map();
  public soccerTable: SoccerTable;

  constructor(soccerTable: SoccerTable) {
    super(soccerTable.game, gameEventMapper, HandlerType.GAME);
    this.soccerTable = soccerTable;
  }
}
