import {SoccerTable} from "../../../models/soccerTable";

export enum SoccerTableEventType {
  GAME = "GAME",

  NEW_GAME = `NEW.${GAME}`,
  CANCEL_GAME = `CANCEL.${GAME}`,
  FINISH_GAME = `FINISH.${GAME}`
}