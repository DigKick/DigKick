import {SoccerTable} from "../../../models/soccerTable";
import {GameHandler} from "../../game/handler/gameHandler";
import {SoccerTableEvent, soccerTableEventMapper,} from "../events/soccerTableEvent";
import {AbstractHandler, HandlerType} from "../../abstract/abstractHandler";
import {SoccerTableRegisterHandler} from "./soccerTableRegisterHandler";

export class SoccerTableHandler extends AbstractHandler<
  SoccerTableEvent,
  SoccerTable
> {
  private readonly _gameHandler: GameHandler;

  constructor(soccerTable: SoccerTable) {
    let gameId = "";
    Array.from(SoccerTableRegisterHandler.soccerTableHandlers.entries()).forEach(entry => {
      if (entry[1] === this) {
        gameId = entry[0];
      }
    })

    super(soccerTable, soccerTableEventMapper, HandlerType.SOCCERTABLE);
    this._gameHandler = new GameHandler(this.subject);
  }

  get gameHandler() {
    return this._gameHandler;
  }
}
