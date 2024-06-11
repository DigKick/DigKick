import type {EventMapper} from "../../global/eventMapper";
import {TableEventType} from "./tableEventType.ts";
import {Table} from "../../../models/table.ts";
import {GameHandler} from "../../game/handler/gameHandler";
import {GameEventType} from "../../game/events/gameEvent";
import {GameRepository} from "../../../database/modules/game/gameRepository.ts";

export class TableEventMapper
  implements EventMapper<TableEventType> {
  private _gameHandler: GameHandler;
  private readonly _soccerTable: Table;

  constructor(soccerTable: Table, gameHandler: GameHandler) {
    this._soccerTable = soccerTable;
    this._gameHandler = gameHandler;
  }

  map(event: TableEventType) {
    let triggeredEvents = [event];

    switch (event) {
      case TableEventType.NEW_GAME:
        this._soccerTable.newGame();
        this._gameHandler.triggerEvent(GameEventType.WHITE_SCORE_CHANGE);
        this._gameHandler.triggerEvent(GameEventType.BLACK_SCORE_CHANGE);
        break;

      case TableEventType.FINISH_GAME:
        GameRepository.saveGame(this._soccerTable.game, this._soccerTable).then()
        this._soccerTable.newGame();
        this._gameHandler.triggerEvent(GameEventType.WHITE_SCORE_CHANGE);
        this._gameHandler.triggerEvent(GameEventType.BLACK_SCORE_CHANGE);
        break;

      case TableEventType.CANCEL_GAME:
        this._soccerTable.newGame();
        this._gameHandler.triggerEvent(GameEventType.WHITE_SCORE_CHANGE);
        this._gameHandler.triggerEvent(GameEventType.BLACK_SCORE_CHANGE);
        break;

      default:
        break;
    }

    if (event.includes(TableEventType.GAME)) {
      triggeredEvents.push(TableEventType.NEW_GAME);
    }

    return new Set(triggeredEvents);
  }
}
