import {SoccerTable} from "../../../models/soccerTable";

export enum SoccerTableEvent {
  _GAME = "GAME",


  NEW_GAME = `NEW.${_GAME}`,
  CANCEL_GAME = `CANCEL.${_GAME}`,
  FINISH_GAME = `FINISH.${_GAME}`
}

export const soccerTableEventMapper = (event: SoccerTableEvent, soccerTable: SoccerTable) => {
  let triggeredEvents = [event]

  switch (event) {
    case SoccerTableEvent.NEW_GAME:
      soccerTable.newGame();
      break;
    case SoccerTableEvent.FINISH_GAME:
      soccerTable.newGame();
      // SAVE GAME TO DATABASE
      break;
    case SoccerTableEvent.CANCEL_GAME:
      soccerTable.newGame();
      break;
    default:
      break;
  }

  if (event.includes(SoccerTableEvent._GAME)) {
    triggeredEvents.push(SoccerTableEvent.NEW_GAME)
  }

  return triggeredEvents
}