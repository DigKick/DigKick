export enum SoccerTableEventType {
  GAME = "GAME",

  NEW_GAME = `NEW_${GAME}`,
  CANCEL_GAME = `CANCEL_${GAME}`,
  FINISH_GAME = `FINISH_${GAME}`,
}
