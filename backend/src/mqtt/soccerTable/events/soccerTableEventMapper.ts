import type {EventMapper} from "../../abstract/eventMapper";
import {SoccerTableEventType} from "./soccerTableEventType";
import {SoccerTable} from "../../../models/soccerTable";

export class SoccerTableEventMapper implements EventMapper<SoccerTableEventType>{

  private _soccerTable: SoccerTable;


  constructor(soccerTable: SoccerTable) {
    this._soccerTable = soccerTable;
  }

  map(event: SoccerTableEventType) {
    let triggeredEvents = [event]

    switch (event) {
      case SoccerTableEventType.NEW_GAME:
        this._soccerTable.newGame();
        break;
      case SoccerTableEventType.FINISH_GAME:
        this._soccerTable.newGame();
        // SAVE GAME TO DATABASE
        break;
      case SoccerTableEventType.CANCEL_GAME:
        this._soccerTable.newGame();
        break;
      default:
        break;
    }

    if (event.includes(SoccerTableEventType.GAME)) {
      triggeredEvents.push(SoccerTableEventType.NEW_GAME)
    }

    return new Set(triggeredEvents)
  }
}