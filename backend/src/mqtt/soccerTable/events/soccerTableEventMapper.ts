import type {EventMapper} from "../../abstract/eventMapper";
import {SoccerTableEventType} from "./soccerTableEventType";
import {Table} from "../../../models/table.ts";
import {GameHandler} from "../../game/handler/gameHandler";
import {GameEventType} from "../../game/events/gameEvent";
import {GameService} from "../../../database/modules/game/gameService.ts";

export class SoccerTableEventMapper
  implements EventMapper<SoccerTableEventType> {
  private _gameHandler: GameHandler;
  private readonly _soccerTable: Table;

  constructor(soccerTable: Table, gameHandler: GameHandler) {
    this._soccerTable = soccerTable;
    this._gameHandler = gameHandler;
  }

  map(event: SoccerTableEventType) {
    let triggeredEvents = [event];

    console.log(event)

    switch (event) {
      case SoccerTableEventType.NEW_GAME:
        this._soccerTable.newGame();
        this._gameHandler.triggerEvent(GameEventType.WHITE_SCORE_CHANGE);
        this._gameHandler.triggerEvent(GameEventType.BLACK_SCORE_CHANGE);
        break;

      case SoccerTableEventType.FINISH_GAME:
        GameService.saveGame(this._soccerTable.game).then()
        this._soccerTable.newGame();
        this._gameHandler.triggerEvent(GameEventType.WHITE_SCORE_CHANGE);
        this._gameHandler.triggerEvent(GameEventType.BLACK_SCORE_CHANGE);
        break;

      case SoccerTableEventType.CANCEL_GAME:
        this._soccerTable.newGame();
        this._gameHandler.triggerEvent(GameEventType.WHITE_SCORE_CHANGE);
        this._gameHandler.triggerEvent(GameEventType.BLACK_SCORE_CHANGE);
        break;

      default:
        break;
    }

    if (event.includes(SoccerTableEventType.GAME)) {
      triggeredEvents.push(SoccerTableEventType.NEW_GAME);
    }

    return new Set(triggeredEvents);
  }
}
