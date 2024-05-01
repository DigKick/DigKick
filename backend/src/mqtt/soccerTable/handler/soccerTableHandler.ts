import {SoccerTable} from "../../../models/soccerTable";
import {GameHandler} from "../../game/handler/gameHandler";
import {SoccerTableEvent, soccerTableEventMapper,} from "../events/soccerTableEvent";
import {AbstractHandler, HandlerType} from "../../abstract/abstractHandler";

export class SoccerTableHandler extends AbstractHandler<
  SoccerTableEvent,
  SoccerTable
> {
  private readonly _gameHandler: GameHandler;

  constructor(soccerTable: SoccerTable, soccerTableId: string) {
    super(soccerTable, soccerTableEventMapper, HandlerType.SOCCERTABLE, soccerTableId);
    this._gameHandler = new GameHandler(this.subject, soccerTableId);
  }

  get gameHandler() {
    return this._gameHandler;
  }
}
